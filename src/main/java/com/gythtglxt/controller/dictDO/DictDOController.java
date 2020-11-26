package com.gythtglxt.controller.dictDO;


import com.gythtglxt.dataobject.DictDO;
import com.gythtglxt.dataobject.DictDOKey;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.IDictDOService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/dictdo")
public class DictDOController {

    @Resource
    private IDictDOService iDictDOService;

    /**
     * 查看数据字典
     */
    @RequestMapping(value = "/selectDictDO/{itemID}/{itemCode}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseData selectByPrimaryKey(@PathVariable("itemID") Integer itemid, @PathVariable("itemCode") String itemCode){
        DictDOKey key = new DictDOKey();
        key.setItemcode(itemCode);
        key.setItemid(itemid);
        DictDO dictDO = iDictDOService.selectByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success,dictDO);
    }

    /**
     * 删除数据字典
     */
    @RequestMapping(value = "/deleteDictDO/{itemID}/{itemCode}",method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData deleteByPrimaryKey(@PathVariable("itemID") Integer itemid, @PathVariable("itemCode") String itemCode){
        DictDOKey key = new DictDOKey();
        key.setItemcode(itemCode);
        key.setItemid(itemid);
        iDictDOService.deleteByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 增加数据字典
     */
    @RequestMapping(value = "/insertDictDO", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData insertSelective(@RequestBody DictDO record) throws BusinessException {
        iDictDOService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新数据字典
     */
    @RequestMapping(value = "/updateDictDO", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updateByPrimaryKeySelective(@RequestBody DictDO record) throws BusinessException {
        iDictDOService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }


}
