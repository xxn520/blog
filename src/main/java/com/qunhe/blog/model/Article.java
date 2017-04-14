package com.qunhe.blog.model;

import com.fasterxml.jackson.annotation.JsonUnwrapped;
import org.apache.lucene.analysis.cn.smart.SmartChineseAnalyzer;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.IndexedEmbedded;

import javax.persistence.*;
import javax.ws.rs.FormParam;

@Entity
@Cacheable
@Indexed
@NamedEntityGraph(name = "Article.content", attributeNodes = { @NamedAttributeNode("detail") })
public class Article extends BaseModel{

    @Analyzer(impl = SmartChineseAnalyzer.class)
    @FormParam("title")
    @Field
    private String title;
    @FormParam("source")
    private String source;
    @Analyzer(impl = SmartChineseAnalyzer.class)
    @Field
    @FormParam("summary")
    private String summary;
    @ManyToOne
    @IndexedEmbedded(includeEmbeddedObjectId = true)
    private Category category;
    @FormParam("cover")
    private String cover;
    @FormParam("published")
    @Field
    private boolean published;
    @OneToOne(mappedBy = "article", fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = true /* 这里如果是false就会报错 */)
    @JsonUnwrapped(suffix = "_count")
    private ArticleCount count;
    @OneToOne(mappedBy = "article", fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = true /* 这里如果是false就会报错 */)
    @IndexedEmbedded
    @JsonUnwrapped
    private ArticleDetail detail;

    public Article() {
        super();
        this.setCount(new ArticleCount());
        this.setDetail(new ArticleDetail());
    }

    public Article(Long id) {
        super(id);
    }

    public Article(String title) {
        this();
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    public ArticleCount getCount() {
        return count;
    }

    public void setCount(ArticleCount count) {
        this.count = count;
    }

    public ArticleDetail getDetail() {
        return detail;
    }

    public void setDetail(ArticleDetail detail) {
        this.detail = detail;
    }
}
