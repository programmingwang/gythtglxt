package com.gythtglxt.dataobject;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class RoleDO extends RoleDOKey {

    private String roleName;

    private String roleDescription;

    private String appCode;

    private Integer roleType;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;
}