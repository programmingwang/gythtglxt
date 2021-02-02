package com.gythtglxt.dao;

import com.gythtglxt.dataobject.Project;
import com.gythtglxt.dto.ProjectDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProjectMapper {
    int deleteByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int insertSelective(Project record);

    Project selectByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);
    String selCityIdByItemCode(@Param("itemCode") String itemCode);

    int updateByPrimaryKeySelective(Project record);

    List<ProjectDto> selectproAll(@Param("status") String dataStatus, @Param("userCode")String userCode, @Param("isCountry")String isCountry, @Param("isCity")String isCity, @Param("addrCity")String addrCity, @Param("addrCountry")String addrCountry);

    List<ProjectDto> selectchaAll(@Param("status") String dataStatus, @Param("userCode")String userCode, @Param("isCountry")String isCountry, @Param("isCity")String isCity, @Param("addrCity")String addrCity, @Param("addrCountry")String addrCountry);


}