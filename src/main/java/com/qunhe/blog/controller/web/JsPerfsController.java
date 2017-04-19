package com.qunhe.blog.controller.web;

import org.glassfish.jersey.server.mvc.Viewable;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 * Created by m2mbob on 2017/4/19.
 */
@Controller
@Path("/js-perfs/")
public class JsPerfsController {

    @GET
    @Path("angular")
    public Viewable angular() {
        return new Viewable("/js-perfs/angular.ftl");
    }

}
