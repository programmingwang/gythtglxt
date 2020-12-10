package com.gythtglxt.service.impl;

import com.gythtglxt.dao.DoctorDOMapper;
import com.gythtglxt.dataobject.DoctorDO;
import com.gythtglxt.dataobject.DoctorDOKey;
import com.gythtglxt.dataobject.FileDO;
import com.gythtglxt.dto.DoctorDto;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.IDoctorService;
import com.gythtglxt.service.IFileService;
import com.gythtglxt.util.UsernameUtil;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/26 16:00
 */
@Service
public class DoctorServiceImpl implements IDoctorService {
    @Resource
    private DoctorDOMapper doctorDOMapper;
    @Resource
    private ValidatorImpl validator;
    @Resource
    private IFileService fileService;
    @Resource
    private UsernameUtil usernameUtil;

    @Override
    public int insertSelective(DoctorDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUserCode(usernameUtil.getItemCode());
        String username = usernameUtil.getOperateUser();
        record.setCreater(username);
        record.setItemcreateat(new Date());
        record.setUpdater(username);

        return doctorDOMapper.insertSelective(record);
    }

    @Override
    public int updateByPrimaryKeySelective(DoctorDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        String username = usernameUtil.getOperateUser();
        record.setUpdater(username);

        return doctorDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int deleteByPrimaryKey(DoctorDOKey key) {
        ValidatorResult result = validator.validate(key);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return doctorDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public DoctorDO selectByPrimaryKey(DoctorDOKey key) {
        ValidatorResult result = validator.validate(key);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return doctorDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public List<DoctorDto> selectAll() {
        List<DoctorDO> doctorDOList = doctorDOMapper.selectAll();
        return DoToDto(doctorDOList);
    }

    @Override
    public List<DoctorDto> selectByUserCode() {
        List<DoctorDO> doctorDOList = doctorDOMapper.selectByUserCode(usernameUtil.getItemCode());
        return DoToDto(doctorDOList);
    }

    private List<DoctorDto> DoToDto(List<DoctorDO> doList){
        List<DoctorDto> dtoList = new ArrayList<>();
        if (!doList.isEmpty()){
            for (DoctorDO doctorDO:doList){
                DoctorDto dto = new DoctorDto();
                BeanUtils.copyProperties(doctorDO,dto);
                FileDO fileDO= fileService.selectFileByDataCode(dto.getItemcode());
                dto.setFilePath(fileDO == null ? null:fileDO.getFilePath());
                dtoList.add(dto);
            }
        }
        return dtoList;
    }

}
