package com.gythtglxt.dataobject;

public class DoctorDOKey {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_doctor.itemID
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private Integer itemid;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column tb_natmeha_doctor.itemCode
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String itemcode;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_doctor.itemID
     *
     * @return the value of tb_natmeha_doctor.itemID
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public Integer getItemid() {
        return itemid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_doctor.itemID
     *
     * @param itemid the value for tb_natmeha_doctor.itemID
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setItemid(Integer itemid) {
        this.itemid = itemid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column tb_natmeha_doctor.itemCode
     *
     * @return the value of tb_natmeha_doctor.itemCode
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getItemcode() {
        return itemcode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column tb_natmeha_doctor.itemCode
     *
     * @param itemcode the value for tb_natmeha_doctor.itemCode
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setItemcode(String itemcode) {
        this.itemcode = itemcode == null ? null : itemcode.trim();
    }
}