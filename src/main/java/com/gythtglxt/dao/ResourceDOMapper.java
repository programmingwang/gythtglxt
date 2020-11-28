package com.gythtglxt.dao;

import com.gythtglxt.dataobject.ResourceDO;
import com.gythtglxt.dataobject.ResourceDOKey;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ResourceDOMapper {

    int deleteByPrimaryKey(ResourceDOKey key);

    int insert(ResourceDO record);

    int insertSelective(ResourceDO record);

    ResourceDO selectByPrimaryKey(ResourceDOKey key);

    int updateByPrimaryKeySelective(ResourceDO record);

    int updateByPrimaryKey(ResourceDO record);

    List<ResourceDO> selectPres();

    List<ResourceDO> SelectPermissionByRoleCode(String itemcode);

    List<ResourceDO> selectListByPath(String requestUrl);
}