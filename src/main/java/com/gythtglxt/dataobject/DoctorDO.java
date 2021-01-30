package com.gythtglxt.dataobject;

import java.util.Date;
import lombok.Data;
import javax.validation.constraints.NotBlank;

@Data
public class DoctorDO extends DoctorDOKey {
    @NotBlank(message = "医生姓名不能为空")
    private String doctorName;

    @NotBlank(message = "医生职称不能为空")
    private String doctorTitle;

    @NotBlank(message = "擅长治疗不能为空")
    private String doctorTreatment;

    private Double doctorSorce;

    private String deptCode;

    private String numType;

    private String userCode;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;
    private String orgCode;

}