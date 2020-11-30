package com.gythtglxt.dao;

import com.gythtglxt.dataobject.UserDO;
import com.gythtglxt.dataobject.UserDOKey;
import org.springframework.stereotype.Component;

@Component
public interface UserDOMapper {

    int deleteByPrimaryKey(UserDOKey key);

    int insert(UserDO record);

    int insertSelective(UserDO record);

    UserDO selectByPrimaryKey(UserDOKey key);

    int updateByPrimaryKeySelective(UserDO record);

    int updateByPrimaryKey(UserDO record);

    int updatePasswordByMobilePhone(String password, String mobilePhone);

    UserDO selectByUsername(String username);
}
