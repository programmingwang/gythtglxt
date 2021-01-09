package com.gythtglxt.dao;

import com.gythtglxt.dataobject.HotspotDO;
import com.gythtglxt.dataobject.HotspotDOKey;
import com.gythtglxt.dto.HotspotDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface HotspotDOMapper {
    int deleteByPrimaryKey(HotspotDOKey key);
    int insert(HotspotDO record);
    int insertSelective(HotspotDO record);
    HotspotDO selectByPrimaryKey(@Param("key") HotspotDOKey key, @Param("type") String dataType);
    List<HotspotDto> selectAll(@Param("type") String dataType, @Param("status") String dataStatus, @Param("userCode") String userCode);
    int updateByPrimaryKeySelective(HotspotDO record);
    int updateByPrimaryKeyWithBLOBs(HotspotDO record);
    int updateByPrimaryKey(HotspotDO record);
}