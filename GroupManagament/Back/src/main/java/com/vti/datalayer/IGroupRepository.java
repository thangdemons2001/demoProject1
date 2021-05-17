package com.vti.datalayer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.entity.Group;

public interface IGroupRepository extends JpaRepository<Group, Short>, JpaSpecificationExecutor<Group> {
	
	public Group findById(short id);
	public Group findByName(String name);
}
