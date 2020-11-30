package com.gythtglxt.service;

import com.gythtglxt.dataobject.ResourceDO;
import com.gythtglxt.dataobject.ResourceDOKey;
import com.gythtglxt.dataobject.UserDO;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 11:58
 * @Version 1.0
 */
public interface ResourcesService {

    void deleteByPrimaryKey(ResourceDO resourcesDO);

    int insert(ResourceDO record);

    void insertSelective(ResourceDO record);

    ResourceDO selectByPrimaryKey(ResourceDOKey key);

    int updateByPrimaryKeySelective(ResourceDO record);

    int updateByPrimaryKey(ResourceDO record);

//    List<ResourceDO> selectAllResources();

//    List<ResourceDO> SelectMenuByRoleCode(UserDO userDO);

    List<ResourceDO> selectListByPath(String requestUrl);

    List<ResourceDO> SelectPermissionByRoleCode(String rolecode);

    List<ResourceDO> selectPres();
}
