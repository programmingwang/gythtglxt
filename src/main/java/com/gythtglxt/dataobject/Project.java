package com.gythtglxt.dataobject;
import java.util.List;
import com.gythtglxt.dataobject.Project;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
    * 开展项目、功效特色记录表
    */
@ApiModel(value="com-gythtglxt-dataobject-Project")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {




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
    * 开展项目、功效特色名称
    */
    @ApiModelProperty(value="开展项目、功效特色名称")
    private String name;

    /**
    * 项目、功效特色简介
    */
    @ApiModelProperty(value="项目、功效特色简介")
    private String content;

    /**
    * 数据区分
    */
    @ApiModelProperty(value="数据区分")
    private String dataType;

    /**
    * 功效特色价格
    */
    @ApiModelProperty(value="功效特色价格")
    private Integer price;

    /**
    * 数据状态
    */
    @ApiModelProperty(value="数据状态")
    private String dataStatus;

    @ApiModelProperty(value="")
    private String userCode;

    /**
    * 浏览次数
    */
    @ApiModelProperty(value="浏览次数")
    private Integer visitNum;

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


}