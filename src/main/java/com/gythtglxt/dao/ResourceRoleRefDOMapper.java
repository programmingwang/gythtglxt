package com.gythtglxt.dao;

import com.gythtglxt.dataobject.ResourceRoleRefDO;
import com.gythtglxt.dataobject.ResourceRoleRefDOKey;
import org.springframework.stereotype.Component;

@Component
public interface ResourceRoleRefDOMapper {

    int deleteByPrimaryKey(ResourceRoleRefDOKey key);

    int insert(ResourceRoleRefDO record);

    int insertSelective(ResourceRoleRefDO record);

    ResourceRoleRefDO selectByPrimaryKey(ResourceRoleRefDOKey key);

    int updateByPrimaryKeySelective(ResourceRoleRefDO record);

    int updateByPrimaryKey(ResourceRoleRefDO record);

    ResourceRoleRefDO selectByResCode(String itemcode);
}