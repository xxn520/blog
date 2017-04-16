package com.qunhe.blog.controller.api;

import com.qunhe.blog.Constants;
import com.qunhe.blog.dao.ArticleRepository;
import com.qunhe.blog.model.Article;
import com.qunhe.blog.service.AbstractCrudController;
import com.qunhe.blog.vo.ArticleParams;
import org.springframework.stereotype.Controller;

import javax.ws.rs.Path;

/**
 * Created by m2mbob on 2017/4/16.
 */
@Controller
@Path(Constants.API_PATH + "article")
public class ArticleController extends AbstractCrudController<ArticleRepository, ArticleParams, Article, Long>{
}
