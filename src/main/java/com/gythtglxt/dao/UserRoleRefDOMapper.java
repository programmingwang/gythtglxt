package com.gythtglxt.dao;

import com.gythtglxt.dataobject.UserRoleRefDO;
import com.gythtglxt.dataobject.UserRoleRefDOKey;

public interface UserRoleRefDOMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_role_ref
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    int deleteByPrimaryKey(UserRoleRefDOKey key);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_role_ref
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    int insert(UserRoleRefDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_role_ref
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    int insertSelective(UserRoleRefDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_role_ref
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    UserRoleRefDO selectByPrimaryKey(UserRoleRefDOKey key);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_role_ref
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    int updateByPrimaryKeySelective(UserRoleRefDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_role_ref
     *
     * @mbg.generated Thu Nov 26 00:22:00 CST 2020
     */
    int updateByPrimaryKey(UserRoleRefDO record);
}