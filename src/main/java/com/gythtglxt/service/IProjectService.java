package com.gythtglxt.service;
import java.util.List;

import com.gythtglxt.dataobject.Project;
public interface IProjectService {


    int deleteByPrimaryKey(Integer itemid,String itemcode);

    int insertSelective(Project record);

    Project selectByPrimaryKey(Integer itemid,String itemcode);

    int updateByPrimaryKeySelective(Project record);

    List<Project> selectproAll();

    List<Project> selectchaAll();


}
