package com.gythtglxt.dao;

import com.gythtglxt.dataobject.DictItemDO;
import com.gythtglxt.dataobject.DictItemDOKey;

public interface DictItemDOMapper {
    /*删除数据字典项*/
    int deleteByPrimaryKey(DictItemDOKey key);
    /*新增数据字典项*/
    int insert(DictItemDO record);
    /*新增数据字典项跳NULL*/
    int insertSelective(DictItemDO record);
    /*查找数据字典项*/
    DictItemDO selectByPrimaryKey(DictItemDOKey key);
    /*修改数据字典项跳NULL*/
    int updateByPrimaryKeySelective(DictItemDO record);
    /*修改数据字典项*/
    int updateByPrimaryKey(DictItemDO record);
}