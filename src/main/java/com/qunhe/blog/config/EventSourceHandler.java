package com.qunhe.blog.config;

import com.qunhe.blog.service.AbstractService;
import org.glassfish.jersey.media.sse.EventOutput;
import org.glassfish.jersey.media.sse.OutboundEvent;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class EventSourceHandler extends AbstractService {
	private Map<Long, EventOutput> map = new HashMap<>();

	public boolean contains(Long user) {
		return this.map.containsKey(user);
	}

	public EventOutput getObject(Long user) {
		return this.map.get(user);
	}

	public void put(Long user, EventOutput event) {
		if (user == null) {
			return;
		}
		EventOutput ev = this.map.put(user, event);
		if (ev == null) {
			return;
		}
		try {
			if (!ev.isClosed()) {
				ev.close();
			}
		} catch (IOException e) {
			this.logger.error(e);
		} finally {
			ev = null;
		}
	}

	public EventOutput remove(Long user) {
		return this.map.remove(user);
	}

	public void push(Long user, Object order) {
		EventOutput eventOutput = this.getObject(user);
		if (eventOutput == null) {
			return;
		}
		if (eventOutput.isClosed()) {
			this.remove(user);
			return;
		}
		new Thread(new Runnable() {

			@Override
			public void run() {
				final OutboundEvent.Builder builder = new OutboundEvent.Builder();
				OutboundEvent event = builder.name("message").data(order)
						.mediaType(MediaType.APPLICATION_JSON_TYPE).build();
				try {
					eventOutput.write(event);
				} catch (IOException e) {
					logger.error("Error when writing the event.", e);
				}
			}
		}).start();
	}
}
