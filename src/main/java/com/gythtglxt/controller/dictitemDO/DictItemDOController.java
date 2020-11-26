package com.gythtglxt.controller.dictitemDO;


import com.gythtglxt.dataobject.DictItemDO;
import com.gythtglxt.dataobject.DictItemDOKey;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.IDictItemDOService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/dictItemdo")
public class DictItemDOController {

    @Resource
    private IDictItemDOService iDictItemDOService;

    /**
     * 查看数据字典项
     */
    @RequestMapping(value = "/selectDictItemDO/{ItemID}/{ItemCode}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseData selectByPrimaryKey(@PathVariable("ItemID") Integer Itemid, @PathVariable("ItemCode") String ItemCode){
        DictItemDOKey key = new DictItemDOKey();
        key.setItemcode(ItemCode);
        key.setItemid(Itemid);
        DictItemDO dictItemDO = iDictItemDOService.selectByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success,dictItemDO);
    }

    /**
     * 删除数据字典项
     */
    @RequestMapping(value = "/deleteDictItemDO/{ItemID}/{ItemCode}",method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData deleteByPrimaryKey(@PathVariable("ItemID") Integer Itemid, @PathVariable("ItemCode") String ItemCode){
        DictItemDOKey key = new DictItemDOKey();
        key.setItemcode(ItemCode);
        key.setItemid(Itemid);
        iDictItemDOService.deleteByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 增加数据字典项
     */
    @RequestMapping(value = "/insertDictItemDO", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData insertSelective(@RequestBody DictItemDO record) throws BusinessException {
        iDictItemDOService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新数据字典项
     */
    @RequestMapping(value = "/updateDictItemDO", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updateByPrimaryKeySelective(@RequestBody DictItemDO record) throws BusinessException {
        iDictItemDOService.updateByPrimaryKeySelective(record);
        return new ResponseData(EmBusinessError.success);
    }
}
