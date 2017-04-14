package com.qunhe.blog.security;

import com.qunhe.blog.model.User;
import com.qunhe.blog.vo.LoginUser;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SpringSecurityAuditorAware implements AuditorAware<User> {

	@Override
	public User getCurrentAuditor() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	    if (authentication == null || !authentication.isAuthenticated()) {
	      return null;
	    }
	    
	    if (authentication.getPrincipal() instanceof LoginUser) {
	    	return ((LoginUser) authentication.getPrincipal()).getUser();
	    }
	    return null;
	}

}
