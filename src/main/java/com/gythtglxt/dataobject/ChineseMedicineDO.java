package com.gythtglxt.dataobject;

import javax.validation.constraints.NotBlank;
import java.util.Date;

public class ChineseMedicineDO extends ChineseMedicineDOKey {
    @NotBlank(message = "中药材名称不能为空")
    private String name;

    private String alias;

    @NotBlank(message = "功效分类不能为空")
    private String classification;

    private String harvesting;

    private String taste;

    private String merTropism;

    private String governance;

    private String usage;

    private String status;

    private String userCode;

    private String creater;

    private Date itemcreateat;


    private String updater;


    private Date itemupdateat;

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias == null ? null : alias.trim();
    }

    public String getClassification() {
        return classification;
    }


    public void setClassification(String classification) {
        this.classification = classification == null ? null : classification.trim();
    }

    public String getHarvesting() {
        return harvesting;
    }

    public void setHarvesting(String harvesting) {
        this.harvesting = harvesting == null ? null : harvesting.trim();
    }

    public String getTaste() {
        return taste;
    }

    public void setTaste(String taste) {
        this.taste = taste == null ? null : taste.trim();
    }

    public String getMerTropism() {
        return merTropism;
    }

    public void setMerTropism(String merTropism) {
        this.merTropism = merTropism == null ? null : merTropism.trim();
    }

    public String getGovernance() {
        return governance;
    }

    public void setGovernance(String governance) {
        this.governance = governance == null ? null : governance.trim();
    }

    public String getUsage() {
        return usage;
    }

    public void setUsage(String usage) {
        this.usage = usage == null ? null : usage.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode == null ? null : userCode.trim();
    }

    public String getCreater() {
        return creater;
    }

    public void setCreater(String creater) {
        this.creater = creater == null ? null : creater.trim();
    }

    public Date getItemcreateat() {
        return itemcreateat;
    }

    public void setItemcreateat(Date itemcreateat) {
        this.itemcreateat = itemcreateat;
    }

    public String getUpdater() {
        return updater;
    }

    public void setUpdater(String updater) {
        this.updater = updater == null ? null : updater.trim();
    }

    public Date getItemupdateat() {
        return itemupdateat;
    }

    public void setItemupdateat(Date itemupdateat) {
        this.itemupdateat = itemupdateat;
    }
}