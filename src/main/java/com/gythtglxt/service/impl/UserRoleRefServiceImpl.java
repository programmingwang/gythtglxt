package com.gythtglxt.service.impl;

import com.gythtglxt.dao.UserRoleRefDOMapper;
import com.gythtglxt.dataobject.UserRoleRefDO;
import com.gythtglxt.dataobject.UserRoleRefDOKey;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.UserRoleRefService;
import com.gythtglxt.util.UUIDUtils;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 14:52
 * @Version 1.0
 */
@Service
public class UserRoleRefServiceImpl implements UserRoleRefService {

    @Autowired
    UserRoleRefDOMapper userRoleRefDOMapper;
    @Autowired
    private ValidatorImpl validator;

    @Override
    public int deleteByPrimaryKey(UserRoleRefDOKey key) {
        return userRoleRefDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insertSelective(UserRoleRefDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcode(UUIDUtils.getUUID());
        return userRoleRefDOMapper.insertSelective(record);
    }

    @Override
    public UserRoleRefDO selectByPrimaryKey(UserRoleRefDOKey key) {
        return userRoleRefDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(UserRoleRefDO record) {
        return userRoleRefDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByKeySelective(UserRoleRefDO record) {
        return userRoleRefDOMapper.updateByKeySelective(record);
    }

    @Override
    public UserRoleRefDO selectByUserCode(String itemcode) {
        return userRoleRefDOMapper.selectByUserCode(itemcode);
    }
}
