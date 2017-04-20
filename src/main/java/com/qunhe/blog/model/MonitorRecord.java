package com.qunhe.blog.model;

import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.ws.rs.FormParam;

/**
 * Created by m2mbob on 2017/4/21.
 */
@Entity
public class MonitorRecord extends BaseModel {

    @FormParam("type")
    private String type;

    @FormParam("json")
    @Lob
    private String json;

    public MonitorRecord() {
    }

    public MonitorRecord(Long id) {
        super(id);
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }
}
