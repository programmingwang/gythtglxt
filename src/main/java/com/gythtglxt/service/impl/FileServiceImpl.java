package com.gythtglxt.service.impl;

import com.gythtglxt.dao.FileDOMapper;
import com.gythtglxt.dataobject.FileDO;
import com.gythtglxt.dataobject.FileDOKey;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.IFileService;
import com.gythtglxt.util.UsernameUtil;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 17:52
 */
@Service
public class FileServiceImpl implements IFileService {
    @Resource
    private UsernameUtil usernameUtil;
    @Resource
    private FileDOMapper fileDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Resource
    private IFileService fileService;

    @Override
    public int addFile(FileDO fileDO) {
        ValidatorResult result = validator.validate(fileDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        fileDO.setOrgCode(usernameUtil.getOrgCode());
        fileDO.setItemcreateat(new Date());
        return fileDOMapper.insertSelective(fileDO);
    }

    @Override
    public int updateFile(FileDO fileDO) {
        ValidatorResult result = validator.validate(fileDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.updateByPrimaryKeySelective(fileDO);
    }

    @Override
    public int deleteFileByKey(FileDOKey fileDOKey) {
        ValidatorResult result = validator.validate(fileDOKey);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.deleteByPrimaryKey(fileDOKey);
    }

    @Override
    public FileDO selectFileByDataCode(String dataCode) {
        if(dataCode == null || dataCode == ""){
            throw new BusinessException("数据源code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        FileDO fileDO = fileDOMapper.selectFileByDataCode(dataCode);
        if(fileDO == null){
            return new FileDO();
        }
        return fileDO;
    }

    @Override
    public int deleteFileByDataCode(String dataCode) {
        if(dataCode == null || dataCode == ""){
            throw new BusinessException("数据源code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.deleteByDataCode(dataCode);
    }

    @Override
    public void uploadFile(FileDO fileDO) {
        ValidatorResult result = validator.validate(fileDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        /*对文件上传记录表操作，记录上传信息*/
        fileService.addFile(fileDO);

    }

    @Override
    public List<FileDO> selectMultipleFileByDataCode(String dataCode) {
        if(dataCode == null || dataCode == ""){
            throw new BusinessException("数据源code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        List<FileDO> fileDOList = fileDOMapper.selectMultipleFileByDataCode(dataCode);
        if(fileDOList == null){
            return new ArrayList<>();
        }
        return fileDOList;
    }

    @Override
    public List<FileDO> selectMultipleFileByDataCodeAndOrgCode(String dataCode, String orgCode) {
        if(dataCode == null || dataCode == ""){
            throw new BusinessException("数据源code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        List<FileDO> fileDOList = fileDOMapper.selectMultipleFileByDataCodeAndOrgCode(dataCode, orgCode);
        if(fileDOList == null){
            return new ArrayList<>();
        }
        return fileDOList;
    }


}
