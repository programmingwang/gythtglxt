package com.gythtglxt.dataobject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HotspotDO extends HotspotDOKey {
    private String hotspotTitle;
    private String dataStatus;
    private String dataType;
    private String userCode;
    private String creater;
    private Date itemcreateat;
    private String updater;
    private Date itemupdateat;
    private String hotspotContent;
    private String hotspotSource;
    private String hotspotAuthor;
}