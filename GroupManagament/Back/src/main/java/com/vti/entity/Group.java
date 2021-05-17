package com.vti.entity;

import java.io.Serializable;

import java.util.Date;


import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Min;


import com.vti.dto.GroupDTO;

@Entity
@Table(name = "Group", catalog = "GroupManagement")
public class Group implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Column(name = "GroupID")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private short id;
	
	@Column(name = "TotalMember", nullable = false)
	@Min(value = 0, message = "total member must be greater than or equal 0")
	private short totalMember;
	
	@Column(name = "GroupName", length = 30, nullable = false, unique = true)
	private String name;
	
	@Column(name = "CreateDate", updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createDate;
	
	@ManyToOne
	@JoinColumn(name = "CreatorID")
	private User creatorID;
	

	public User getCreatorID() {
		return creatorID;
	}

	public void setCreatorID(User creatorID) {
		this.creatorID = creatorID;
	}

	public short getId() {
		return id;
	}

	public void setId(short id) {
		this.id = id;
	}

	public short getTotalMember() {
		return totalMember;
	}

	public void setTotalMember(short totalMember) {
		this.totalMember = totalMember;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Group(short id, @Min(value = 0, message = "total member must be greater than or equal 0") short totalMember,
			String name, Date createDate) {
		super();
		this.id = id;
		this.totalMember = totalMember;
		this.name = name;
		this.createDate = createDate;
	}
	
	public Group() {
		// TODO Auto-generated constructor stub
	}

	public GroupDTO convertToDTO(Group gr) {
		GroupDTO grDTO = new GroupDTO();
		grDTO.setId(gr.getId());
		grDTO.setName(gr.getName());
		grDTO.setTotalMember(gr.getTotalMember());
		grDTO.setCreateDate(gr.getCreateDate());
		grDTO.setCreatorID(this.creatorID.getId());
		grDTO.setCreatorName(this.creatorID.getName());
		return grDTO;
	}
	
}
