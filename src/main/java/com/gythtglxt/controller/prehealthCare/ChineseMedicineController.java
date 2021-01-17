package com.gythtglxt.controller.prehealthCare;

import com.gythtglxt.dataobject.ChineseMedicineDO;
import com.gythtglxt.dataobject.ChineseMedicineDOKey;
import com.gythtglxt.dto.ChineseMedicineDto;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.IChineseMedicineService;
import com.gythtglxt.service.IFileService;
import io.swagger.annotations.Api;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/11/26 15:48
 */
@Api(tags="预防保健-中药常识")
@RestController
public class ChineseMedicineController {

    @Resource
    private IChineseMedicineService iChineseMedicineService;
    @Resource
    private IFileService iFileService;

    /*
    中药名称相关数据的添加
  */
    @RequestMapping(value ="insertchinesemedicine",method = RequestMethod.POST )

    public ResponseData insertChineseMedicine(@RequestBody ChineseMedicineDO key){
        iChineseMedicineService.insertSelective(key);
        return new ResponseData(EmBusinessError.success);
    }

    /*
      中药名称相关数据的删除
    */
    @RequestMapping(value ="deletechinesemedicine/{itemID}/{itemCode}",method = RequestMethod.DELETE )
    @ResponseBody

    public ResponseData deleteChineseMedicine(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
       ChineseMedicineDOKey chineseMedicineDOKey=new ChineseMedicineDOKey();
        chineseMedicineDOKey.setItemid(itemID);
        chineseMedicineDOKey.setItemcode(itemCode);
       iChineseMedicineService.deleteByPrimaryKey(chineseMedicineDOKey);
        System.out.println("要删除中药编号为："+chineseMedicineDOKey.getItemid());
        return new ResponseData(EmBusinessError.success);
    }
    /*
    中医药名称相关数据的修改
  */
    @RequestMapping(value ="updatechinesemedicine",method = RequestMethod.POST )
    public ResponseData updateChineseMedicine(@RequestBody ChineseMedicineDO key) {
       iChineseMedicineService.updateByPrimaryKeySelective(key);
        System.out.println("要修改中药编号为："+key.getItemid());
        return new ResponseData(EmBusinessError.success);
    }
    /*中医药常识数据所有查询*/
    @RequestMapping(value ="selectallchinesemedicine",method = RequestMethod.GET )
    public ResponseData selectAllChineseMedicine(@RequestParam(value="status") String status,@RequestParam(value = "userCode", required = false)String userCode){
        return new ResponseData(EmBusinessError.success,iChineseMedicineService.selectAllChineseMedicine(status,userCode));
    }
    private ChineseMedicineDto convertDtoFromDo(ChineseMedicineDO chineseMedicineDO, String filePath){
        if(StringUtils.isEmpty(filePath)){
            filePath = "已经损坏了";
        }
        ChineseMedicineDto chineseMedicineDto = new ChineseMedicineDto();
        BeanUtils.copyProperties(chineseMedicineDO,chineseMedicineDto);
        chineseMedicineDto.setFilePath(filePath);
        return chineseMedicineDto;
    }

    /*中药数据的状态*/
    @RequestMapping(value = "changestatustochinesemedicine/{itemID}/{itemCode}" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData changeStatusToChineseMedicine(@RequestParam("status") String status, @PathVariable("itemID") Integer itemID , @PathVariable("itemCode")String itemCode){
        ChineseMedicineDOKey chineseMedicineDOKey=new ChineseMedicineDOKey();
        chineseMedicineDOKey.setItemid(itemID);
        chineseMedicineDOKey.setItemcode(itemCode);
       iChineseMedicineService.changeStatusToChineseMedicine(chineseMedicineDOKey,status);
        return new ResponseData(EmBusinessError.success);
    }
}
