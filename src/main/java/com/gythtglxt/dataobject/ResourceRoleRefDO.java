package com.gythtglxt.dataobject;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
public class ResourceRoleRefDO extends ResourceRoleRefDOKey {

    @NotBlank(message = "resourceCode不能为空")
    private String resourceCode;

    @NotBlank(message = "roleCode不能为空")
    private String roleCode;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;
}