package com.gythtglxt.dao;

import com.gythtglxt.dataobject.FileDO;
import com.gythtglxt.dataobject.FileDOKey;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface FileDOMapper {

    int deleteByPrimaryKey(FileDOKey key);

    int insert(FileDO record);

    int insertSelective(FileDO record);

    FileDO selectByPrimaryKey(FileDOKey key);

    int updateByPrimaryKeySelective(FileDO record);

    int updateByPrimaryKey(FileDO record);

    FileDO selectFileByDataCode(String dataCode);

    int deleteByDataCode(String dataCode);

    List<FileDO> selectMultipleFileByDataCode(String dataCode);
    List<FileDO> selectMultipleFileByDataCodeAndOrgCode(@Param("dataCode") String dataCode, @Param("orgCode") String orgCode);
}