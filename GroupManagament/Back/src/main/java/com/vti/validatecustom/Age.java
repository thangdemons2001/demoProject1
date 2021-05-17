package com.vti.validatecustom;
import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.CONSTRUCTOR;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.ElementType.TYPE_USE;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Date;

import javax.validation.Constraint;
import javax.validation.Payload;
//import com.vti.validatecustom.Age.List;

@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
//@Repeatable(List.class)
@Documented
@Constraint(validatedBy = {AgeValidator.class})
public @interface Age {
	 String message() default "Date is invalid!";
	 Class<?>[] groups() default {};
	 Class<? extends Payload>[] payload() default {};
	 
	
//	 @Target({ METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER, TYPE_USE })
//	 @Retention(RUNTIME)
//	 @Documented
//	 @interface List {
//		 Age[] value();
//	 }
//	 
	 
	 
}
