package com.vti.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.vti.bussinesslayer.IUserService;
@Component
@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
	@Autowired
	private IUserService service;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(service).passwordEncoder(new BCryptPasswordEncoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.cors()
			.and()
			.authorizeRequests()
			.antMatchers("/api/v1/groups/**").hasAnyAuthority("Admin", "Manager")
			.antMatchers("/api/v1/users/login").permitAll()
			.anyRequest().authenticated()
			.and()
			.httpBasic()
			.and()
			.csrf().disable();
	}
}
