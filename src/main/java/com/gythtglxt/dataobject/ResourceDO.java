package com.gythtglxt.dataobject;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class ResourceDO extends ResourceDOKey {

    private String resourceName;

    private String resourceType;

    private String resourcePcode;

    private String resourceLevel;

    private String resourceUrl;

    private String resourceDescription;

    private Integer sort;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;
}