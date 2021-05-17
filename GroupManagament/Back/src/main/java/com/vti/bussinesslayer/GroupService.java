package com.vti.bussinesslayer;


import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.vti.datalayer.IGroupRepository;
import com.vti.dto.GroupDTO;
import com.vti.filter.Filter;

import com.vti.entity.Group;

@Service
public class GroupService implements IGroupService {
	
	@Autowired
	private IGroupRepository repository;

	@Override
	public List<GroupDTO> getAllGroup(short page, short pageSize, Filter filter) {
		// TODO Auto-generated method stub
		Pageable pageable = PageRequest.of(page, pageSize, Sort.by("id").ascending());
		// TODO Auto-generated method stub
		Specification<Group> where = isGroupName(filter.getSerach());
		
		List<Group> group = repository.findAll(where, pageable).toList();
		
		List<GroupDTO> listGroup = new ArrayList<GroupDTO>();
		for (Group group2 : group) {
			listGroup.add(group2.convertToDTO(group2));
		}
		return listGroup;
	}

	@Override
	public void createGroup(Group de) {
		// TODO Auto-generated method stub
		LocalDate today = LocalDate.now();
		Date date = Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant());
		if(de.getCreateDate() == null) de.setCreateDate(date);
		repository.save(de);
	}

	@Override
	public void updateGroup(Group de) {
		// TODO Auto-generated method stub
		repository.save(de);
	}

	@Override
	public void updateGroup(short id, String newName) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteGroup(Group de) {
		// TODO Auto-generated method stub
		repository.delete(de);
	}

	@Override
	public void deleteGroup(short id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);
	}
	@Override
	public GroupDTO findById(short id) {
		// TODO Auto-generated method stub
		Group gr = repository.findById(id);
		return gr.convertToDTO(gr);
	}
	public Specification<Group> isGroupName(String name){
		return new Specification<Group>() {

			@Override
			public Predicate toPredicate(Root<Group> root, CriteriaQuery<?> query,
					CriteriaBuilder criteriaBuilder) {
				// TODO Auto-generated method stub
				return criteriaBuilder.like(root.get("name"),"%"+ name + "%");
			}
			
		};
	}

	@Override
	public List<GroupDTO> getAllGroup(short page, short pageSize) {
		Pageable pageable = PageRequest.of(page, pageSize, Sort.by("id").ascending());
		// TODO Auto-generated method stub
		
		
		List<Group> group = repository.findAll(pageable).toList();
		
		List<GroupDTO> listGroup = new ArrayList<GroupDTO>();
		for (Group group2 : group) {
			listGroup.add(group2.convertToDTO(group2));
		}
		return listGroup;
	}

	@Override
	public List<GroupDTO> getAllGroup() {
		// TODO Auto-generated method stub
		List<Group> gr = repository.findAll();
		List<GroupDTO> ans = new ArrayList<GroupDTO>();
		for (Group group : gr) {
			ans.add(group.convertToDTO(group));
		}
		return ans;
	}
	@Override
	public GroupDTO findByName(String name) {
		// TODO Auto-generated method stub
		Group gr = repository.findByName(name);
		if(gr == null) return null;
		return gr.convertToDTO(gr);
	}
}
