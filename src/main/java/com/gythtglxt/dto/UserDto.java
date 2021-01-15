package com.gythtglxt.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @Author nongcn
 * @Date 2020/10/29 18:02
 * @Version 1.0
 */
@Data
public class UserDto {
    @NotBlank(message = "企业名称不能为空")
    private String orgName;

    private String orgCode;

    @NotBlank(message = "登录账号不能为空")
    private String username;

    @NotBlank(message = "密码不能为空")
    private String password;

    @NotBlank(message = "手机号不能为空")
    private String mobilePhone;
}
