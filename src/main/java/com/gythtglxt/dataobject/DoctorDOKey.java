package com.gythtglxt.dataobject;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class DoctorDOKey {

    private Integer itemid;

    @NotBlank(message = "itemcode不能为空")
    private String itemcode;
}