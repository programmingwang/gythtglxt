package com.gythtglxt.dao;

import com.gythtglxt.dataobject.ChineseMedicineDO;
import com.gythtglxt.dataobject.ChineseMedicineDOKey;
import com.gythtglxt.dto.ChineseMedicineDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ChineseMedicineDOMapper {

    int deleteByPrimaryKey(ChineseMedicineDOKey key);

    int insert(ChineseMedicineDO record);

    int insertSelective(ChineseMedicineDO record);

    ChineseMedicineDO selectByPrimaryKey(ChineseMedicineDOKey key);

    int updateByPrimaryKeySelective(ChineseMedicineDO record);

    int updateByPrimaryKey(ChineseMedicineDO record);

    List<ChineseMedicineDto> selectAllChineseMedicine(@Param("status") String status, @Param("userCode")String userCode);//查询所有中药常识数据

    int changeStatusToChineseMedicine(@Param("key") ChineseMedicineDOKey key , @Param("status") String status);//中药数据状态

}