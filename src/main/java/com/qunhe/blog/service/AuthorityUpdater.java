package com.qunhe.blog.service;

import com.qunhe.blog.config.AppProperties;
import com.qunhe.blog.dao.UserGroupRepository;
import com.qunhe.blog.model.UserGroup;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;

@Service
public class AuthorityUpdater extends BlogInitializer {
	@Inject
	private UserGroupRepository repository;
	@Inject
	private AppProperties appProperties;

	@Override
	@Transactional
	protected void doInit() {
		UserGroup ug = repository.findFirstByName("管理员");
		if (ug != null) {
			if (appProperties.getAuthorities() != null
					&& !CollectionUtils.isSubCollection(appProperties.getAuthorities(), ug.getAuthorities())) {
				ug.getAuthorities().addAll(appProperties.getAuthorities());
			}
			repository.save(ug);
		}
	}

}
