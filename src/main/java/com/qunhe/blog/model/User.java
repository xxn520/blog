package com.qunhe.blog.model;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.Cacheable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.ws.rs.FormParam;

@Entity
@Cacheable
public class User extends BaseModel {

	@FormParam("username")
	@Column(unique = true)
	private String username;
	@FormParam("realname")
	private String realname;
	@FormParam("nickname")
	private String nickname;
	@FormParam("phone")
	private String phone;
	@FormParam("email")
	private String email;
	@FormParam("avatar")
	private String avatar;
	@ManyToOne
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	private UserGroup group;
	@FormParam("locked")
	private boolean locked;

	public User() {
		super();
	}

	public User(Long id) {
		super(id);
	}

	public User(String username) {
		this.username = username;
        this.phone = username;
	}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public UserGroup getGroup() {
        return group;
    }

    public void setGroup(UserGroup group) {
        this.group = group;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }
}
