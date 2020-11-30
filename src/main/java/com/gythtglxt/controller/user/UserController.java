package com.gythtglxt.controller.user;

import com.gythtglxt.dataobject.UserDO;
import com.gythtglxt.dto.UpdatePwdDto;
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
import java.util.List;

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
     * 根据电话号码来修改密码
     *
     * @param updatePwdDto
     */
//    @LogAnnotation(logTitle = "修改密码", logLevel = "2")
    @RequestMapping(value = "/updatepwd", method = RequestMethod.PUT)
    public ResponseData UpdatePassword(UpdatePwdDto updatePwdDto) {
        if (StringUtils.isEmpty(updatePwdDto.getNewPassword()) || StringUtils.isEmpty(updatePwdDto.getCheckNewPassword())) {
            return new ResponseData(EmBusinessError.INPUT_NOT_NULL);
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

//    @LogAnnotation(logTitle = "查看个人信息", logLevel = "1")
    @RequestMapping(value = "/usermsg", method = RequestMethod.GET)
    public ResponseData selectOne() {
        UserDO userDO = userService.selectByName(usernameUtil.getOperateUser());
        return new ResponseData(EmBusinessError.success, userDO);
    }

//    @LogAnnotation(logTitle = "修改个人信息", logLevel = "2")
    @RequestMapping(value = "/updateusermsg", method = RequestMethod.POST)
    public ResponseData updateUserMsg(@RequestBody UserDO userDO) {
        userService.UpdateUserMsg(userDO);
        return new ResponseData(EmBusinessError.success);
    }

//    @LogAnnotation(logTitle = "修改用户头像", logLevel = "2")
    @RequestMapping(value = "/updateuserimg", method = RequestMethod.POST)
    public ResponseData updateUserPortrait(@RequestBody UserDO userDO) {
        userService.UpdateUserPortrait(userDO);
        return new ResponseData(EmBusinessError.success);
    }

}
