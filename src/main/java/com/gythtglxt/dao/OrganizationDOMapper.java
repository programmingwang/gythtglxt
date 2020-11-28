package com.gythtglxt.dao;

import com.gythtglxt.dataobject.OrganizationDO;
import org.springframework.stereotype.Component;

@Component
public interface OrganizationDOMapper {

    int deleteByPrimaryKey(Integer itemid);

    int insert(OrganizationDO record);

    int insertSelective(OrganizationDO record);

    OrganizationDO selectByPrimaryKey(Integer itemid);

    int updateByPrimaryKeySelective(OrganizationDO record);

    int updateByPrimaryKey(OrganizationDO record);

    String selectByItemCode(String orgCode);
}