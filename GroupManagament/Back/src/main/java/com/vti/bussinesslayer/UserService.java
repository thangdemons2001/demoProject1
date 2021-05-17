package com.vti.bussinesslayer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.vti.datalayer.IUserRepository;
import com.vti.entity.User;
@Service
public class UserService implements IUserService {

	@Autowired
	private IUserRepository repository;
	
	@Override
	public User findByUserName(String name) {
		// TODO Auto-generated method stub
		return repository.findByName(name);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = repository.findByName(username);

		if (user == null) {
			throw new UsernameNotFoundException(username);
		}

		return new org.springframework.security.core.userdetails.User(
				user.getName(), 
				user.getPassWord(),
				AuthorityUtils.createAuthorityList(user.getRole()));
	}
	

}
