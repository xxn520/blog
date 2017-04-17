package com.qunhe.blog.controller.api;

import com.qunhe.blog.Constants;
import com.qunhe.blog.dao.ArticleRepository;
import com.qunhe.blog.dao.CategoryRepository;
import com.qunhe.blog.model.Article;
import com.qunhe.blog.model.Category;
import com.qunhe.blog.service.AbstractCrudController;
import com.qunhe.blog.vo.CategoryParams;
import com.qunhe.blog.vo.PageParams;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;

import javax.inject.Inject;
import javax.ws.rs.BeanParam;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

/**
 * Created by m2mbob on 2017/4/17.
 */
@Controller
@Path(Constants.API_PATH + "category")
public class CategoryApiController extends AbstractCrudController<CategoryRepository, CategoryParams, Category, Long>{

    @Inject
    private ArticleRepository articleRepository;

    @GET
    @Path("{name}/article")
    public Page<Article> findArticleByCategory(
            @BeanParam PageParams pageParams,
            @PathParam("name") String name) {
        return this.articleRepository.findByCategoryNameAndPublishedTrueOrderByCreatedDateDesc(name, pageParams);
    }

}
