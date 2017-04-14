package com.qunhe.blog.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Cacheable
public class ArticleCount implements Serializable {

    @Id
    private Long id;
    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Article article;
    private int views = 0;
    private int comments = 0;

    public ArticleCount() {
        super();
    }

    public ArticleCount(Long id) {
        this.id = id;
    }

    public ArticleCount(Article article) {
        this.article = article;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public int getComments() {
        return comments;
    }

    public void setComments(int comments) {
        this.comments = comments;
    }
}
