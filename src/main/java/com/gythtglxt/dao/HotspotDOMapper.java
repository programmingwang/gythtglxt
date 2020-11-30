package com.gythtglxt.dao;

import com.gythtglxt.dataobject.HotspotDO;
import com.gythtglxt.dataobject.HotspotDOKey;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface HotspotDOMapper {
    int deleteByPrimaryKey(HotspotDOKey key);
    int insert(HotspotDO record);
    int insertSelective(HotspotDO record);
    HotspotDO selectByPrimaryKey(@Param("key") HotspotDOKey key, @Param("type") String dataType);
    List<HotspotDO> selectAll(@Param("type") String dataType, @Param("status") String dataStatus);
    int updateByPrimaryKeySelective(HotspotDO record);
    int updateByPrimaryKeyWithBLOBs(HotspotDO record);
    int updateByPrimaryKey(HotspotDO record);
}