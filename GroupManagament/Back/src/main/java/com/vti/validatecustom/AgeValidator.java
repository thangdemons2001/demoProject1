package com.vti.validatecustom;

import java.time.LocalDate;
import java.time.ZoneId;

import java.util.Date;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class AgeValidator implements ConstraintValidator<Age, Date> {
	
	
	
	@Override
	public boolean isValid(Date value, ConstraintValidatorContext context) {
		// TODO Auto-generated method stub
		
		
		LocalDate twoThousand = LocalDate.of(2000, 1, 1);
		
		LocalDate today = LocalDate.now();
		
		Date datenow = Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant());
		Date yearTwoThousand = Date.from(twoThousand.atStartOfDay(ZoneId.systemDefault()).toInstant());
		
		if(value.after(yearTwoThousand) && value.before(datenow)) return true;
		else return false;
		
		
		
		
	}
	
}
