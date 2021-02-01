package com.gythtglxt.util;

import com.gythtglxt.dto.UserSessionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * Author:wangzh
 * Date: 2020/11/14 10:15
 * Version: 1.0
 */
@Component
public class UsernameUtil {
    @Autowired
    private HttpServletRequest request;
    @Autowired
    UsernameUtil usernameUtil;

    public String getOperateUser(){
        UserSessionDto user = (UserSessionDto) request.getSession().getAttribute("user");
        return user.getUsername();
    }
    public String getOrgCode(){
        UserSessionDto user = (UserSessionDto) request.getSession().getAttribute("user");
        return user.getOrgCode();
    }

    public String getRoleName(){
        UserSessionDto user = (UserSessionDto) request.getSession().getAttribute("user");
        return user.getRolename();
    }

    public String getItemCode() {
        UserSessionDto user = (UserSessionDto) request.getSession().getAttribute("user");
        return user.getItemcode();
    }

    public String getCityId() {
        UserSessionDto user = (UserSessionDto) request.getSession().getAttribute("user");
        return user.getCityId();
    }
}
