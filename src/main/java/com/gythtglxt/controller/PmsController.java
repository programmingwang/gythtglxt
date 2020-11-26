package com.gythtglxt.controller;


import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping(value = "/api/pms")
public class PmsController {

    /**
     * @Author wzh
     * @Date 2020/10/15 11:46
     * @Description :获取上下文信息，userDto
     */


    @ResponseBody
    @RequestMapping("/getAppContext")
    public ResponseData getAppContext(HttpServletRequest request){
//        HttpSession session = request.getSession();
//        UserDto userDto = (UserDto) session.getAttribute("userDto");
//        if (ObjectUtil.isNull(userDto)){
              return new ResponseData(EmBusinessError.success, null);
//        }else {
//            return new ResponseData(EmBusinessError.success, userDto);
//        }
    }
}
