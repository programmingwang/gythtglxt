package com.gythtglxt.service.impl;

import com.gythtglxt.dao.ChineseMedicineDOMapper;
import com.gythtglxt.dataobject.ChineseMedicineDO;
import com.gythtglxt.dataobject.ChineseMedicineDOKey;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.IChineseMedicineService;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/11/26 12:25
 */
@Service
public class ChineseMedicineImpl implements IChineseMedicineService {
    @Resource
    private ChineseMedicineDOMapper chineseMedicineDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Transactional
    @Override

    /*中药数据的添加*/
    public int insertSelective(ChineseMedicineDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if(record.getItemcode()==null){
            record.setItemcode(UUID.randomUUID().toString());
        }
        record.setStatus("0");
        record.setItemcreateat(new Date());
        return chineseMedicineDOMapper.insertSelective(record);
    }

    @Override
    public int deleteByPrimaryKey(ChineseMedicineDOKey key) {
        chineseMedicineDOMapper.deleteByPrimaryKey(key);
        return 0;
    }

    @Override
    public int updateByPrimaryKeySelective(ChineseMedicineDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemupdateat(new Date());
        return chineseMedicineDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<ChineseMedicineDO> selectAllChineseMedicine(List<String> status) {
        List<ChineseMedicineDO> chineseMedicineDOList=new ArrayList<>();
        for(String chinesemedicine:status){
            chineseMedicineDOList.addAll(chineseMedicineDOMapper.selectAllChineseMedicine(chinesemedicine));
        }
        return chineseMedicineDOList;
    }

    @Override
    public int changeStatusToChineseMedicine(ChineseMedicineDOKey key, String status) {
        return chineseMedicineDOMapper.changeStatusToChineseMedicine(key,status);
    }
}