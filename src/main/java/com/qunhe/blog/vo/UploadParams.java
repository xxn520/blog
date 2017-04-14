package com.qunhe.blog.vo;

import com.qunhe.blog.model.Upload;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.glassfish.jersey.media.multipart.FormDataParam;

public class UploadParams extends ModelParams<Upload> {

	@FormDataParam("file")
	private FormDataBodyPart body;

	public UploadParams() {
		super();
	}

	public UploadParams(Upload model) {
		super(model);
	}

	/**
	 * @return the body
	 */
	public FormDataBodyPart getBody() {
		return body;
	}

	/**
	 * @param body the body to set
	 */
	public void setBody(FormDataBodyPart body) {
		this.body = body;
	}

}
