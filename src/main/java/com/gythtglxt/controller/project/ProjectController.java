package com.gythtglxt.controller.project;

import com.gythtglxt.dataobject.Project;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.IProjectService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("project")
public class ProjectController {

    @Resource
    private IProjectService iProjectService;

    /**
     * 查看
     */
    @RequestMapping(value = "/selectProject/{itemID}/{itemCode}",method = RequestMethod.GET)
    @ResponseBody
    public ResponseData selectByPrimaryKey(@PathVariable("itemID") Integer itemid, @PathVariable("itemCode") String itemcode){
        Project project = iProjectService.selectByPrimaryKey(itemid,itemcode);
        return new ResponseData(EmBusinessError.success,project);
    }

    /**
     * 删除
     */
    @RequestMapping(value = "/deleteProject/{ItemID}/{ItemCode}",method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData deleteByPrimaryKey(@PathVariable("ItemID") Integer itemid, @PathVariable("ItemCode") String itemCode){
        iProjectService.deleteByPrimaryKey(itemid,itemCode);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 增加
     */
    @RequestMapping(value = "/insertProject", method = RequestMethod.POST)
    @ResponseBody
    public ResponseData insertSelective(@RequestBody Project record) throws BusinessException {
        iProjectService.insertSelective(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新
     */
    @RequestMapping(value = "/updateProject", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updateByPrimaryKeySelective(@RequestBody Project submitStatus) throws BusinessException {
        iProjectService.updateByPrimaryKeySelective(submitStatus);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 查询开展项目
     */
    @GetMapping(value = "/selectproAll")
    @ResponseBody
    public ResponseData selectproAll(@RequestParam(value = "status") String dataStatus,@RequestParam(value = "userCode",required = false) String userCode) {
        return new ResponseData(EmBusinessError.success,iProjectService.selectproAll(dataStatus,userCode));
    }

    /**
     * 查询功效特色
     */
    @GetMapping(value = "/selectchaAll")
    @ResponseBody
    public ResponseData selectchaAll(@RequestParam(value = "status") String dataStatus,@RequestParam(value = "userCode",required = false) String userCode) {
        return new ResponseData(EmBusinessError.success,iProjectService.selectchaAll(dataStatus,userCode));
    }

}
