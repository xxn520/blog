package com.qunhe.blog.model;

import javax.persistence.*;
import javax.ws.rs.FormParam;

@Entity
@Cacheable
public class Account {
	@Id
	@FormParam("username")
	private String username;
	@FormParam("password")
	private String password;
	@OneToOne
	@JoinColumn(updatable = false)
	private User user;

	public Account() {
		super();
	}

	public Account(String username, String password) {
		this.username = username;
		this.password = password;
	}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
