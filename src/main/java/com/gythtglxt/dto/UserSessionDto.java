package com.gythtglxt.dto;

import lombok.Data;
import lombok.ToString;

/**
 * @Author nongcn
 * @Date 2020/11/10 12:52
 * @Version 1.0
 */
@Data
@ToString
public class UserSessionDto {
    private String username;

    private int itemid;

    private String name;

    private String itemcode;

    private String rolename;

    private String orgCode;

    private String cityId;
}
