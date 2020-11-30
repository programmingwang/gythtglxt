package com.gythtglxt.controller.permissionsController;

import com.gythtglxt.dataobject.*;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.ResourcesRoleRefService;
import com.gythtglxt.service.ResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 12:02
 * @Version 1.0
 */
@RestController
@RequestMapping("resources")
public class ResourcesController {
    @Autowired
    ResourcesService resourcesService;
    @Autowired
    ResourcesRoleRefService resRoleRefService;

    /**
     * 新增
     * @return
     */
//    @LogAnnotation(logTitle = "添加权限", logLevel = "3")
    @RequestMapping(value = "/insertres", method = RequestMethod.POST)
    public ResponseData insertSelectiveRes(@RequestBody ResourceDO resourcesDO) {
        resourcesService.insertSelective(resourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

//    @LogAnnotation(logTitle = "添加权限", logLevel = "3")
    @RequestMapping(value = "/insertrrr", method = RequestMethod.POST)
    public ResponseData insertSelectiveRrr(@RequestBody ResourceRoleRefDO resourcesDO) {
        resRoleRefService.insertSelective(resourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 修改
     *
     * @param resourcesDO
     */
//    @LogAnnotation(logTitle = "修改权限", logLevel = "2")
    @RequestMapping(value = "updateresources", method = RequestMethod.PUT)
    public ResponseData updateByPrimaryKeySelective(@RequestBody ResourceDO resourcesDO) {
        resourcesService.updateByPrimaryKeySelective(resourcesDO);
        return new ResponseData(EmBusinessError.success);

    }

    /**
     * 删除
     *
     * @param resourcesDO
     */
//    @LogAnnotation(logTitle = "删除权限", logLevel = "4")
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public ResponseData deleteByPrimaryKey(@RequestBody ResourceDO resourcesDO) {
        resourcesService.deleteByPrimaryKey(resourcesDO);
        return new ResponseData(EmBusinessError.success);

    }
}
