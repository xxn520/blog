package com.qunhe.blog.controller.api;

import com.qunhe.blog.Constants;
import com.qunhe.blog.model.User;
import com.qunhe.blog.security.SpringSecurityAuditorAware;
import org.springframework.stereotype.Controller;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by m2mbob on 2017/4/15.
 */
@Controller
@Path(Constants.API_PATH + "auth")
public class AuthApiController {

    @Inject
    private SpringSecurityAuditorAware auditorAware;

    @GET
    @Path("login")
    @Produces(MediaType.APPLICATION_JSON)
    public User findOne() {
        return auditorAware.getCurrentAuditor();
    }

}
