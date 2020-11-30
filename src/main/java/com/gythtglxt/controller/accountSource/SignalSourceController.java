package com.gythtglxt.controller.accountSource;

import com.gythtglxt.dataobject.SignalSource;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.SignalSourceService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/27 16:31
 * @Version 1.0
 **/
@Api(tags = "号源管理")
@RestController
@RequestMapping(value = "accountSource")
public class SignalSourceController {

    @Resource
    SignalSourceService signalSourceService;

    @RequestMapping(value = "/signal-source", method = RequestMethod.GET)
    public ResponseData getSource(@RequestParam String userCode, @RequestParam String status,@RequestParam String year) {
        if (status.isEmpty()){
            status = null;
        }
        if (year.isEmpty()){
            year = null;
        }
        return new ResponseData(EmBusinessError.success, signalSourceService.selectAllByUserCodeOrStatusOrRegisterDate(userCode, status,year));
    }

    @PutMapping(value = "/signal-source")
    public ResponseData updSource(@RequestBody SignalSource record){

        return new ResponseData(EmBusinessError.success,signalSourceService.updateByPrimaryKeySelective(record));
    }

    @DeleteMapping(value = "/signal-source")
    public ResponseData delSource(@RequestBody SignalSource record){
        return new ResponseData(EmBusinessError.success,signalSourceService.deleteByPrimaryKey(record.getItemid(),record.getItemcode()));
    }

    @PostMapping(value = "/signal-source")
    public ResponseData addSource(@RequestBody SignalSource record){
        return new ResponseData(EmBusinessError.success,signalSourceService.insertSelective(record));
    }

    @GetMapping(value = "/doctor")
    public ResponseData getDoctor(@RequestParam String usercode){
        return new ResponseData(EmBusinessError.success,signalSourceService.getDoctor(usercode));
    }
}
