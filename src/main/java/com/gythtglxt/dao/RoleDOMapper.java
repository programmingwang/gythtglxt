package com.gythtglxt.dao;

import com.gythtglxt.dataobject.RoleDO;
import com.gythtglxt.dataobject.RoleDOKey;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface RoleDOMapper {

    int deleteByPrimaryKey(RoleDOKey key);

    int insert(RoleDO record);

    int insertSelective(RoleDO record);

    RoleDO selectByPrimaryKey(RoleDOKey key);

    int updateByPrimaryKeySelective(RoleDO record);

    int updateByPrimaryKey(RoleDO record);

    RoleDO selectByUserid(String itemcode);

    RoleDO selectByRoleType(Integer type);

    RoleDO selectByRoleName(String roleName);
}