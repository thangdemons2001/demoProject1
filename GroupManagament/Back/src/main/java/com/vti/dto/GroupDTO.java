package com.vti.dto;

import java.util.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import com.vti.entity.Group;
import com.vti.entity.User;
import com.vti.validatecustom.Age;

public class GroupDTO {
	
	private short id;
	
	@Min(value = 0, message = "total member must be greater than or equal 0")
	private short totalMember;
	
	@Size(max = 50, min = 6, message = "group name must has at least 6 characters and less than 50")
	private String name;
	
	//@Age(message = "Date is not valid")
	private Date createDate;
	
	private String creatorName;
	
	private short creatorID;

	public short getCreatorID() {
		return creatorID;
	}

	public void setCreatorID(short creatorID) {
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

	public String getCreatorName() {
		return creatorName;
	}

	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}

	public GroupDTO(short id,
			@Min(value = 0, message = "total member must be greater than or equal 0") short totalMember,
			@Size(max = 50, min = 6, message = "group name must has at least 6 characters and less than 50") String name,
			@Age Date createDate, String creatorName) {
		super();
		this.id = id;
		this.totalMember = totalMember;
		this.name = name;
		this.createDate = createDate;
		this.creatorName = creatorName;
	}
	
	public GroupDTO() {
		// TODO Auto-generated constructor stub
	}
	public Group convertToEntity() {
		Group group = new Group();
		group.setId(id);
		group.setName(name);
		User user = new User();
		user.setId(creatorID);
		user.setName(creatorName);
		group.setCreateDate(createDate);
		group.setCreatorID(user);
		group.setTotalMember(totalMember);
		
		return group;
	}
}
