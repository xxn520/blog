package com.qunhe.blog.vo;

import com.qunhe.blog.model.User;
import com.qunhe.blog.model.UserGroup;

import javax.ws.rs.FormParam;

public class UserParams extends ModelParams<User> {
	
	@FormParam("group")
	private Long groupId;

	/* (non-Javadoc)
	 * @see com.yunpeng.core.vo.ModelParams#getModel()
	 */
	@Override
	public User getModel() {
        if(groupId!=null) {
            this.model.setGroup(new UserGroup(groupId));
        }
		return this.model;
	}

}
