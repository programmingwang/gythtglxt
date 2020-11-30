package com.gythtglxt.service.impl;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.gythtglxt.dataobject.FileDO;
import com.gythtglxt.dataobject.HotspotDO;
import com.gythtglxt.dto.HotspotDto;
import com.gythtglxt.dto.ProjectDto;
import com.gythtglxt.service.IFileService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.gythtglxt.dataobject.Project;
import com.gythtglxt.dao.ProjectMapper;
import com.gythtglxt.service.IProjectService;
@Service
public class ProjectServiceImpl implements IProjectService {

    @Resource
    private ProjectMapper projectMapper;

    @Resource
    private IFileService fileService;

    @Override
    public int deleteByPrimaryKey(Integer itemid,String itemcode) {
        return projectMapper.deleteByPrimaryKey(itemid,itemcode);
    }

    @Override
    public int insertSelective(Project record) {
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
    public List<ProjectDto> selectproAll(List<String> dataStatus) {
        List<Project> projects = new ArrayList<>();
        List<ProjectDto> projectDtos = new ArrayList<>();
        for (String status : dataStatus) {
            projects.addAll(projectMapper.selectproAll(status));
        }
        for (Project project : projects) {
            ProjectDto projectDto = new ProjectDto();
            BeanUtils.copyProperties(project,projectDto);
            FileDO fileDO = fileService.selectFileByDataCode(project.getItemcode());
            String filePath = StringUtils.isEmpty(fileDO.getFilePath())
                    ? "已经损坏了" : fileDO.getFilePath() ;
            projectDto.setFilePath(filePath);
            projectDtos.add(projectDto);
        }
        return projectDtos;
    }

    @Override
    public List<ProjectDto> selectchaAll(List<String> dataStatus) {
        List<Project> projects = new ArrayList<>();
        List<ProjectDto> projectDtos = new ArrayList<>();
        for (String status : dataStatus) {
            projects.addAll(projectMapper.selectchaAll(status));
        }
        for (Project project : projects) {
            ProjectDto projectDto = new ProjectDto();
            BeanUtils.copyProperties(project,projectDto);
            FileDO fileDO = fileService.selectFileByDataCode(project.getItemcode());
            String filePath = StringUtils.isEmpty(fileDO.getFilePath())
                    ? "已经损坏了" : fileDO.getFilePath() ;
            projectDto.setFilePath(filePath);
            projectDtos.add(projectDto);
        }
        return projectDtos;
    }


}
