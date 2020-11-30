package com.gythtglxt.dto;

import com.gythtglxt.dataobject.SignalSource;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @Author lrt
 * @Date 2020/11/26 17:20
 * @Version 1.0
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignalSourceDto extends SignalSource {
    private String doctorName;
}
