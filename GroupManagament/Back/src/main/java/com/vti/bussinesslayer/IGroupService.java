package com.vti.bussinesslayer;

import java.util.List;

import com.vti.dto.GroupDTO;
import com.vti.entity.Group;
import com.vti.filter.Filter;



public interface IGroupService {
	
	public List<GroupDTO> getAllGroup(short page, short pageSize, Filter filter);
	
	public List<GroupDTO> getAllGroup(short page, short pageSize);
	
	public List<GroupDTO> getAllGroup();
	
	public GroupDTO findById(short id);
	
	public GroupDTO findByName(String name);
	
	public void createGroup(Group de);
	
	public void updateGroup(Group de);
	
	public void updateGroup(short id, String newName);
	
	public void deleteGroup(Group de);
	
	public void deleteGroup(short id);
}
