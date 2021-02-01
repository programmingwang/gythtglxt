package com.gythtglxt.dao;
import java.util.List;

import com.gythtglxt.dataobject.Hospital;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
   *@Author lrt
   *@Date 2020/11/29 13:15
   *@Version 1.0
**/
@Mapper
public interface HospitalMapper {
    /**
     * delete by primary key
     * @param itemid primaryKey
     * @return deleteCount
     */
    int deleteByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    /**
     * insert record to table selective
     * @param record the record
     * @return insert count
     */
    int insertSelective(Hospital record);

    /**
     * update record selective
     * @param record the updated record
     * @return update count
     */
    int updateByPrimaryKeySelective(Hospital record);

    Hospital selectOneByItemcode(@Param("itemcode") String itemcode);

    //0代表县级，1代表市级，2代表省级
    List<Hospital> selectAll(@Param("addrCountry") String addrCountry,@Param("addrCity") String addrCity, @Param("status") int status);

}