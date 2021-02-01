package com.gythtglxt.dataobject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HotspotDO extends HotspotDOKey {
    @NotBlank(message = "标题不能为空")
    private String hotspotTitle;
    private String dataStatus;
    private String dataType;
    private String userCode;
    private String creater;
    private Date itemcreateat;
    private String updater;
    private Date itemupdateat;
    @NotBlank(message = "正文介绍不能为空")
    private String hotspotContent;
    @NotBlank(message = "来源不能为空")
    private String hotspotSource;
    private String hotspotAuthor;
}