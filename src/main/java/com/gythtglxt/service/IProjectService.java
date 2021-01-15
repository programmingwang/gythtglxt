package com.gythtglxt.service;
import java.util.List;

import com.gythtglxt.dataobject.Project;
import com.gythtglxt.dto.ProjectDto;

public interface IProjectService {


    int deleteByPrimaryKey(Integer itemid,String itemcode);

    int insertSelective(Project record);

    Project selectByPrimaryKey(Integer itemid,String itemcode);

    int updateByPrimaryKeySelective(Project record);

    List<ProjectDto> selectproAll(String dataStatus, String userCode);

    List<ProjectDto> selectchaAll(String dataStatus, String userCode);


}
