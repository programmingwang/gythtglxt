package com.gythtglxt.dto;

import com.gythtglxt.dataobject.Project;
import lombok.Data;

import java.util.List;

@Data
public class ProjectDto extends Project {
    private List<String> filePath;
//    private List<String> dataCode;
}
