package com.gythtglxt.config.handler;

import com.alibaba.fastjson.JSON;
import com.gythtglxt.dao.OrganizationDOMapper;
import com.gythtglxt.dao.RoleDOMapper;
import com.gythtglxt.dataobject.RoleDO;
import com.gythtglxt.dataobject.UserDO;
import com.gythtglxt.dto.UserSessionDto;
import com.gythtglxt.service.UserService;
import com.gythtglxt.util.JsonResult;
import com.gythtglxt.util.ResultTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Description: 登录成功处理逻辑
 */
@Component
public class CustomizeAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    UserService userService;
    @Autowired
    RoleDOMapper roleDOMapper;
    @Autowired
    OrganizationDOMapper organizationDOMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException {
        //更新用户表上次登录时间、更新人、更新时间等字段
        User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDO userDo = userService.selectByName(userDetails.getUsername());
        RoleDO roleDO = roleDOMapper.selectByUserid(userDo.getItemcode());
        UserSessionDto userSessionDto = new UserSessionDto();
        userSessionDto.setOrgCode(userDo.getOrgCode());
        userSessionDto.setUsername(userDo.getUsername());
        userSessionDto.setRolename(roleDO.getRoleName());
        userSessionDto.setItemid(userDo.getItemid());
        userSessionDto.setItemcode(userDo.getItemcode());
        httpServletRequest.getSession().setAttribute("user", userSessionDto);
        //返回json数据
        JsonResult result = ResultTool.success(userSessionDto);
        httpServletResponse.setContentType("text/json;charset=utf-8");
        httpServletResponse.getWriter().write(JSON.toJSONString(result));
    }
}
