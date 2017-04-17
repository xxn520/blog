package com.qunhe.blog.controller.api;

import com.qunhe.blog.Constants;
import com.qunhe.blog.dao.ArticleRepository;
import com.qunhe.blog.model.Article;
import com.qunhe.blog.service.AbstractCrudController;
import com.qunhe.blog.vo.ArticleParams;
import org.springframework.stereotype.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

/**
 * Created by m2mbob on 2017/4/16.
 */
@Controller
@Path(Constants.API_PATH + "article")
public class ArticleApiController extends AbstractCrudController<ArticleRepository, ArticleParams, Article, Long>{

    @Override
    @GET
    @Path("{id:\\d+}")
    public Article findOne(@PathParam("id") Long id) {
        Article article = this.repository.findOne(id);
        if (article == null) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
        return article;
    }

}
