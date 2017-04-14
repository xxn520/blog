package com.qunhe.blog.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.search.annotations.DocumentId;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Persistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.ws.rs.PathParam;
import java.util.Date;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(ignoreUnknown = true, value = "new")
public class BaseModel implements Persistable<Long> {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@DocumentId
	@PathParam("id")
	private Long id;
	@CreatedBy
	@ManyToOne
	@JoinColumn(updatable = false)
	@JsonIgnoreProperties({ "realname", "nickname", "phone", "email", "group" })
	@JsonBackReference
	private User createdBy;
	@CreatedDate
	@Temporal(TemporalType.TIMESTAMP)
	@Column(updatable = false)
	private Date createdDate;
	@LastModifiedBy
	@ManyToOne
	@JsonIgnore
	private User lastModifiedBy;
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	@JsonIgnore
	private Date lastModifiedDate;

	/**
	 * 
	 */
	public BaseModel() {
		super();
	}

	/**
	 * @param id
	 */
	public BaseModel(Long id) {
		this.id = id;
	}

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the createdBy
	 */
	public User getCreatedBy() {
		return createdBy;
	}

	/**
	 * @param createdBy
	 *            the createdBy to set
	 */
	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}

	/**
	 * @return the createdDate
	 */
	public Date getCreatedDate() {
		return createdDate;
	}

	/**
	 * @param createdDate
	 *            the createdDate to set
	 */
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * @return the lastModifiedBy
	 */
	public User getLastModifiedBy() {
		return lastModifiedBy;
	}

	/**
	 * @param lastModifiedBy
	 *            the lastModifiedBy to set
	 */
	public void setLastModifiedBy(User lastModifiedBy) {
		this.lastModifiedBy = lastModifiedBy;
	}

	/**
	 * @return the lastModifiedDate
	 */
	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}

	/**
	 * @param lastModifiedDate
	 *            the lastModifiedDate to set
	 */
	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}

	@Override
	public boolean isNew() {
		return this.id == null || this.id <= 0;
	}
}
