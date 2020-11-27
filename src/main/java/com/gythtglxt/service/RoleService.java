package com.gythtglxt.service;

import com.gythtglxt.dataobject.RoleDO;
import com.gythtglxt.dataobject.RoleDOKey;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 11:24
 * @Version 1.0
 */
@Service
public interface RoleService {

    int deleteByPrimaryKey(RoleDOKey key);

    int insert(RoleDO record);

    void insertSelective(RoleDO roleDO);

    RoleDO selectByPrimaryKey(RoleDOKey key);

    int updateByPrimaryKeySelective(RoleDO record);

    int updateByPrimaryKey(RoleDO record);

    RoleDO selectByRoleType(Integer type);

    RoleDO selectRoleByUserid(String itemcode);
}
