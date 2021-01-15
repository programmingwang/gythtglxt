package com.gythtglxt.dataobject;

import lombok.Data;

import java.util.Date;

@Data
public class HospitalDO extends HospitalDOKey {

    private String hospitalName;

    private String hospitalLevel;

    private Integer hospitalBooking;

    private Double hospitalSource;

    private Integer hospitalDistance;

    private String hospitalPhone;

    private String hospitalPro;

    private String hospitalCity;

    private String hospitalCountry;

    private String hospitalAdress;

    private String status;

    private String creater;

    private Date itemcreateat;

    private String updater;

    private Date itemupdateat;

}
