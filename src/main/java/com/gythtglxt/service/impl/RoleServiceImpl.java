package com.gythtglxt.service.impl;

import com.gythtglxt.dao.ResourceRoleRefDOMapper;
import com.gythtglxt.dao.RoleDOMapper;
import com.gythtglxt.dataobject.RoleDO;
import com.gythtglxt.dataobject.RoleDOKey;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.RoleService;
import com.gythtglxt.util.UUIDUtils;
import com.gythtglxt.util.UsernameUtil;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 11:25
 * @Version 1.0
 */
@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleDOMapper roleDOMapper;
    @Autowired
    ResourceRoleRefDOMapper resRoleRefDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    UsernameUtil usernameUtil;

    @Override
    public int deleteByPrimaryKey(RoleDOKey key) {
        return roleDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insert(RoleDO record) {
        return roleDOMapper.insert(record);
    }

    @Override
    public void insertSelective(RoleDO roleDO) {
        ValidatorResult result = validator.validate(roleDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        String uuid = UUIDUtils.getUUID();
//        roleDO.setCreater(usernameUtil.getOperateUser());
//        roleDO.setUpdater(usernameUtil.getOperateUser());
        roleDO.setItemcode(uuid);
        roleDOMapper.insertSelective(roleDO);
        //分配resources
        /*if (resourcesDOList.size()!=0){
            ResourcesRoleRefDO resRoleRefDO = new ResourcesRoleRefDO();
            for (ResourcesDO aDo : resourcesDOList) {
                resRoleRefDO.setItemcode(UUIDUtils.getUUID());
                resRoleRefDO.setRoleCode(uuid);
                resRoleRefDO.setResourceCode(aDo.getItemcode());
                resRoleRefDOMapper.insertSelective(resRoleRefDO);
            }
        }*/
    }

    @Override
    public RoleDO selectByPrimaryKey(RoleDOKey key) {
        return roleDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(RoleDO record) {
        return roleDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(RoleDO record) {
        return roleDOMapper.deleteByPrimaryKey(record);
    }

    @Override
    public RoleDO selectByRoleType(Integer type) {
        return roleDOMapper.selectByRoleType(type);
    }

    @Override
    public RoleDO selectRoleByUserid(String itemcode) {
        return roleDOMapper.selectByUserid(itemcode);
    }
}
