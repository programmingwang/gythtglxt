package com.gythtglxt.service.impl;

import com.gythtglxt.dao.DictDOMapper;
import com.gythtglxt.dataobject.DictDO;
import com.gythtglxt.dataobject.DictDOKey;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.IDictDOService;
import com.gythtglxt.util.DateUtils;
import com.gythtglxt.util.UUIDUtils;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class DictDOServiceImpl implements IDictDOService {

    @Resource
    private DictDOMapper dictDOMapper;

    @Autowired
    private DictDOServiceImpl dictDOService;

    @Autowired
    private ValidatorImpl validator;
    /*删除数据字典*/
    @Override
    public int deleteByPrimaryKey(DictDOKey key) {
        return dictDOMapper.deleteByPrimaryKey(key);
    }
    /*新增数据字典*/
    @Override
    public int insert(DictDO record) {
        return dictDOMapper.insert(record);
    }
    /*新增数据字典跳过NULL*/
    @Override
    public int insertSelective(DictDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcreateat(DateUtils.getDate());
        record.setItemcode(UUIDUtils.getUUID());
        return dictDOMapper.insertSelective(record);
    }
    /*查找数据字典*/
    @Override
    public DictDO selectByPrimaryKey(DictDOKey key) {
        return dictDOMapper.selectByPrimaryKey(key);
    }
    /*修改数据字典跳NULL*/
    @Override
    public int updateByPrimaryKeySelective(DictDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return dictDOMapper.updateByPrimaryKeySelective(record);
    }
    /*修改数据字典*/
    @Override
    public int updateByPrimaryKey(DictDO record) {
        return dictDOMapper.updateByPrimaryKey(record);
    }
}
