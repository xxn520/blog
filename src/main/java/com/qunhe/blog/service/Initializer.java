package com.qunhe.blog.service;

import org.springframework.transaction.annotation.Transactional;

public interface Initializer {
	
	@Transactional
	void init();
	
}
