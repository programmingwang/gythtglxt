package com.gythtglxt.dataobject;

public class LogDOKey {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column log.itemID
     *
     * @mbg.generated Thu Nov 26 12:29:36 CST 2020
     */
    private Integer itemid;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column log.itemCode
     *
     * @mbg.generated Thu Nov 26 12:29:36 CST 2020
     */
    private String itemcode;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column log.itemID
     *
     * @return the value of log.itemID
     *
     * @mbg.generated Thu Nov 26 12:29:36 CST 2020
     */
    public Integer getItemid() {
        return itemid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column log.itemID
     *
     * @param itemid the value for log.itemID
     *
     * @mbg.generated Thu Nov 26 12:29:36 CST 2020
     */
    public void setItemid(Integer itemid) {
        this.itemid = itemid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column log.itemCode
     *
     * @return the value of log.itemCode
     *
     * @mbg.generated Thu Nov 26 12:29:36 CST 2020
     */
    public String getItemcode() {
        return itemcode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column log.itemCode
     *
     * @param itemcode the value for log.itemCode
     *
     * @mbg.generated Thu Nov 26 12:29:36 CST 2020
     */
    public void setItemcode(String itemcode) {
        this.itemcode = itemcode == null ? null : itemcode.trim();
    }
}