package com.qunhe.blog.model;

import org.apache.lucene.analysis.cn.smart.SmartChineseAnalyzer;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.Cacheable;
import javax.persistence.Entity;
import javax.ws.rs.FormParam;

@Entity
@Cacheable
@Indexed
public class Category extends BaseModel{

    @FormParam("name")
    @Analyzer(impl = SmartChineseAnalyzer.class)
    private String name;
    @FormParam("cover")
    private String cover;

    public Category() {
        super();
    }

    public Category(String name, String cover) {
        this.name = name;
        this.cover = cover;
    }

    public Category(Long id) {
        super(id);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

}
