package com.gythtglxt.service.impl;

import com.gythtglxt.dao.ResourceRoleRefDOMapper;
import com.gythtglxt.dataobject.ResourceRoleRefDO;
import com.gythtglxt.dataobject.ResourceRoleRefDOKey;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.ResourcesRoleRefService;
import com.gythtglxt.util.UUIDUtils;
import com.gythtglxt.util.UsernameUtil;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 14:59
 * @Version 1.0
 */
@Service
public class ResourcesRoleRefServiceImpl implements ResourcesRoleRefService {
    @Autowired
    ResourceRoleRefDOMapper rRRMapper;
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    UsernameUtil usernameUtil;

    @Override
    public int deleteByPrimaryKey(ResourceRoleRefDOKey key) {
        return rRRMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insertSelective(ResourceRoleRefDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcode(UUIDUtils.getUUID());
        return rRRMapper.insertSelective(record);
    }

    @Override
    public ResourceRoleRefDO selectByPrimaryKey(ResourceRoleRefDOKey key) {
        return rRRMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(ResourceRoleRefDO record) {
        record.setUpdater(usernameUtil.getOperateUser());
        return rRRMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public ResourceRoleRefDO selectByResCode(String itemcode) {
        return rRRMapper.selectByResCode(itemcode);
    }

}
