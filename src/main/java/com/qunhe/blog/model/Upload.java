package com.qunhe.blog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Index;
import javax.persistence.Table;

@Entity
@Table(indexes = @Index(unique = true, columnList = "fileName, filePath") )
public class Upload extends BaseModel {

	private String fileName;
	private String url;
	@JsonIgnore
	private String filePath;
	private String contentType;
	private long size;

	public Upload() {
		super();
	}

	public Upload(Long id) {
		super(id);
	}

	public Upload(String filename) {
		this.fileName = filename;
	}

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    /*
     * (non-Javadoc)
     *
     * @see java.lang.Object#toString()
     */
	@Override
	public String toString() {
		return "File [filename=" + fileName + ", url=" + url + ", filePath=" + filePath + ", contentType=" + contentType
				+ ", size=" + size + "]";
	}

}
