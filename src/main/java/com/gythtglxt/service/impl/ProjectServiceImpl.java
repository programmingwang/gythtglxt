package com.gythtglxt.service.impl;
import java.util.ArrayList;
import java.util.List;

import com.gythtglxt.dataobject.FileDO;
import com.gythtglxt.dto.ProjectDto;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.IFileService;
import com.gythtglxt.util.DateUtils;
import com.gythtglxt.util.UsernameUtil;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import com.gythtglxt.dataobject.Project;
import com.gythtglxt.dao.ProjectMapper;
import com.gythtglxt.service.IProjectService;
@Service
@SuppressWarnings("all")
public class ProjectServiceImpl implements IProjectService {

    @Resource
    private ProjectMapper projectMapper;

    @Resource
    private IFileService fileService;

    @Resource
    private UsernameUtil usernameUtil;

    @Resource
    private ValidatorImpl validator;

    @Override
    public int deleteByPrimaryKey(Integer itemid, String itemcode) {
        return projectMapper.deleteByPrimaryKey(itemid, itemcode);
    }

    @Override
    public int insertSelective(Project record) {
        ValidatorResult validate = validator.validate(record);
        if (validate.isHasErrors()) {
            throw new BusinessException(validate.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setCreater(usernameUtil.getOperateUser());
        record.setItemcreateat(DateUtils.getDate());
        record.setUpdater(usernameUtil.getOperateUser());

        return projectMapper.insertSelective(record);
    }

    @Override
    public Project selectByPrimaryKey(Integer itemid, String itemcode) {
        return projectMapper.selectByPrimaryKey(itemid, itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(Project record) {
        return projectMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<ProjectDto> selectproAll(List<String> dataStatus, String userCode) {
        List<Project> projects = new ArrayList<>();
        List<ProjectDto> projectDtos = new ArrayList<>();
        for (String status : dataStatus) {
            projects.addAll(projectMapper.selectproAll(status));
        }
        for (Project project : projects) {
            ProjectDto projectDto = new ProjectDto();
            BeanUtils.copyProperties(project, projectDto);
            FileDO fileDO = fileService.selectFileByDataCode(project.getItemcode());
            String filePath = StringUtils.isEmpty(fileDO.getFilePath())
                    ? "已经损坏了" : fileDO.getFilePath();
            projectDto.setFilePath(filePath);
            projectDtos.add(projectDto);
        }
        if (userCode == null) {
            return projectDtos;
        } else {
            List<ProjectDto> removeProject = new ArrayList<>();
            for (ProjectDto projectDto : projectDtos) {
                if (!userCode.equals(projectDto.getUserCode()) || projectDto.getUserCode().isEmpty()) {
                    removeProject.add(projectDto);
                }
            }
            projectDtos.removeAll(removeProject);
            return projectDtos;
        }
    }

    @Override
    public List<ProjectDto> selectchaAll(List<String> dataStatus, String userCode) {
        List<Project> projects = new ArrayList<>();
        List<ProjectDto> projectDtos = new ArrayList<>();
        for (String status : dataStatus) {
            projects.addAll(projectMapper.selectchaAll(status));
        }
        for (Project project : projects) {
            ProjectDto projectDto = new ProjectDto();
            BeanUtils.copyProperties(project, projectDto);
            FileDO fileDO = fileService.selectFileByDataCode(project.getItemcode());
            String filePath = StringUtils.isEmpty(fileDO.getFilePath())
                    ? "已经损坏了" : fileDO.getFilePath();
            projectDto.setFilePath(filePath);
            projectDtos.add(projectDto);
        }
        if (userCode == null) {
            return projectDtos;
        } else {
            List<ProjectDto> removeProject = new ArrayList<>();
            for (ProjectDto projectDto : projectDtos) {
                if (!userCode.equals(projectDto.getUserCode()) || projectDto.getUserCode().isEmpty()) {
                    removeProject.add(projectDto);
                }
            }
            projectDtos.removeAll(removeProject);
            return projectDtos;
        }
    }
}
