package com.gythtglxt.dataobject;

import java.util.Date;

public class HealthRecordsDO extends HealthRecordsDOKey {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.NAME
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String name;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.GENDER
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String gender;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.BIRTH
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private Date birth;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.PHONE
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String phone;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.ADRESS_PRO
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String adressPro;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.ADRESS_CITY
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String adressCity;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.ADRESS_COUNTRY
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String adressCountry;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.ADRESS
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String adress;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.NATION
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String nation;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.BLOOD_TYPE
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String bloodType;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.EDUCATION
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String education;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.OCCUPATION
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String occupation;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.HEIGHT
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private Double height;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.WEIGHT
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private Double weight;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.BMI
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String bmi;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.DISEASE_HISTORY
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String diseaseHistory;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.ALLERGY
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String allergy;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.USER_CODE
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String userCode;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.CREATER
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String creater;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.itemCreateAt
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private Date itemcreateat;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.UPDATER
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String updater;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_health_records.itemUpdateAt
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private Date itemupdateat;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.NAME
     *
     * @return the value of tb_natmeha_health_records.NAME
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.NAME
     *
     * @param name the value for tb_natmeha_health_records.NAME
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.GENDER
     *
     * @return the value of tb_natmeha_health_records.GENDER
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getGender() {
        return gender;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.GENDER
     *
     * @param gender the value for tb_natmeha_health_records.GENDER
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setGender(String gender) {
        this.gender = gender == null ? null : gender.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.BIRTH
     *
     * @return the value of tb_natmeha_health_records.BIRTH
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public Date getBirth() {
        return birth;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.BIRTH
     *
     * @param birth the value for tb_natmeha_health_records.BIRTH
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setBirth(Date birth) {
        this.birth = birth;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.PHONE
     *
     * @return the value of tb_natmeha_health_records.PHONE
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getPhone() {
        return phone;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.PHONE
     *
     * @param phone the value for tb_natmeha_health_records.PHONE
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.ADRESS_PRO
     *
     * @return the value of tb_natmeha_health_records.ADRESS_PRO
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getAdressPro() {
        return adressPro;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.ADRESS_PRO
     *
     * @param adressPro the value for tb_natmeha_health_records.ADRESS_PRO
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setAdressPro(String adressPro) {
        this.adressPro = adressPro == null ? null : adressPro.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.ADRESS_CITY
     *
     * @return the value of tb_natmeha_health_records.ADRESS_CITY
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getAdressCity() {
        return adressCity;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.ADRESS_CITY
     *
     * @param adressCity the value for tb_natmeha_health_records.ADRESS_CITY
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setAdressCity(String adressCity) {
        this.adressCity = adressCity == null ? null : adressCity.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.ADRESS_COUNTRY
     *
     * @return the value of tb_natmeha_health_records.ADRESS_COUNTRY
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getAdressCountry() {
        return adressCountry;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.ADRESS_COUNTRY
     *
     * @param adressCountry the value for tb_natmeha_health_records.ADRESS_COUNTRY
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setAdressCountry(String adressCountry) {
        this.adressCountry = adressCountry == null ? null : adressCountry.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.ADRESS
     *
     * @return the value of tb_natmeha_health_records.ADRESS
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getAdress() {
        return adress;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.ADRESS
     *
     * @param adress the value for tb_natmeha_health_records.ADRESS
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setAdress(String adress) {
        this.adress = adress == null ? null : adress.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.NATION
     *
     * @return the value of tb_natmeha_health_records.NATION
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getNation() {
        return nation;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.NATION
     *
     * @param nation the value for tb_natmeha_health_records.NATION
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setNation(String nation) {
        this.nation = nation == null ? null : nation.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.BLOOD_TYPE
     *
     * @return the value of tb_natmeha_health_records.BLOOD_TYPE
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getBloodType() {
        return bloodType;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.BLOOD_TYPE
     *
     * @param bloodType the value for tb_natmeha_health_records.BLOOD_TYPE
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setBloodType(String bloodType) {
        this.bloodType = bloodType == null ? null : bloodType.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.EDUCATION
     *
     * @return the value of tb_natmeha_health_records.EDUCATION
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getEducation() {
        return education;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.EDUCATION
     *
     * @param education the value for tb_natmeha_health_records.EDUCATION
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setEducation(String education) {
        this.education = education == null ? null : education.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.OCCUPATION
     *
     * @return the value of tb_natmeha_health_records.OCCUPATION
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getOccupation() {
        return occupation;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.OCCUPATION
     *
     * @param occupation the value for tb_natmeha_health_records.OCCUPATION
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setOccupation(String occupation) {
        this.occupation = occupation == null ? null : occupation.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.HEIGHT
     *
     * @return the value of tb_natmeha_health_records.HEIGHT
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public Double getHeight() {
        return height;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.HEIGHT
     *
     * @param height the value for tb_natmeha_health_records.HEIGHT
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setHeight(Double height) {
        this.height = height;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.WEIGHT
     *
     * @return the value of tb_natmeha_health_records.WEIGHT
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public Double getWeight() {
        return weight;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.WEIGHT
     *
     * @param weight the value for tb_natmeha_health_records.WEIGHT
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setWeight(Double weight) {
        this.weight = weight;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.BMI
     *
     * @return the value of tb_natmeha_health_records.BMI
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getBmi() {
        return bmi;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.BMI
     *
     * @param bmi the value for tb_natmeha_health_records.BMI
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setBmi(String bmi) {
        this.bmi = bmi == null ? null : bmi.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.DISEASE_HISTORY
     *
     * @return the value of tb_natmeha_health_records.DISEASE_HISTORY
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getDiseaseHistory() {
        return diseaseHistory;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.DISEASE_HISTORY
     *
     * @param diseaseHistory the value for tb_natmeha_health_records.DISEASE_HISTORY
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setDiseaseHistory(String diseaseHistory) {
        this.diseaseHistory = diseaseHistory == null ? null : diseaseHistory.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.ALLERGY
     *
     * @return the value of tb_natmeha_health_records.ALLERGY
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getAllergy() {
        return allergy;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.ALLERGY
     *
     * @param allergy the value for tb_natmeha_health_records.ALLERGY
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setAllergy(String allergy) {
        this.allergy = allergy == null ? null : allergy.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.USER_CODE
     *
     * @return the value of tb_natmeha_health_records.USER_CODE
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getUserCode() {
        return userCode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.USER_CODE
     *
     * @param userCode the value for tb_natmeha_health_records.USER_CODE
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setUserCode(String userCode) {
        this.userCode = userCode == null ? null : userCode.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.CREATER
     *
     * @return the value of tb_natmeha_health_records.CREATER
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getCreater() {
        return creater;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.CREATER
     *
     * @param creater the value for tb_natmeha_health_records.CREATER
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setCreater(String creater) {
        this.creater = creater == null ? null : creater.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.itemCreateAt
     *
     * @return the value of tb_natmeha_health_records.itemCreateAt
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public Date getItemcreateat() {
        return itemcreateat;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.itemCreateAt
     *
     * @param itemcreateat the value for tb_natmeha_health_records.itemCreateAt
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setItemcreateat(Date itemcreateat) {
        this.itemcreateat = itemcreateat;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.UPDATER
     *
     * @return the value of tb_natmeha_health_records.UPDATER
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getUpdater() {
        return updater;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.UPDATER
     *
     * @param updater the value for tb_natmeha_health_records.UPDATER
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setUpdater(String updater) {
        this.updater = updater == null ? null : updater.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_health_records.itemUpdateAt
     *
     * @return the value of tb_natmeha_health_records.itemUpdateAt
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public Date getItemupdateat() {
        return itemupdateat;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_health_records.itemUpdateAt
     *
     * @param itemupdateat the value for tb_natmeha_health_records.itemUpdateAt
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setItemupdateat(Date itemupdateat) {
        this.itemupdateat = itemupdateat;
    }
}