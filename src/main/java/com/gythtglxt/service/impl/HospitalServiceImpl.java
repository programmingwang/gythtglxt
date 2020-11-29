package com.gythtglxt.service.impl;

import com.gythtglxt.dao.HospitalMapper;
import com.gythtglxt.dataobject.Hospital;
import com.gythtglxt.dto.HospitalDto;
import com.gythtglxt.service.HospitalService;
import com.gythtglxt.service.IFileService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/27 23:21
 * @Version 1.0
 **/
@Service
public class HospitalServiceImpl implements HospitalService {

    @Resource
    private HospitalMapper hospitalMapper;

    @Resource
    private IFileService fileService;

    @Override
    public int deleteByPrimaryKey(Integer itemid, String itemcode) {
        return hospitalMapper.deleteByPrimaryKey(itemid, itemcode);
    }

    @Override
    public int insertSelective(Hospital record) {
        return hospitalMapper.insertSelective(record);
    }

    @Override
    public int updateByPrimaryKeySelective(Hospital record) {
//        record.setUpdater();
        return hospitalMapper.updateByPrimaryKeySelective(record);
    }


    @Override
    public HospitalDto selectOneByItemcode(String itemcode) {
        HospitalDto res = new HospitalDto();
        Hospital hospital = hospitalMapper.selectOneByItemcode(itemcode);
        BeanUtils.copyProperties(hospital, res);
        res.setFilePath(fileService.selectFileByDataCode(res.getItemcode()).getFilePath());
        return res;
    }


}




