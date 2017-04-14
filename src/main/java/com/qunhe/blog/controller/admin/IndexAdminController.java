package com.qunhe.blog.controller.admin;

import com.qunhe.blog.Constants;
import com.qunhe.blog.service.AbstractService;
import org.springframework.stereotype.Controller;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.HashMap;
import java.util.Map;

@Controller
@Path(Constants.ADMIN_PATH)
@RolesAllowed("ROLE_ADMIN")
public class IndexAdminController extends AbstractService {

    @GET
    public Map<String, Long> list() {
        Map<String, Long> counts = new HashMap<>();
        return counts;
    }

}
