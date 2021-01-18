package com.gythtglxt.controller.healthProtection;

import com.gythtglxt.dataobject.HotspotDO;
import com.gythtglxt.dataobject.HotspotDOKey;
import com.gythtglxt.dto.HotspotDto;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.IHotspotService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/11/26 18:19
 * Version: 1.0
 */
@RestController
@RequestMapping("/healthProtection")
@Api(tags = "今日热点-除中药常识")
@SuppressWarnings("unchecked")
public class HotpotController {

    @Autowired
    private IHotspotService hotspotService;

    @RequestMapping(value = "/hotspot" , method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getAllTraditionalCultural(@RequestParam(value = "type")String dataType, @RequestParam(value = "status") String dataStatus,
                                                  @RequestParam(value = "userCode", required = false) String userCode){
        return new ResponseData(EmBusinessError.success,hotspotService.getAll(dataType, dataStatus,userCode));
    }


    @RequestMapping(value = "/hotspot" , method = RequestMethod.POST)
    @ResponseBody
    public ResponseData addTraditionalCultural(@RequestBody HotspotDO hotspotDO)  {
        hotspotService.addHotspot(hotspotDO);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/hotspot" , method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseData deleteTraditionalCultural(@RequestBody HotspotDOKey hotspotDOKey){
        hotspotService.removeHotspot(hotspotDOKey);
        return new ResponseData(EmBusinessError.success);
    }



    @RequestMapping(value = "/hotspot" , method = RequestMethod.PUT)
    @ResponseBody
    public ResponseData updateTraditionalCultural(@RequestBody HotspotDO hotspotDO) {
        hotspotService.updateHotspot(hotspotDO);
        return new ResponseData(EmBusinessError.success);
    }

}
