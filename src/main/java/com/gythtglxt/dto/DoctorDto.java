package com.gythtglxt.dto;

import com.gythtglxt.dataobject.DoctorDO;
import lombok.Data;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/26 17:21
 */
@Data
public class DoctorDto extends DoctorDO {
    private String filePath;
    private String registerDate;
}
