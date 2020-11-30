package com.gythtglxt.dto;

import com.gythtglxt.dataobject.Project;
import lombok.Data;

@Data
public class ProjectDto extends Project {
    private String filePath;
}
