package com.gythtglxt.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @Author lrt
 * @Date 2020/11/29 11:53
 * @Version 1.0
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HospitalDto {
    /**
     * 自增id
     */
    @ApiModelProperty(value="自增id")
    private Integer itemid;

    /**
     * UUID
     */
    @ApiModelProperty(value="UUID")
    private String itemcode;

    /**
     * 国医堂名称
     */
    @ApiModelProperty(value="国医堂名称")
    private String hospitalName;


    /**
     * 医院电话
     */
    @ApiModelProperty(value="医院电话")
    private String hospitalPhone;

    /**
     * 医院地址省份
     */
    @ApiModelProperty(value="医院地址省份")
    private String hospitalPro;

    /**
     * 医院地址市
     */
    @ApiModelProperty(value="医院地址市")
    private String hospitalCity;

    /**
     * 地址省份
     */
    @ApiModelProperty(value="地址省份")
    private String hospitalCountry;

    /**
     * 医院详细地址
     */
    @ApiModelProperty(value="医院详细地址")
    private String hospitalAdress;

    /**
     * 创建者
     */
    @ApiModelProperty(value="创建者")
    private String creater;

    /**
     * 创建时间
     */
    @ApiModelProperty(value="创建时间")
    private Date itemcreateat;

    /**
     * 修改人
     */
    @ApiModelProperty(value="修改人")
    private String updater;

    /**
     * 修改时间
     */
    @ApiModelProperty(value="修改时间")
    private Date itemupdateat;

    @ApiModelProperty(value = "照片路径")
    private String filePath;

    @ApiModelProperty(value = "简介")
    private String introduce;

    @ApiModelProperty(value = "数据状态")
    private String status;

    @ApiModelProperty(value = "理由")
    private String reason;
}
