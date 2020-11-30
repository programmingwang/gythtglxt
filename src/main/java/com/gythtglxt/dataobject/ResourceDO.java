package com.gythtglxt.dataobject;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@ToString
public class ResourceDO extends ResourceDOKey {

    @NotBlank(message = "resourceName不能为空")
    private String resourceName;

    @NotBlank(message = "resourceType不能为空")
    private String resourceType;

    private String resourcePcode;

    private String resourceLevel;

    @NotBlank(message = "resourceUrl不能为空")
    private String resourceUrl;

    private String resourceDescription;

    private Integer sort;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;
}