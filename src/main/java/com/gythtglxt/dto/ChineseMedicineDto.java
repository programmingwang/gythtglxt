package com.gythtglxt.dto;

import com.gythtglxt.dataobject.ChineseMedicineDO;
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/11/26 16:06
 */
@Data
@ToString
@Accessors(chain = true)
public class ChineseMedicineDto extends ChineseMedicineDO {
    private String filePath;
    private String fileName;
}
