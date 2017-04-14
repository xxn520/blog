package com.qunhe.blog.dao;

import com.qunhe.blog.model.UserGroup;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;

public interface UserGroupRepository extends HibernateBasedRepository<UserGroup, Long> {

	@QueryHints(value = @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_CACHEABLE, value = "true"), forCounting = true)
	UserGroup findFirstByName(String string);

}
