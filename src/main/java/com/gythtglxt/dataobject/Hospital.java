package com.gythtglxt.dataobject;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
   *@Author lrt
   *@Date 2020/11/29 13:15
   *@Version 1.0
**/

/**
 * 国医堂信息记录表
 */
@ApiModel(value = "com-gythtglxt-dataobject-Hospital")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Hospital {
    /**
     * 自增id
     */
    @ApiModelProperty(value = "自增id")
    private Integer itemid;

    /**
     * UUID
     */
    @ApiModelProperty(value = "UUID")
    private String itemcode;

    /**
     * 国医堂名称
     */
    @ApiModelProperty(value = "国医堂名称")
    private String hospitalName;

    /**
     * 医院等级
     */
    @ApiModelProperty(value = "医院等级")
    private String hospitalLevel;

    /**
     * 预约量
     */
    @ApiModelProperty(value = "预约量")
    private Integer hospitalBooking;

    /**
     * 评分
     */
    @ApiModelProperty(value = "评分")
    private Double hospitalSource;

    /**
     * 距离（暂定）
     */
    @ApiModelProperty(value = "距离（暂定）")
    private Integer hospitalDistance;

    /**
     * 医院电话
     */
    @ApiModelProperty(value = "医院电话")
    private String hospitalPhone;

    /**
     * 医院地址省份
     */
    @ApiModelProperty(value = "医院地址省份")
    private String hospitalPro;

    /**
     * 医院地址市
     */
    @ApiModelProperty(value = "医院地址市")
    private String hospitalCity;

    /**
     * 医院地址区
     */
    @ApiModelProperty(value = "医院地址区")
    private String hospitalCountry;

    /**
     * 医院详细地址
     */
    @ApiModelProperty(value = "医院详细地址")
    private String hospitalAdress;

    /**
     * 简介
     */
    @ApiModelProperty(value = "简介")
    private String introduce;

    /**
     * 数据状态
     */
    @ApiModelProperty(value = "数据状态")
    private String status;

    /**
     * 创建者
     */
    @ApiModelProperty(value = "创建者")
    private String creater;

    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间")
    private Date itemcreateat;

    /**
     * 修改人
     */
    @ApiModelProperty(value = "修改人")
    private String updater;

    /**
     * 修改时间
     */
    @ApiModelProperty(value = "修改时间")
    private Date itemupdateat;

    @ApiModelProperty(value = "理由")
    private String reason;
}