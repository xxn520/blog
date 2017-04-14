package com.qunhe.blog.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.apache.lucene.analysis.cn.smart.SmartChineseAnalyzer;
import org.apache.lucene.analysis.core.WhitespaceAnalyzer;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Field;

import javax.persistence.*;
import javax.ws.rs.FormParam;
import java.io.Serializable;
import java.util.List;

@Entity
@Cacheable
public class ArticleDetail implements Serializable {

    @Id
    private Long id;
    @MapsId
    @JsonBackReference
    @OneToOne(fetch = FetchType.LAZY)
    private Article article;
    @FormParam("metaKeywords")
    private String metaKeywords;
    @FormParam("metaDescription")
    private String metaDescription;
    @Analyzer(impl = WhitespaceAnalyzer.class)
    @Field
    @FormParam("tags")
    private String tags;
    @Lob
    @Analyzer(impl = SmartChineseAnalyzer.class)
    @Field
    @FormParam("content")
    private String content;
    @FormParam("link")
    private String link;
    @ElementCollection(fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @FormParam("images")
    private List<String> images;

    public ArticleDetail() {
        super();
    }

    public ArticleDetail(Article article) {
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

    public String getMetaKeywords() {
        return metaKeywords;
    }

    public void setMetaKeywords(String metaKeywords) {
        this.metaKeywords = metaKeywords;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

}
