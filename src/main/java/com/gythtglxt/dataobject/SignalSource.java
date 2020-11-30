package com.gythtglxt.dataobject;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
   *@Author lrt
   *@Date 2020/11/27 21:32
   *@Version 1.0
**/

/**
 * 号源维护记录表
 */
@ApiModel(value = "com-gythtglxt-dataobject-SignalSource")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignalSource {
    @ApiModelProperty(value = "")
    private Integer itemid;

    /**
     * 唯一标识UUID
     */
    @ApiModelProperty(value = "唯一标识UUID")
    private String itemcode;

    /**
     * 医生code
     */
    @ApiModelProperty(value = "医生code")
    private String doctorCode;

    /**
     * 挂号类别
     */
    @ApiModelProperty(value = "挂号类别")
    private String registerType;

    /**
     * 就诊时间
     */
    @ApiModelProperty(value = "就诊时间")
    private Date registerDate;

    /**
     * 预约量
     */
    @ApiModelProperty(value = "预约量")
    private Integer registerCount;

    /**
     * 状态
     */
    @ApiModelProperty(value = "状态")
    private String status;

    @ApiModelProperty(value = "")
    private String userCode;

    @ApiModelProperty(value = "")
    private String creater;

    @ApiModelProperty(value = "")
    private Date itemcreateat;

    @ApiModelProperty(value = "")
    private String updater;

    @ApiModelProperty(value = "")
    private Date itemupdateat;
}