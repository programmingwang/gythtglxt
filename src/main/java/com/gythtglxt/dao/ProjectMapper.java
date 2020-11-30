package com.gythtglxt.dao;

import com.gythtglxt.dataobject.Project;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProjectMapper {
    int deleteByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int insertSelective(Project record);

    Project selectByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int updateByPrimaryKeySelective(Project record);

    List<Project> selectproAll(@Param("status") String dataStatus);

    List<Project> selectchaAll(@Param("status") String dataStatus);


}