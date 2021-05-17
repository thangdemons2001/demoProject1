package com.vti.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Formula;

import com.vti.dto.UserDTO;

@Entity
@Table(name = "User", catalog = "GroupManagement")
public class User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "UserID")
	private short id;
	
	@Column(name = "Email", length = 50, nullable = false, unique = true, updatable = false)
	private String email;
	
	@Column(name = "Username", length = 50, nullable = false, unique = true, updatable = false)
	private String name;
	
	@Column(name = "password", length = 800 , nullable = false)
	private String passWord;
	
	@Column(name = "FirstName", length = 50, nullable = false)
	private String firstName;
	
	@Column(name = "LastName", length = 50, nullable = false)
	private String LastName;
	
	@OneToMany(mappedBy = "creatorID")
	private List<Group> createdGroup;
	
	@Formula(value = "concat(FirstName, ' ', LastName)")
	private String FullName;
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	@Column(name = "role", nullable = false)
	private String role;

	public short getId() {
		return id;
	}

	public void setId(short id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return LastName;
	}

	public void setLastName(String lastName) {
		LastName = lastName;
	}

	public String getFullName() {
		return FullName;
	}

	public void setFullName(String fullName) {
		FullName = fullName;
	}

	public User(short id, String email, String name, String passWord, String firstName, String lastName,
			String fullName) {
		super();
		this.id = id;
		this.email = email;
		this.name = name;
		this.passWord = passWord;
		this.firstName = firstName;
		LastName = lastName;
		FullName = fullName;
	}
	
	public User() {
		// TODO Auto-generated constructor stub
	}
	public UserDTO convertToDTO() {
		UserDTO userdto = new UserDTO();
		userdto.setId(id);
		userdto.setName(name);
		userdto.setFirstName(firstName);
		userdto.setLastName(LastName);
		userdto.setPassword(passWord);
		return userdto;
	}
}
