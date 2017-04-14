package com.qunhe.blog.dao;

import com.qunhe.blog.model.Account;
import com.qunhe.blog.model.User;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;

public interface AccountRepository extends HibernateBasedRepository<Account, String> {
	
	@QueryHints(@QueryHint(name = org.hibernate.jpa.QueryHints.HINT_CACHEABLE, value = "true"))
	Account findByUser(User user);

	@QueryHints(@QueryHint(name = org.hibernate.jpa.QueryHints.HINT_CACHEABLE, value = "true"))
	Account findByUserId(long uid);
	
}
