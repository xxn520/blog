package com.qunhe.blog.controller.api;

import com.qunhe.blog.Constants;
import com.qunhe.blog.dao.MonitorRecordRepository;
import com.qunhe.blog.model.MonitorRecord;
import com.qunhe.blog.service.AbstractService;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

/**
 * Created by m2mbob on 2017/4/21.
 */
@Controller
@Path(Constants.API_PATH + "monitor")
public class MonitorApiController extends AbstractService {

    @Inject
    private MonitorRecordRepository repository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public MonitorRecord create(MonitorRecord monitorRecord) {
        return repository.save(monitorRecord);
    }

}
