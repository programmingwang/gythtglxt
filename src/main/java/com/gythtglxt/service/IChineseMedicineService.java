package com.gythtglxt.service;

import com.gythtglxt.dataobject.ChineseMedicineDO;
import com.gythtglxt.dataobject.ChineseMedicineDOKey;
import com.gythtglxt.dto.ChineseMedicineDto;

import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/11/26 12:24
 */
public interface IChineseMedicineService {
    /*中药常识数据的添加、删除、修改、查询*/
    int insertSelective(ChineseMedicineDO record);

    int deleteByPrimaryKey(ChineseMedicineDOKey key);

    int updateByPrimaryKeySelective(ChineseMedicineDO record);

    List<ChineseMedicineDto> selectAllChineseMedicine(String status, String userCode);//中药数据的所有查询

    int changeStatusToChineseMedicine(ChineseMedicineDOKey key, String status);//中药数据状态

}
