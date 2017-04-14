package com.qunhe.blog.controller.web;

import com.qunhe.blog.Constants;
import com.qunhe.blog.service.AbstractService;
import org.glassfish.jersey.server.mvc.Viewable;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 * Created by m2mbob on 2017/4/14.
 */
@Controller
@Path(Constants.ROOT_PATH)
public class IndexController extends AbstractService {

    @GET
    public Viewable index() {
        return new Viewable("/index.ftl");
    }

}
