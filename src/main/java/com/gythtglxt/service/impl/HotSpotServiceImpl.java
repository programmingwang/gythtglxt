package com.gythtglxt.service.impl;

import com.gythtglxt.dao.HotspotDOMapper;
import com.gythtglxt.dataobject.FileDO;
import com.gythtglxt.dataobject.HotspotDO;
import com.gythtglxt.dataobject.HotspotDOKey;
import com.gythtglxt.dto.HotspotDto;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.IFileService;
import com.gythtglxt.service.IHotspotService;
import com.gythtglxt.util.DateUtils;
import com.gythtglxt.util.UUIDUtils;
import com.gythtglxt.util.UsernameUtil;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/11/26 18:05
 * Version: 1.0
 */
@Service
public class HotSpotServiceImpl implements IHotspotService {
    @Resource
    private HotspotDOMapper hotspotDOMapper;

    @Resource
    private IFileService fileService;

    @Autowired
    private ValidatorImpl validator;

    @Autowired
    private UsernameUtil usernameUtil;

    @Override
    public HotspotDO getHotspot(HotspotDOKey key, String dataType) {
        return hotspotDOMapper.selectByPrimaryKey(key,dataType);
    }

    @Override
    public List<HotspotDto> getAll(String dataType, String dataStatus, String userCode) {
        return hotspotDOMapper.selectAll(dataType,dataStatus,userCode);
    }

    @Override
    public int addHotspot(HotspotDO record) {
        ValidatorResult validate = validator.validate(record);
        if(validate.isHasErrors()){
            throw new BusinessException(validate.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setCreater(usernameUtil.getOperateUser());
        record.setItemcreateat(DateUtils.getDate());
        record.setUpdater(usernameUtil.getOperateUser());
        if(StringUtils.isEmpty(record.getItemcode())){
            record.setItemcode(UUIDUtils.getUUID());
        }
        return hotspotDOMapper.insertSelective(record);
    }

    @Override
    public int removeHotspot(HotspotDOKey key) {
        return hotspotDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int updateHotspot(HotspotDO record) {
        ValidatorResult validate = validator.validate(record);
        if("0".equals(record.getDataStatus()) || "1".equals(record.getDataStatus())){
            if(validate.isHasErrors()){
                throw new BusinessException(validate.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
            }
        }
        record.setUpdater(usernameUtil.getOperateUser());
        return hotspotDOMapper.updateByPrimaryKeySelective(record);
    }
}
