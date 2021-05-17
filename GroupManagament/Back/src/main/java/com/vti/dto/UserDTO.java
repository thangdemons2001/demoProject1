package com.vti.dto;

import com.vti.entity.User;

public class UserDTO {
	
	private short id;
	
	private String name;
	
	private String password;
	
	private String firstName;
	
	private String lastName;
	

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public short getId() {
		return id;
	}

	public void setId(short id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public User convertToEntity() {
		User user = new User();
		user.setId(id);
		user.setName(name);
		user.setPassWord(password);
		user.setFirstName(firstName);
		user.setLastName(lastName);
		return user;
	}
	public UserDTO() {
		// TODO Auto-generated constructor stub
	}

	public UserDTO(short id, String name, String password, String firstName, String lastName) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
	}
	
}
