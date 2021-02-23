package com.gythtglxt.page;

import lombok.Builder;
import lombok.Data;

/**
 * @Author wzh
 * @Date 2021/2/23 4:16 下午
 * @Description
 */
public class Page {
    private Integer page;
    private Integer pageSize;
    private Integer begin;
    private Integer last;

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getBegin() {
        return begin;
    }

    public void setBegin(Integer begin) {
        this.begin = begin;
    }

    public Integer getLast() {
        return last;
    }

    public void setLast(Integer last) {
        this.last = last;
    }
}
