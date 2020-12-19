package com.gythtglxt.dataobject;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@ToString
public class FileDO extends FileDOKey {

    @NotBlank(message = "数据源code不能为空")
    private String dataCode;
    private String uploader;
    private String uploaderCode;
    private String fileName;
    private String fileType;
    private Double fileSize;
    private String filePath;
    private String orgCode;

    private Date itemcreateat;

}