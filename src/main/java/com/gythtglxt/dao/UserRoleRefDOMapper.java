package com.gythtglxt.dao;

import com.gythtglxt.dataobject.UserRoleRefDO;
import com.gythtglxt.dataobject.UserRoleRefDOKey;
import org.springframework.stereotype.Component;

@Component
public interface UserRoleRefDOMapper {

    int deleteByPrimaryKey(UserRoleRefDOKey key);

    int insert(UserRoleRefDO record);

    int insertSelective(UserRoleRefDO record);

    UserRoleRefDO selectByPrimaryKey(UserRoleRefDOKey key);

    int updateByPrimaryKeySelective(UserRoleRefDO record);

    int updateByPrimaryKey(UserRoleRefDO record);

    int updateByKeySelective(UserRoleRefDO record);

    UserRoleRefDO selectByUserCode(String itemcode);
}