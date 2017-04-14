package com.qunhe.blog.vo;

import java.io.Serializable;

/**
 * @author iDay 推送事件对象
 */
public class Event implements Serializable {

	private String type;
	private Object data;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
