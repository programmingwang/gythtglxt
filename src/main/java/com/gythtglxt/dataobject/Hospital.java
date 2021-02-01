package com.gythtglxt.dataobject;

import com.gythtglxt.dataobject.validation.PhoneCheck;
import com.gythtglxt.dataobject.validation.ValidationGroups;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

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
    @NotBlank(message = "国医堂名称不能为空",groups = ValidationGroups.Insert.class)
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
    @NotBlank(message = "电话号码不能为空",groups = ValidationGroups.Insert.class)
    @PhoneCheck(groups = {ValidationGroups.Insert.class})
    private String hospitalPhone;

    /**
     * 医院地址省份
     */
    @ApiModelProperty(value = "医院地址省份")
    @NotBlank(message = "省份不能为空",groups = ValidationGroups.Insert.class)
    private String hospitalPro;

    /**
     * 医院地址市
     */
    @ApiModelProperty(value = "医院地址市")
    @NotBlank(message = "地市不能为空",groups = ValidationGroups.Insert.class)
    private String hospitalCity;

    /**
     * 医院地址区
     */
    @ApiModelProperty(value = "医院地址区")
    @NotBlank(message = "地区不能为空",groups = ValidationGroups.Insert.class)
    private String hospitalCountry;

    /**
     * 医院详细地址
     */
    @ApiModelProperty(value = "医院详细地址")
    @NotBlank(message = "详细地址不能为空",groups = ValidationGroups.Insert.class)
    private String hospitalAdress;

    /**
     * 简介
     */
    @ApiModelProperty(value = "简介")
    @NotBlank(message = "简介不能为空",groups = ValidationGroups.Insert.class)
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