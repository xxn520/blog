package com.qunhe.blog.dao;

import com.qunhe.blog.model.Article;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

/**
 * Created by m2mbob on 2017/4/15.
 */
public interface ArticleRepository extends HibernateBasedRepository<Article, Long> {

    @QueryHints(@QueryHint(name = org.hibernate.jpa.QueryHints.HINT_CACHEABLE, value = "true"))
    List<Article> findByPublished(boolean published);

}
