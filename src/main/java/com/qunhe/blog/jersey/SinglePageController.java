package com.qunhe.blog.jersey;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * Created by m2mbob on 2017/4/17.
 * 这个过滤器会在所有请求被匹配之前将所有非 api 请求转发到提供单页的页面
 */
@PreMatching
public class SinglePageController implements ContainerRequestFilter {
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        try {
            if (!requestContext.getUriInfo().getPath().startsWith("api/")) {
                requestContext.setRequestUri(new URI("/"));
            }
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }
}
