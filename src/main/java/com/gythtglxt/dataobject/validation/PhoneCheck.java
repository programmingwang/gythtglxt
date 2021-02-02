package com.gythtglxt.dataobject.validation;

import com.gythtglxt.util.MobileUtil;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;
import java.lang.annotation.*;
import java.util.Arrays;

/**
 * @Author lrt
 * @Date 2021/1/31 22:18
 * @Version 1.0
 **/
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface PhoneCheck {
    String message() default "没有这个类型，请重新选择";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
class PhoneCheckValidator implements ConstraintValidator<PhoneCheck,String> {

    @Override
    public void initialize(PhoneCheck constraintAnnotation) {

    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        boolean cellPhoneCheck = MobileUtil.checkPhone(s);
        boolean phoneCheck = MobileUtil.isPhone(s);
        if (cellPhoneCheck && phoneCheck){
            return true;
        }
        else {
            return false;
        }
    }
}
