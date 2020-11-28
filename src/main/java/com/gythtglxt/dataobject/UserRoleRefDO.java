package com.gythtglxt.dataobject;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class UserRoleRefDO extends UserRoleRefDOKey {

    private String userCode;

    private String appCode;

    private String roleCode;

    private String platRole;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

}