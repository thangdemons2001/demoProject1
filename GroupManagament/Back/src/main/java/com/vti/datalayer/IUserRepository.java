package com.vti.datalayer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.entity.User;

public interface IUserRepository extends JpaRepository<User, Short>, JpaSpecificationExecutor<User> {
	
	public User findByName(String name);
}
