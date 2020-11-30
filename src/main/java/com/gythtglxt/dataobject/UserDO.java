package com.gythtglxt.dataobject;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class UserDO extends UserDOKey {

    private String orgCode;

    private String username;

    private String password;

    private String salt;

    private String name;

    private String gender;

    private String idcardType;

    private String idcardNo;

    private String email;

    private String state;

    private String mobilephone;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

    private String cityid;

    private Integer type;

    private String portrait;

    private String roleName;
}
