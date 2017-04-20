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

    @GET
    @Path("angular-trackby")
    public Viewable angularTrackBy() {
        return new Viewable("/js-perfs/angular-trackby.ftl");
    }

    @GET
    @Path("vue1")
    public Viewable vue1() {
        return new Viewable("/js-perfs/vue1.ftl");
    }

    @GET
    @Path("vue2")
    public Viewable vue2() {
        return new Viewable("/js-perfs/vue2.ftl");
    }

    @GET
    @Path("react")
    public Viewable react() {
        return new Viewable("/js-perfs/react.ftl");
    }

    @GET
    @Path("react-fiber")
    public Viewable reactFiber() {
        return new Viewable("/js-perfs/react-fiber.ftl");
    }

    @GET
    @Path("innerHTML")
    public Viewable innerHTML() {
        return new Viewable("/js-perfs/innerHTML.ftl");
    }

}
