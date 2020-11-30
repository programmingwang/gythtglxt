package com.gythtglxt.config;

import com.gythtglxt.service.SignalSourceService;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import javax.annotation.Resource;

/**
 * @Author lrt
 * @Date 2020/11/30 14:50
 * @Version 1.0
 **/
@Configuration
@EnableScheduling
public class SignalSourceTask {
    @Resource
    SignalSourceService signalSourceService;

    //每天12点更新数据库，将号源失效
    @Scheduled(cron = "0 0 0 * * ?")
    private void dayTasks(){
        signalSourceService.dayUpdate();
    }
}