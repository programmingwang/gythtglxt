package com.gythtglxt.service;

import com.gythtglxt.dataobject.DoctorDO;
import com.gythtglxt.dataobject.DoctorDOKey;
import com.gythtglxt.dto.DoctorDto;

import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/26 16:00
 */
public interface IDoctorService {

    int insertSelective(DoctorDO record);

    int updateByPrimaryKeySelective(DoctorDO record);

    int deleteByPrimaryKey(DoctorDOKey key);

    DoctorDO selectByPrimaryKey(DoctorDOKey key);

    List<DoctorDto> selectAll();

    List<DoctorDto> selectByUserCode();
}
