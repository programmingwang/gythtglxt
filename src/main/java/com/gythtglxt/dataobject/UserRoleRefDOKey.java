package com.gythtglxt.dataobject;

public class UserRoleRefDOKey {
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column user_role_ref.itemID
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private Integer itemid;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column user_role_ref.itemCode
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    private String itemcode;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column user_role_ref.itemID
     *
     * @return the value of user_role_ref.itemID
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public Integer getItemid() {
        return itemid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column user_role_ref.itemID
     *
     * @param itemid the value for user_role_ref.itemID
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setItemid(Integer itemid) {
        this.itemid = itemid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column user_role_ref.itemCode
     *
     * @return the value of user_role_ref.itemCode
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public String getItemcode() {
        return itemcode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column user_role_ref.itemCode
     *
     * @param itemcode the value for user_role_ref.itemCode
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    public void setItemcode(String itemcode) {
        this.itemcode = itemcode == null ? null : itemcode.trim();
    }
}