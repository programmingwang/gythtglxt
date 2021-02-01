package com.gythtglxt.controller.user;

import com.gythtglxt.dataobject.UserDO;
import com.gythtglxt.dto.UpdatePwdDto;
import com.gythtglxt.dto.UserDto;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.UserService;
import com.gythtglxt.util.UsernameUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author nongcn
 * @Date 2020/10/29 11:30
 * @Version 1.0
 */
@RestController
@RequestMapping(value = "user")
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    HttpServletRequest request;
    @Autowired
    UsernameUtil usernameUtil;

    /**
     * 用户注册，接收前段传递的数据，到service层
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseData Register(UserDto userDto) throws BusinessException {
        ResponseData rd = userService.Register(userDto);
        if (rd.getCode().equals(EmBusinessError.success.getErrCode())) {
            return new ResponseData(EmBusinessError.success, rd.getData());
        } else {
            return new ResponseData(EmBusinessError.USER_REGISTER_FAILED);
        }
    }

    /**
     * 根据电话号码来修改密码
     *
     * @param updatePwdDto
     */
    @RequestMapping(value = "/updatepwd", method = RequestMethod.PUT)
    public ResponseData UpdatePassword(UpdatePwdDto updatePwdDto) {
        if (StringUtils.isBlank(updatePwdDto.getNewPassword()) || StringUtils.isBlank(updatePwdDto.getCheckNewPassword()) ||
                StringUtils.isBlank(updatePwdDto.getMobilePhone()) || StringUtils.isBlank(updatePwdDto.getPassword())) {
            return new ResponseData(EmBusinessError.INPUT_NOT_NULL);
        } else {
            if (updatePwdDto.getPassword().equals(updatePwdDto.getNewPassword())) {
                return new ResponseData(EmBusinessError.OPWD_EQUAL_NPWD);
            } else {
                if (updatePwdDto.getNewPassword().equals(updatePwdDto.getCheckNewPassword())) {
                    ResponseData rd = userService.UpdatePassword(updatePwdDto);
                    if (rd.getCode().equals(EmBusinessError.success.getErrCode())) {
                        return new ResponseData(EmBusinessError.success);
                    } else {
                        return new ResponseData(EmBusinessError.MODIFY_USER_MESSAGE_FAILED);
                    }
                } else {
                    return new ResponseData(EmBusinessError.NEWPASSWORD_NOT_EQUAL);
                }
            }
        }
    }

    /**
     * 个人信息
     * @return
     */
    @RequestMapping(value = "/usermsg", method = RequestMethod.GET)
    public ResponseData selectOne() {
        UserDO userDO = userService.selectByName(usernameUtil.getOperateUser());
        return new ResponseData(EmBusinessError.success, userDO);
    }

    /**
     * 修改个人信息
     * @param userDO
     * @return
     */
    @RequestMapping(value = "/updateusermsg", method = RequestMethod.POST)
    public ResponseData updateUserMsg(@RequestBody UserDO userDO) {
        userService.UpdateUserMsg(userDO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 修改用户头像
     * @param userDO
     * @return
     */
    @RequestMapping(value = "/updateuserimg", method = RequestMethod.POST)
    public ResponseData updateUserPortrait(@RequestBody UserDO userDO) {
        userService.UpdateUserPortrait(userDO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 用户未录入机构信息点击返回按钮则删除用户信息
     * @param userDtO
     * @return
     */
    @RequestMapping(value = "/deletuser", method = RequestMethod.POST)
    public ResponseData deleteUserByUsername(@RequestBody UserDto userDtO){
        userService.deleteUserByUsername(userDtO);
        return new ResponseData(EmBusinessError.success);
    }
}
