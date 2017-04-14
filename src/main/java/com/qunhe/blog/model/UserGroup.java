package com.qunhe.blog.model;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.ws.rs.FormParam;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Entity
@Cacheable
public class UserGroup extends BaseModel {

	@FormParam("name")
	@Column(unique = true)
	private String name;
	@ElementCollection(fetch = FetchType.EAGER)
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	private Set<String> authorities;

	public UserGroup() {
		super();
	}

	public UserGroup(Long id) {
		super(id);
	}

	@SuppressWarnings("serial")
	public UserGroup(String name, String...authorities) {
		this.name = name;
		this.authorities = new HashSet<String>(){{
			addAll(Arrays.asList(authorities));
		}};
	}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
    }
}
