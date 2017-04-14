package com.qunhe.blog.dao;

import com.qunhe.blog.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;

public interface UserRepository extends HibernateBasedRepository<User, Long> {
	
	@QueryHints(value = @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_CACHEABLE, value = "true"), forCounting = true)
	User findByUsername(String username);
	
	@QueryHints(value = @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_CACHEABLE, value = "true"), forCounting = true)
	Page<User> findByGroupName(String group, Pageable pageable);
	
}
