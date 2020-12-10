package com.gythtglxt.controller.audit;

import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.HospitalService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/30 15:39
 * @Version 1.0
 **/
@RestController
@Api(tags = "国医堂审核")
@RequestMapping(value = "audit")
public class auditController {

    @Resource
    private HospitalService hospitalService;

    @GetMapping(value = "/hospital")
    public ResponseData getAll(){
        return new ResponseData(EmBusinessError.success,hospitalService.selectAll());
    }
}
