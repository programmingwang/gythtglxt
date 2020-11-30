package com.gythtglxt.service;
import java.util.List;

import com.gythtglxt.dataobject.Hospital;
import com.gythtglxt.dto.HospitalDto;

/**
 * @Author lrt
 * @Date 2020/11/27 23:21
 * @Version 1.0
 **/
public interface HospitalService {


    int deleteByPrimaryKey(Integer itemid, String itemcode);

    int insertSelective(Hospital record);

    int updateByPrimaryKeySelective(Hospital record);

    HospitalDto selectOneByItemcode(String itemcode);


	List<HospitalDto> selectAll();




}




