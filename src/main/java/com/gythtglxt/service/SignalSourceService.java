package com.gythtglxt.service;

import java.util.List;
import com.gythtglxt.dataobject.SignalSource;
import com.gythtglxt.dto.SignalSourceDoctorDto;
import com.gythtglxt.dto.SignalSourceDto;

/**
 * @Author lrt
 * @Date 2020/11/26 17:06
 * @Version 1.0
 **/
public interface SignalSourceService {


    int deleteByPrimaryKey(Integer itemid, String itemcode);

    int insertSelective(SignalSource record);

    int updateByPrimaryKeySelective(SignalSource record);

    List<SignalSourceDto> selectAllByUserCodeOrStatusOrRegisterDate(String userCode, String status,String year);

    List<SignalSourceDoctorDto> getDoctor(String usercode);

    int dayUpdate();
}

