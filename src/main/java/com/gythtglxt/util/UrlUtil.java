package com.gythtglxt.util;

/**
 * @Author wanglx
 * @Date 2020/11/10 0010 14:43
 * @Version 1.0
 */
public class UrlUtil {
    public static String getUrl(String requestUrl){
        if (requestUrl.contains("/deletechinesemedicine")){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        return requestUrl;
    }
    public static String getUrl(String requestUrl, String method){
        if (method.equals("POST")){
            requestUrl = requestUrl+"-add";
        }
        if (method.equals("PUT")){
            requestUrl = requestUrl+"-upd";
        }
        if (method.equals("DELETE")){
            requestUrl = requestUrl+"-del";
        }
        return requestUrl;
    }
}
