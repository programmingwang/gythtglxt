package com.gythtglxt.service.impl;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.gythtglxt.dataobject.Project;
import com.gythtglxt.dao.ProjectMapper;
import com.gythtglxt.service.IProjectService;
@Service
public class ProjectServiceImpl implements IProjectService {

    @Resource
    private ProjectMapper projectMapper;

    @Override
    public int deleteByPrimaryKey(Integer itemid,String itemcode) {
        return projectMapper.deleteByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int insertSelective(Project record) {
        record.setItemcode(UUID.randomUUID().toString());
        return projectMapper.insertSelective(record);
    }

    @Override
    public Project selectByPrimaryKey(Integer itemid,String itemcode) {
        return projectMapper.selectByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(Project record) {
        return projectMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<Project> selectproAll() {
        return projectMapper.selectproAll();
    }

    @Override
    public List<Project> selectchaAll() {
        return projectMapper.selectchaAll();
    }


}
