package com.qunhe.blog.dao;

import com.qunhe.blog.model.Upload;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;

public interface UploadRepository extends HibernateBasedRepository<Upload, Long> {
	
	@QueryHints(@QueryHint(name = org.hibernate.jpa.QueryHints.HINT_CACHEABLE, value = "true"))
	Upload findByFileNameAndFilePath(String fileName, String filePath);
}
