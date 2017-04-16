package com.qunhe.blog.controller.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qunhe.blog.Constants;
import com.qunhe.blog.dao.ArticleRepository;
import com.qunhe.blog.dao.CategoryRepository;
import com.qunhe.blog.service.AbstractService;
import org.glassfish.jersey.server.mvc.Viewable;
import org.springframework.stereotype.Controller;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by m2mbob on 2017/4/14.
 */
@Controller
@Path(Constants.ROOT_PATH)
public class IndexController extends AbstractService {

    @Inject
    private ArticleRepository articleRepository;

    @Inject
    private CategoryRepository categoryRepository;

    @Inject
    private ObjectMapper objectMapper;

    @GET
    public Viewable index() {
        Map<String, String> model = new HashMap<>();
        Map<String, Object> initialState = new HashMap<>();
        initialState.put("article", articleRepository.findByPublished(true));
        initialState.put("category", categoryRepository.findAll());
        try {
            model.put("initialState", objectMapper.writeValueAsString(initialState));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new Viewable("/index.ftl", model);
    }

}
