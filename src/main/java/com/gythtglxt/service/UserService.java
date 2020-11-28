package com.gythtglxt.service;

import com.gythtglxt.dataobject.UserDO;
import com.gythtglxt.dataobject.UserDOKey;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/28 0028 21:21
 * @Version 1.0
 */

public interface UserService {

    void deleteUserByUsername(UserDO userDO);

    int insert(UserDO record);

    void insertUserSelective(UserDO record);

    UserDO selectByPrimaryKey(UserDOKey key);

    void updateByPrimaryKeySelective(UserDO userDO);

    int updateByPrimaryKey(UserDO record);

    UserDO selectByName(String username);

}
