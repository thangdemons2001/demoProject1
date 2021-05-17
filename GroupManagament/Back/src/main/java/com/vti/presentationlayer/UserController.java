package com.vti.presentationlayer;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vti.bussinesslayer.IUserService;
import com.vti.dto.UserDTO;
import com.vti.entity.User;

@RestController
@RequestMapping(value = "api/v1/users")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class UserController {

	@Autowired
	private IUserService service;
	
	@GetMapping(value = "/{name}")
	public User findByUsername(@PathVariable(name = "name") String name) {
		return service.findByUserName(name);
	}
	@GetMapping(value = "/login")
	public UserDTO login(Principal principal) {
		String name = principal.getName();
		return service.findByUserName(name).convertToDTO();
	}
}
