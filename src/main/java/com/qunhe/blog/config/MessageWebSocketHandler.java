package com.qunhe.blog.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qunhe.blog.jersey.HibernateJacksonContextResolver;
import com.qunhe.blog.vo.Event;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.inject.Inject;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class MessageWebSocketHandler extends TextWebSocketHandler {
	
	private Map<Long, WebSocketSession> map = new HashMap<>();
	@Inject
	private HibernateJacksonContextResolver resolver;

	/* (non-Javadoc)
	 * @see org.springframework.web.socket.handler.AbstractWebSocketHandler#handleTextMessage(org.springframework.web.socket.WebSocketSession, org.springframework.web.socket.TextMessage)
	 */
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String msg = message.getPayload();
		try {
			Event event = resolver.getContext(ObjectMapper.class).readValue(msg, Event.class);
			if ("register".equals(event.getType())) {
				Long uid = Long.valueOf(event.getData().toString());
				WebSocketSession oldSession = map.put(uid, session);
				if (oldSession != null && oldSession.isOpen()) {
					oldSession.close();
				}
			}
		} catch (Exception e) {
			//收到错误信息不做任何处理
		}
	}
	
	public void push(Long user, String type, Object obj) {
		WebSocketSession session = this.map.get(user);
		if (session == null) {
			return;
		}
		try {
			String message = resolver.getContext(ObjectMapper.class).writeValueAsString(obj);
			session.sendMessage(new TextMessage(message));
		} catch (IOException e) {
			e.printStackTrace();
		} catch (IllegalStateException e) {
//			this.map.remove(user);
		}
	}
	
	public void push(Long user, Object obj) {
		push(user, "message", obj);
	}

}
