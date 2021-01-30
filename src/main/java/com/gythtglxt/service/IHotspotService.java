package com.gythtglxt.service;

import com.gythtglxt.dataobject.HotspotDO;
import com.gythtglxt.dataobject.HotspotDOKey;
import com.gythtglxt.dto.HotspotDto;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/11/26 17:41
 * Version: 1.0
 */
public interface IHotspotService {
    HotspotDO getHotspot(HotspotDOKey key, String dataType);
    List<HotspotDto> getAll(String dataType, String dataStatus, String userCode);
    int addHotspot(HotspotDO record);
    int removeHotspot(HotspotDOKey key);
    int updateHotspot(HotspotDO record);
}
