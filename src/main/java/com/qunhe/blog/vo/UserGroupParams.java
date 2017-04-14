package com.qunhe.blog.vo;

import com.qunhe.blog.model.UserGroup;

import javax.ws.rs.FormParam;
import java.util.Set;

public class UserGroupParams extends ModelParams<UserGroup> {
	
	@FormParam("authorities")
	private Set<String> authorities;

	/* (non-Javadoc)
	 * @see com.yunpeng.core.vo.ModelParams#getModel()
	 */
	@Override
	public UserGroup getModel() {
		this.model.setAuthorities(authorities);
		return this.model;
	}
	
}
