package com.gythtglxt.dao;

import com.gythtglxt.dataobject.SignalSource;
import java.util.List;

import com.gythtglxt.dto.SignalSourceDoctorDto;
import com.gythtglxt.dto.SignalSourceDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * @Author lrt
 * @Date 2020/11/27 21:32
 * @Version 1.0
 **/
@Mapper
public interface SignalSourceMapper {

    int deleteByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int insertSelective(SignalSource record);

    int updateByPrimaryKeySelective(SignalSource record);

    List<SignalSourceDto> selectAllByUserCodeOrStatusOrRegisterDate(@Param("userCode") String userCode,
                                                                    @Param("status") String status,
                                                                    @Param("year") String year);
    List<SignalSourceDoctorDto> getDoctor(String usercode);

    int dayUpdate();
}