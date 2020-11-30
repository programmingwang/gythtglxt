package com.gythtglxt.service.impl;
import java.util.ArrayList;
import java.util.List;

import com.gythtglxt.dao.HospitalMapper;
import com.gythtglxt.dataobject.Hospital;
import com.gythtglxt.dto.HospitalDto;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.service.HospitalService;
import com.gythtglxt.service.IDictService;
import com.gythtglxt.service.IFileService;
import com.gythtglxt.util.UsernameUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.Map;

/**
 * @Author lrt
 * @Date 2020/11/27 23:21
 * @Version 1.0
 **/
@Service
public class HospitalServiceImpl implements HospitalService {

    @Resource
    private HospitalMapper hospitalMapper;

    @Resource
    private UsernameUtil usernameUtil;

    @Resource
    private IFileService fileService;

    @Resource
    private IDictService dictService;

    @Override
    public int deleteByPrimaryKey(Integer itemid, String itemcode) {
        return hospitalMapper.deleteByPrimaryKey(itemid, itemcode);
    }

    @Override
    public int insertSelective(Hospital record) {
        record.setUpdater(usernameUtil.getOperateUser());
        record.setCreater(usernameUtil.getOperateUser());
        record.setItemcreateat(new Date());
        return hospitalMapper.insertSelective(record);
    }

    @Override
    public int updateByPrimaryKeySelective(Hospital record) {
        record.setUpdater(usernameUtil.getOperateUser());
        System.out.println(record.getStatus());
        switch (usernameUtil.getRoleName()){
            case "县级":
                if (!record.getStatus().equals("2")){
                    if (!record.getStatus().equals("3")){
                        throw new BusinessException("权限越界", EmBusinessError.NO_PERMISSION);
                    }
                }
                break;
            case "市级":
                if (!record.getStatus().equals("4")){
                    if (!record.getStatus().equals("5"))
                    {
                        throw new BusinessException("权限越界", EmBusinessError.NO_PERMISSION);
                    }
                }
                break;
            case "省级":
                if (!record.getStatus().equals("6")){
                    if (!record.getStatus().equals("7")){
                        throw new BusinessException("权限越界", EmBusinessError.NO_PERMISSION);
                    }

                }
                break;
        }
        return hospitalMapper.updateByPrimaryKeySelective(record);
    }


    @Override
    public HospitalDto selectOneByItemcode(String itemcode) {
        HospitalDto res = new HospitalDto();
        Hospital hospital = hospitalMapper.selectOneByItemcode(itemcode);
        BeanUtils.copyProperties(hospital, res);
        res.setFilePath(fileService.selectFileByDataCode(res.getItemcode()).getFilePath());
        return res;
    }


	@Override
	public List<HospitalDto> selectAll(){
        List<HospitalDto> resList = new ArrayList<>();
        List<Hospital> hospitalList = hospitalMapper.selectAll();
        for (Hospital item: hospitalList)
        {
            HospitalDto obj = new HospitalDto();
            BeanUtils.copyProperties(item,obj);
            obj.setFilePath(fileService.selectFileByDataCode(obj.getItemcode()).getFilePath());
            resList.add(obj);
        }
        filter(resList);
        return resList;
	}

    public void filter(List<HospitalDto> target) {
        Map<String, String> proMap = dictService.getDictMapByCode("auditStatus");
        target.removeIf(item -> item.getStatus().equals("0"));
        if (usernameUtil.getRoleName().equals("省级")){
            target.removeIf(item -> item.getStatus().equals("1"));
            target.removeIf(item -> item.getStatus().equals("2"));
            target.removeIf(item -> item.getStatus().equals("3"));
            target.removeIf(item -> item.getStatus().equals("5"));
        }else if (usernameUtil.getRoleName().equals("市级")){
            target.removeIf(item->item.getStatus().equals("1"));
            target.removeIf(item->item.getStatus().equals("3"));
        }

        for (HospitalDto item : target) {
            if (item.getStatus().equals("1")){
                item.setStatus("待审核");
            }else {
                item.setStatus(proMap.get(item.getStatus()));
            }
        }
    }
}




