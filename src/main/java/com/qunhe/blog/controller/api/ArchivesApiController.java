package com.qunhe.blog.controller.api;

import com.qunhe.blog.Constants;
import com.qunhe.blog.dao.ArticleRepository;
import com.qunhe.blog.model.Article;
import com.qunhe.blog.service.AbstractService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

/**
 * Created by m2mbob on 2017/4/17.
 */
@Controller
@Path(Constants.API_PATH + "archives")
public class ArchivesApiController extends AbstractService {

    @Inject
    private ArticleRepository articleRepository;

    /**
     * 返回格式为
     *  2017 -> article list
     *  2016 -> article list
     *  ...
     */
    @GET
    public Map<Integer, List<Article>> archives() {
        Map<Integer, List<Article>> model = new HashMap<>();
        List<Article> articles = this.articleRepository.findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "createdDate")));
        for (Article article : articles) {
            LocalDate date = article.getCreatedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            int year = date.getYear();
            if (model.get(year) == null) {
                model.put(year, new ArrayList<Article>(
                    Arrays.asList(article)
                ));
            } else {
                List<Article> oldlist = model.get(year);
                oldlist.add(article);
                model.put(year, oldlist);
            }
        }
        return model;
    }

}
