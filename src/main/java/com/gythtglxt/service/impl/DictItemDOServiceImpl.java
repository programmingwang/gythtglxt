package com.gythtglxt.service.impl;

import com.gythtglxt.dao.DictItemDOMapper;
import com.gythtglxt.dataobject.DictItemDO;
import com.gythtglxt.dataobject.DictItemDOKey;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.IDictItemDOService;
import com.gythtglxt.util.DateUtils;
import com.gythtglxt.util.UUIDUtils;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class DictItemDOServiceImpl implements IDictItemDOService {
    @Resource
    private DictItemDOMapper dictItemDOMapper;

    @Autowired
    private DictItemDOServiceImpl dictItemDOService;

    @Autowired
    private ValidatorImpl validator;
    /*删除数据字典项*/
    @Override
    public int deleteByPrimaryKey(DictItemDOKey key) {
        return dictItemDOMapper.deleteByPrimaryKey(key);
    }
    /*新增数据字典项*/
    @Override
    public int insert(DictItemDO record) {
        return dictItemDOMapper.insert(record);
    }
    /*新增数据字典项跳NULL*/
    @Override
    public int insertSelective(DictItemDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcreateat(DateUtils.getDate());
        record.setItemcode(UUIDUtils.getUUID());
        return dictItemDOMapper.insertSelective(record);
    }
    /*查找数据字典项*/
    @Override
    public DictItemDO selectByPrimaryKey(DictItemDOKey key) {
        return dictItemDOMapper.selectByPrimaryKey(key);
    }
    /*修改数据字典项跳NULL*/
    @Override
    public int updateByPrimaryKeySelective(DictItemDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return dictItemDOMapper.updateByPrimaryKeySelective(record);
    }
    /*修改数据字典项*/
    @Override
    public int updateByPrimaryKey(DictItemDO record) {
        return dictItemDOMapper.updateByPrimaryKey(record);
    }
}
