package com.gythtglxt.service.impl;

import com.gythtglxt.dto.SignalSourceDoctorDto;
import com.gythtglxt.dto.SignalSourceDto;
import com.gythtglxt.service.IDictService;
import com.gythtglxt.util.UsernameUtil;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.gythtglxt.dao.SignalSourceMapper;
import com.gythtglxt.dataobject.SignalSource;
import com.gythtglxt.service.SignalSourceService;

/**
 * @Author lrt
 * @Date 2020/11/26 17:06
 * @Version 1.0
 **/
@Service
public class SignalSourceServiceImpl implements SignalSourceService {

    @Resource
    private SignalSourceMapper signalSourceMapper;

    @Resource
    private UsernameUtil usernameUtil;

    @Resource
    private IDictService dictService;

    @Override
    public int deleteByPrimaryKey(Integer itemid, String itemcode) {
        return signalSourceMapper.deleteByPrimaryKey(itemid, itemcode);
    }

    @Override
    public int insertSelective(SignalSource record) {
        record.setItemcode(UUID.randomUUID().toString());
        record.setCreater(usernameUtil.getOperateUser());
        record.setUpdater(usernameUtil.getOperateUser());
        return signalSourceMapper.insertSelective(record);
    }

    @Override
    public int updateByPrimaryKeySelective(SignalSource record) {
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemupdateat(new Date());
        return signalSourceMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<SignalSourceDto> selectAllByUserCodeOrStatusOrRegisterDate(String userCode, String status, String year) {
        List<SignalSourceDto> resList = signalSourceMapper.selectAllByUserCodeOrStatusOrRegisterDate(userCode, status,year);
        for (SignalSourceDto item: resList){
            item.setStatus(dictService.getDictMapByCode("signalSourceStatus").get(item.getStatus()));
            item.setRegisterType(dictService.getDictMapByCode("numType").get(item.getRegisterType()));
        }
        return resList;
    }

    @Override
    public List<SignalSourceDoctorDto> getDoctor(String usercode) {
        return signalSourceMapper.getDoctor(usercode);
    }

    @Override
    public int dayUpdate() {
        return signalSourceMapper.dayUpdate();
    }
}

