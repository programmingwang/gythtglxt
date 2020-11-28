package com.gythtglxt.service.impl;

import com.gythtglxt.dao.RoleDOMapper;
import com.gythtglxt.dao.UserDOMapper;
import com.gythtglxt.dao.UserRoleRefDOMapper;
import com.gythtglxt.dataobject.*;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.UserService;
import com.gythtglxt.util.UUIDUtils;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @Author wanglx
 * @Date 2020/10/28 0028 21:25
 * @Version 1.0
 */

@Service
public class UserServiceImpl implements UserService {
    @Resource
    UserDOMapper userDOMapper;
    @Autowired
    UserRoleRefDOMapper userRoleRefDOMapper;
    @Autowired
    RoleDOMapper roleDOMapper;
    @Autowired
    private ValidatorImpl validator;

    @Override
    public void deleteUserByUsername(UserDO userDO) {
        //删除用户角色关系
        UserRoleRefDOKey userRoleRefDOKey = new UserRoleRefDOKey();
        UserRoleRefDO userRoleRefDO = userRoleRefDOMapper.selectByUserCode(userDO.getItemcode());
        userRoleRefDOKey.setItemid(userRoleRefDO.getItemid());
        userRoleRefDOKey.setItemcode(userRoleRefDO.getItemcode());
        userRoleRefDOMapper.deleteByPrimaryKey(userRoleRefDOKey);
        //删除用户
        UserDOKey userDOKey = new UserDOKey();
        userDOKey.setItemid(userDO.getItemid());
        userDOKey.setItemcode(userDO.getItemcode());
        userDOMapper.deleteByPrimaryKey(userDOKey);
    }

    @Override
    public int insert(UserDO record) {
        return userDOMapper.insert(record);
    }

    @Override
    public void insertUserSelective(UserDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        //添加用户
//        record.setUpdater(usernameUtil.getOperateUser());
//        record.setCreater(usernameUtil.getOperateUser());
        record.setPassword(new BCryptPasswordEncoder().encode("123456"));
        record.setItemcode(UUIDUtils.getUUID());
        userDOMapper.insertSelective(record);
        //分配角色
        //查询角色role_code
        RoleDO roleDO = roleDOMapper.selectByRoleName(record.getRoleName());
        UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
//        userRoleRefDO.setUpdater(usernameUtil.getOperateUser());
//        userRoleRefDO.setCreater(usernameUtil.getOperateUser());
        userRoleRefDO.setItemcode(UUIDUtils.getUUID());
        userRoleRefDO.setRoleCode(roleDO.getItemcode());
        userRoleRefDO.setUserCode(record.getItemcode());
        userRoleRefDO.setPlatRole(roleDO.getRoleName());
        userRoleRefDOMapper.insertSelective(userRoleRefDO);
    }

    @Override
    public UserDO selectByPrimaryKey(UserDOKey key) {
        return userDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public void updateByPrimaryKeySelective(UserDO userDO) {
        UserDOKey userDOKey = new UserDOKey();
        userDOKey.setItemid(userDO.getItemid());
        userDOKey.setItemcode(userDO.getItemcode());
        UserDO userDO1 = userDOMapper.selectByPrimaryKey(userDOKey);
        //更新用户信息
//        userDO.setUpdater(usernameUtil.getOperateUser());
        userDOMapper.updateByPrimaryKeySelective(userDO);
        //更新角色
        if (!userDO1.getType().equals(userDO.getType())&& userDO.getType()!=null ){
            RoleDO roleDO = roleDOMapper.selectByRoleType(userDO.getType());
            UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
            //获取需要更新的userRoleRefDO
            UserRoleRefDO userRoleRefDO1 = userRoleRefDOMapper.selectByUserCode(userDO.getItemcode());
//            userRoleRefDO.setUpdater(usernameUtil.getOperateUser());
            userRoleRefDO.setItemid(userRoleRefDO1.getItemid());
            userRoleRefDO.setItemcode(userRoleRefDO1.getItemcode());
            userRoleRefDO.setRoleCode(roleDO.getItemcode());
            userRoleRefDO.setUserCode(userDO.getItemcode());
            userRoleRefDO.setPlatRole(roleDO.getRoleName());
            userRoleRefDOMapper.updateByPrimaryKeySelective(userRoleRefDO);
        }
    }

    @Override
    public int updateByPrimaryKey(UserDO record) {
        return userDOMapper.updateByPrimaryKey(record);
    }

    @Override
    public UserDO selectByName(String username) {
        return userDOMapper.selectByUsername(username);
    }

}