package com.qunhe.blog.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.apache.lucene.analysis.cn.smart.SmartChineseAnalyzer;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.Cacheable;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.ws.rs.FormParam;
import java.util.List;

@Entity
@Cacheable
@Indexed
public class Comment extends BaseModel {

    @FormParam("content")
    @Analyzer(impl = SmartChineseAnalyzer.class)
    private String content;
    @ManyToOne
    @JsonBackReference
    private Comment parent;
    @OneToMany(mappedBy = "parent")
    @Cache(usage = CacheConcurrencyStrategy.TRANSACTIONAL)
    private List<Comment> children;
    @ManyToOne
    private Article article;

    public Comment() {
        super();
    }

    public Comment(Long id) {
        super(id);
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Comment getParent() {
        return parent;
    }

    public void setParent(Comment parent) {
        this.parent = parent;
    }

    public List<Comment> getChildren() {
        return children;
    }

    public void setChildren(List<Comment> children) {
        this.children = children;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

}
