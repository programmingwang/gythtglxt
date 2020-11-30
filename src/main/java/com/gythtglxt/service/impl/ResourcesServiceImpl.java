package com.gythtglxt.service.impl;

import com.gythtglxt.dao.ResourceDOMapper;
import com.gythtglxt.dao.ResourceRoleRefDOMapper;
import com.gythtglxt.dao.RoleDOMapper;
import com.gythtglxt.dataobject.*;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.ResourcesService;
import com.gythtglxt.util.*;
import com.gythtglxt.util.DateUtils;
import com.gythtglxt.util.UUIDUtils;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 11:58
 * @Version 1.0
 */
@Service
public class ResourcesServiceImpl implements ResourcesService {
    @Autowired
    ResourceDOMapper resourcesDOMapper;
    @Autowired
    RoleDOMapper roleDOMapper;
    @Autowired
    ResourceRoleRefDOMapper resourcesRoleRefDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    UsernameUtil usernameUtil;

    @Override
    public void deleteByPrimaryKey(ResourceDO resourcesDO) {
        //
        ResourceRoleRefDOKey resRoleRefDOKey = new ResourceRoleRefDOKey();
        ResourceRoleRefDO resRoleRefDO = resourcesRoleRefDOMapper.selectByResCode(resourcesDO.getItemcode());
        resRoleRefDOKey.setItemid(resRoleRefDO.getItemid());
        resRoleRefDOKey.setItemcode(resRoleRefDO.getItemcode());
        resourcesRoleRefDOMapper.deleteByPrimaryKey(resRoleRefDOKey);
        //
        ResourceDOKey resourcesDOKey = new ResourceDOKey();
        resourcesDOKey.setItemid(resourcesDO.getItemid());
        resourcesDOKey.setItemcode(resourcesDO.getItemcode());
        resourcesDOMapper.deleteByPrimaryKey(resourcesDOKey);
    }

    @Override
    public int insert(ResourceDO record) {
        record.setItemcode(UUIDUtils.getUUID());
        return resourcesDOMapper.insert(record);
    }

    @Override
    public void insertSelective(ResourceDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
//        record.setUpdater(usernameUtil.getOperateUser());
//        record.setCreater(usernameUtil.getOperateUser());
        record.setItemcode(UUIDUtils.getUUID());
        resourcesDOMapper.insertSelective(record);
    }

    @Override
    public ResourceDO selectByPrimaryKey(ResourceDOKey key) {
        return resourcesDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(ResourceDO record) {
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemupdateat(DateUtils.getDate());
        return resourcesDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(ResourceDO record) {
        record.setUpdater(usernameUtil.getOperateUser());
        return resourcesDOMapper.updateByPrimaryKey(record);
    }

    /*@Override
    public List<ResourceDO> selectAllResources() {
        List<ResourceDO> resourcesDOS = resourcesDOMapper.selectAllResources();
//        MenuTreeUtil menuTreeUtil = new MenuTreeUtil(resourcesDOS, null);
//        List<ResourceDO> treeGridList = menuTreeUtil.buildTreeGrid();
        return resourcesDOS;
    }*/

    /*@Override
    public List<ResourceDO> SelectMenuByRoleCode(UserDO userDO) {
        RoleDO roleDO = roleDOMapper.selectByUserid(userDO.getItemcode());
        List<ResourceDO> resourcesDOS = resourcesDOMapper.SelectMenuByRoleCode(roleDO.getItemcode());
        MenuTreeUtil menuTreeUtil = new MenuTreeUtil(resourcesDOS, null);
        return menuTreeUtil.buildTreeGrid();
    }*/

    @Override
    public List<ResourceDO> selectListByPath(String requestUrl) {
        return resourcesDOMapper.selectListByPath(requestUrl);
    }

    @Override
    public List<ResourceDO> SelectPermissionByRoleCode(String rolecode) {
        return resourcesDOMapper.SelectPermissionByRoleCode(rolecode);
    }

    @Override
    public List<ResourceDO> selectPres() {
        return resourcesDOMapper.selectPres();
    }
}
