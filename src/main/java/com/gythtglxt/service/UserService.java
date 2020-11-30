package com.gythtglxt.service;

import com.gythtglxt.dataobject.UserDO;
import com.gythtglxt.dataobject.UserDOKey;
import com.gythtglxt.dto.UpdatePwdDto;
import com.gythtglxt.dto.UserDto;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.response.ResponseData;


/**
 * @Author wanglx
 * @Date 2020/10/28 0028 21:21
 * @Version 1.0
 */

public interface UserService {

    void deleteUserByUsername(UserDto userDtO);

    int insert(UserDO record);

    void insertUserSelective(UserDO record);

    UserDO selectByPrimaryKey(UserDOKey key);

    void updateByPrimaryKeySelective(UserDO userDO);

    int updateByPrimaryKey(UserDO record);

    UserDO selectByName(String username);

    ResponseData UpdatePassword(UpdatePwdDto updatePwdDto);

    void UpdateUserMsg(UserDO userDO);

    void UpdateUserPortrait(UserDO userDO);

    ResponseData Register(UserDto userDto) throws BusinessException;

}
