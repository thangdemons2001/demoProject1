package com.vti.bussinesslayer;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.vti.entity.User;

public interface IUserService extends UserDetailsService {
	public User findByUserName(String name);
}
