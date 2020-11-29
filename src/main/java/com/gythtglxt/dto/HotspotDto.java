package com.gythtglxt.dto;

import com.gythtglxt.dataobject.HotspotDO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Author:wangzh
 * Date: 2020/11/28 23:33
 * Version: 1.0
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class HotspotDto extends HotspotDO {
    private String filePath;
}
