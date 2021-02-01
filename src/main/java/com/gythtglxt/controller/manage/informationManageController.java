package com.gythtglxt.controller.manage;

import com.gythtglxt.dataobject.Hospital;
import com.gythtglxt.dto.HospitalDto;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.HospitalService;
import io.swagger.annotations.Api;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/29 11:41
 * @Version 1.0
 **/
@RestController
@Api(tags = "信息维护")
public class informationManageController {

    @Resource
    HospitalService hospitalService;

    @GetMapping(value = "information")
    public ResponseData getHospital(@RequestParam String itemCode){
        return new ResponseData(EmBusinessError.success,hospitalService.selectOneByItemcode(itemCode));
    }

    @PutMapping(value = "information")
    public ResponseData updHospital(@RequestBody HospitalDto hospitalDto){
        if (hospitalDto.getStatus().equals("3") || hospitalDto.getStatus().equals("5") || hospitalDto.getStatus().equals("7")) {
            if (hospitalDto.getReason() == null || hospitalDto.getReason().equals("")){
                return new ResponseData(EmBusinessError.PARAMETER_VALIDATION_ERROR);
            }
        }
        Hospital hospital = new Hospital();
        BeanUtils.copyProperties(hospitalDto,hospital);
        return new ResponseData(EmBusinessError.success,hospitalService.updateByPrimaryKeySelective(hospital));
    }

    @PutMapping(value = "insert")
    public ResponseData updateHospital(@RequestBody HospitalDto hospitalDto){
        Hospital hospital = new Hospital();
        BeanUtils.copyProperties(hospitalDto,hospital);
        return new ResponseData(EmBusinessError.success,hospitalService.updateByPrimaryKeySelectiveForRegister(hospital));
    }
}
