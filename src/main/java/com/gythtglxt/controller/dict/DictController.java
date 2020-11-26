package com.gythtglxt.controller.dict;

import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.IDictService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/2 16:25
 * @Version 1.0
 **/
@Api(tags = "获取字典值")
@RestController
@RequestMapping(value = "dict")
public class DictController {
    @Resource
    IDictService dictService;

    @RequestMapping(value = "/getDictByCode",method = RequestMethod.POST)
    public ResponseData getDictByCode(@ApiParam(value = "字典代码，对应dict表中的dict.DICT_CODE") @RequestParam String code){
        ResponseData responseData = new ResponseData();
        responseData.setCode(EmBusinessError.success.getErrCode());
        responseData.setMsg(EmBusinessError.success.getErrMsg());
        responseData.setData(dictService.getDictListByCode(code));
        return responseData;
    }
}
