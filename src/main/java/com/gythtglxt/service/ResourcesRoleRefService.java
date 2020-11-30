package com.gythtglxt.service;

import com.gythtglxt.dataobject.ResourceRoleRefDO;
import com.gythtglxt.dataobject.ResourceRoleRefDOKey;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 14:58
 * @Version 1.0
 */
public interface ResourcesRoleRefService {

    int deleteByPrimaryKey(ResourceRoleRefDOKey key);

    int insertSelective(ResourceRoleRefDO record);

    ResourceRoleRefDO selectByPrimaryKey(ResourceRoleRefDOKey key);

    int updateByPrimaryKeySelective(ResourceRoleRefDO record);

    ResourceRoleRefDO selectByResCode(String itemcode);
}
