package com.gythtglxt.dao;

import com.gythtglxt.dataobject.DoctorDO;
import com.gythtglxt.dataobject.DoctorDOKey;
import com.gythtglxt.dto.DoctorDto;

import java.util.List;

public interface DoctorDOMapper {

    int deleteByPrimaryKey(DoctorDOKey key);

    int insert(DoctorDO record);

    int insertSelective(DoctorDO record);

    DoctorDO selectByPrimaryKey(DoctorDOKey key);

    int updateByPrimaryKeySelective(DoctorDO record);

    int updateByPrimaryKey(DoctorDO record);

    List<DoctorDto> selectAll();

    List<DoctorDto> selectByORGCode(String ORGCode);
}