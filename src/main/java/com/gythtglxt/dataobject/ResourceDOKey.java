package com.gythtglxt.dataobject;

public class ResourceDOKey {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column resource.itemID
     *
     * @mbg.generated Thu Nov 26 12:29:36 CST 2020
     */
    private Integer itemid;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column resource.itemCode
     *
     * @mbg.generated Thu Nov 26 12:29:36 CST 2020
     */
    private String itemcode;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column resource.itemID
     *
     * @return the value of resource.itemID
     *
     * @mbg.generated Thu Nov 26 12:29:36 CST 2020
     */
    public Integer getItemid() {
        return itemid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column resource.itemID
     *
     * @param itemid the value for resource.itemID
     *
     * @mbg.generated Thu Nov 26 12:29:36 CST 2020
     */
    public void setItemid(Integer itemid) {
        this.itemid = itemid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column resource.itemCode
     *
     * @return the value of resource.itemCode
     *
     * @mbg.generated Thu Nov 26 12:29:36 CST 2020
     */
    public String getItemcode() {
        return itemcode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column resource.itemCode
     *
     * @param itemcode the value for resource.itemCode
     *
     * @mbg.generated Thu Nov 26 12:29:36 CST 2020
     */
    public void setItemcode(String itemcode) {
        this.itemcode = itemcode == null ? null : itemcode.trim();
    }
}