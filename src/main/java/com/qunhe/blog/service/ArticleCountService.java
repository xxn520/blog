package com.qunhe.blog.service;

import com.qunhe.blog.dao.ArticleCountRepository;
import com.qunhe.blog.model.Article;
import com.qunhe.blog.model.ArticleCount;
import com.qunhe.blog.model.Comment;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by m2mbob on 2017/4/17.
 */
@Service
@Aspect
@Order(500)
public class ArticleCountService extends AbstractService {

    @Inject
    private ArticleCountRepository repository;

    @After("execution(* com.qunhe.blog.controller.api.ArticleApiController.findOne(..)) && args(article)")
    public void afterView(long article) {
        this.incrViews(article);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void incrViews(long article) {
        ArticleCount stat = this.repository.findOne(article);
        stat.setViews(stat.getViews() + 1);
        this.repository.save(stat);
    }

    @Around("execution(* com.qunhe.blog.dao.CommentRepository.save(..)) && args(comment)")
    public Object afterComment(ProceedingJoinPoint pjp, Comment comment) throws Throwable {
        boolean isNew = comment.isNew();
        Object obj = pjp.proceed(new Object[]{comment});
        if (isNew) {
            this.incrComments(comment.getArticle());
        }
        return obj;
    }

    @Around("execution(* com.qunhe.blog.dao.CommentRepository.save(..)) && args(comments)")
    public Object afterComment(ProceedingJoinPoint pjp, Iterable<Comment> comments) throws Throwable {
        Map<Comment, Integer> newComments = new HashMap<>();
        for (Comment comment : comments) {
            if (comment.isNew()) {
                if (!newComments.containsKey(comment)) {
                    newComments.put(comment, 1);
                } else {
                    newComments.put(comment, newComments.get(comment) + 1);
                }
            }
        }
        Object obj = pjp.proceed(new Object[]{comments});
        for (Map.Entry<Comment, Integer> entry : newComments.entrySet()) {
            this.incrComments(entry.getKey().getArticle(), entry.getValue());
        }
        return obj;
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRED)
    public void incrComments(Article article) {
        this.incrComments(article, 1);
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRED)
    public void incrComments(Article article, int incr) {
        ArticleCount stat = this.repository.findOne(article.getId());
        article.setCount(stat);
        stat.setComments(stat.getComments() + incr);
        this.repository.save(stat);
    }

}