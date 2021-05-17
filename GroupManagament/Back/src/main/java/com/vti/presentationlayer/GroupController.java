package com.vti.presentationlayer;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vti.bussinesslayer.IGroupService;
import com.vti.dto.GroupDTO;
import com.vti.filter.Filter;


@RestController
@RequestMapping(value = "api/v1/groups")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class GroupController {
	
	@Autowired
	private IGroupService service;
	
	@GetMapping()
	public List<GroupDTO> getAllGroup(short page, short pageSize, Filter filter){
		if(filter.getSerach() == null) {
			return service.getAllGroup(page, pageSize);
		}
		return service.getAllGroup(page,pageSize,filter);
	}
	@GetMapping(value ="/")
	public List<GroupDTO> getAllGroup(){
		return service.getAllGroup();
	}
	@GetMapping(value ="/detail/{name}")
	public GroupDTO getGroupById(@PathVariable(name = "name") String name){
		return service.findByName(name);
	}
	@PostMapping
	public void createGroup(@Valid @RequestBody GroupDTO gr) {
		
		service.createGroup(gr.convertToEntity());
		
	}
	@PutMapping(value ="/{id}")
	public void updateGroup(@PathVariable(name ="id") short id, @RequestBody GroupDTO gr) {
		gr.setId(id);
		service.updateGroup(gr.convertToEntity());
	}
	@DeleteMapping(value ="/{id}")
	public void deleteGroup(@PathVariable(value ="id") short id) {
		service.deleteGroup(id);
	}
}
