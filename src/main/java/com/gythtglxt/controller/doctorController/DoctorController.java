package com.gythtglxt.controller.doctorController;

import com.gythtglxt.dataobject.DoctorDO;
import com.gythtglxt.dataobject.DoctorDOKey;
import com.gythtglxt.dto.DoctorDto;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.IDoctorService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/26 17:06
 */
@RestController
@RequestMapping(value = "/doctor")
public class DoctorController {
    @Resource
    private IDoctorService doctorService;

    /*新增医生*/
    @PostMapping(value = "/doctor")
    public ResponseData addDoctor(@RequestBody DoctorDO record) {
        doctorService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    /*更新医生*/
    @PutMapping(value = "/doctor")
    public ResponseData updateDoctor(@RequestBody DoctorDO record){
        doctorService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    /*删除医生*/
    @DeleteMapping(value = "/doctor")
    public ResponseData deleteDoctor(@RequestBody DoctorDOKey key){
        doctorService.deleteByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success);
    }

    /*查询所有医生*/
    @GetMapping(value = "/doctor")
    public ResponseData selectAll(){
        List<DoctorDto> doctorDtoList =  doctorService.selectByORGCode();
        return new ResponseData(EmBusinessError.success,doctorDtoList);
    }

}
