package com.gythtglxt.service.impl;

import com.gythtglxt.dao.HospitalDOMapper;
import com.gythtglxt.dao.RoleDOMapper;
import com.gythtglxt.dao.UserDOMapper;
import com.gythtglxt.dao.UserRoleRefDOMapper;
import com.gythtglxt.dataobject.*;
import com.gythtglxt.dto.UpdatePwdDto;
import com.gythtglxt.dto.UserDto;
import com.gythtglxt.dto.UserSessionDto;
import com.gythtglxt.error.BusinessException;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.UserService;
import com.gythtglxt.util.IDUtil;
import com.gythtglxt.util.MobileUtil;
import com.gythtglxt.util.UUIDUtils;
import com.gythtglxt.util.UsernameUtil;
import com.gythtglxt.validator.ValidatorImpl;
import com.gythtglxt.validator.ValidatorResult;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.UUID;

/**
 * @Author wanglx
 * @Date 2020/10/28 0028 21:25
 * @Version 1.0
 */

@Service
public class UserServiceImpl implements UserService {
    @Resource
    UserDOMapper userDOMapper;
    @Autowired
    UserRoleRefDOMapper userRoleRefDOMapper;
    @Autowired
    RoleDOMapper roleDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    UsernameUtil usernameUtil;
    @Autowired
    HttpServletRequest request;
    @Resource
    HospitalDOMapper hospitalDOMapper;

    /**
     * 用户注册
     */
    @Override
    @Transactional
    public ResponseData Register(UserDto userDto) throws BusinessException {
        // 验证参数不能为空
        ValidatorResult result = validator.validate(userDto);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        // 验证手机号码
        if (!MobileUtil.checkPhone(userDto.getMobilePhone())) {
            throw new BusinessException("手机号码不正确", EmBusinessError.MOBILEPHONE_ERROR);
        }
        // 用户名的唯一性
        UserDO userDO = userDOMapper.selectByUsername(userDto.getUsername());
        if (userDO != null) {
            throw new BusinessException("用户名已存在", EmBusinessError.USER_ACCOUNT_ALREADY_EXIST);
        } else {
            HospitalDO hospitalDO = hospitalDOMapper.selectByHospitalName(userDto.getOrgName());
            if (hospitalDO != null) {   // 申请用户所在的机构已经申请过则直接到登录页面
                register1(userDto);
                return new ResponseData(EmBusinessError.success, "/userLogin");
            } else {    // 申请用户所在的机构没有申请过则跳转到信息录入页面
                register2(userDto);
                return new ResponseData(EmBusinessError.success, "/addGytInfo");
            }
        }
    }

    /**
     * 注册用户（机构已存在）
     *
     * @param userDto
     */
    private void register1(UserDto userDto) {

        String orgName = userDto.getOrgName();
        HospitalDO hospitalDO = hospitalDOMapper.selectByHospitalName(orgName);

        String userItemCode = UUID.randomUUID().toString();// user 表唯一标识UUID
        UserDO userDO = new UserDO();
        userDO.setItemcode(userItemCode);
        userDO.setOrgCode(hospitalDO.getItemcode());
        userDO.setUsername(userDto.getUsername());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = passwordEncoder.encode(userDto.getPassword());
        userDO.setSalt(userDto.getUsername());// 将 登陆账号 设置为 盐，存放到数据库中
        userDO.setPassword(password);
        userDO.setMobilephone(userDto.getMobilePhone());
        userDO.setCreater(userDto.getUsername());// 注册时，注册用户为 创建人
        userDO.setUpdater(userDto.getUsername());// 注册时，注册用户为 修改人
        userDO.setType(99);

        UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
        RoleDO roleDO = roleDOMapper.selectByRoleType(99);//根据角色类型查到itemcode

        userRoleRefDO.setItemcode(UUID.randomUUID().toString());// 唯一标识UUID
        userRoleRefDO.setUserCode(userItemCode);// 关联user表itemCode字段
        userRoleRefDO.setRoleCode(roleDO.getItemcode());// 关联role表itemCode字段
        userRoleRefDO.setPlatRole("管理员");
        userRoleRefDO.setCreater(userDto.getUsername());// 设置创建人
        userRoleRefDO.setUpdater(userDto.getUsername());// 设置修改人

        userDOMapper.insertSelective(userDO);// 添加数据到user表
        userRoleRefDOMapper.insertSelective(userRoleRefDO);// 添加数据到user_role_ref表
    }

    /**
     * 注册用户（机构不存在）
     *
     * @param userDto
     */
    private void register2(UserDto userDto) {

        HospitalDO hospitalDO = new HospitalDO();
        hospitalDO.setItemcode(userDto.getOrgCode());
        hospitalDO.setHospitalName(userDto.getOrgName());
        hospitalDO.setStatus("1");
        hospitalDO.setCreater(userDto.getUsername());
        hospitalDO.setUpdater(userDto.getUsername());

        String userItemCode = UUID.randomUUID().toString();// user 表唯一标识UUID
        UserDO userDO = new UserDO();
        userDO.setItemcode(userItemCode);
        userDO.setOrgCode(userDto.getOrgCode());
        userDO.setUsername(userDto.getUsername());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String password = passwordEncoder.encode(userDto.getPassword());
        userDO.setSalt(userDto.getUsername());// 将 登陆账号 设置为 盐，存放到数据库中
        userDO.setPassword(password);
        userDO.setMobilephone(userDto.getMobilePhone());
        userDO.setCreater(userDto.getUsername());// 注册时，注册用户为 创建人
        userDO.setUpdater(userDto.getUsername());// 注册时，注册用户为 修改人
        userDO.setType(99);

        RoleDO roleDO = roleDOMapper.selectByRoleType(99);//根据角色类型查到itemcode

        UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
        userRoleRefDO.setItemcode(UUID.randomUUID().toString());// 唯一标识UUID
        userRoleRefDO.setUserCode(userItemCode);// 关联user表itemCode字段
        userRoleRefDO.setRoleCode(roleDO.getItemcode());// 关联role表itemCode字段
        userRoleRefDO.setPlatRole("管理员");
        userRoleRefDO.setCreater(userDto.getUsername());// 设置创建人
        userRoleRefDO.setUpdater(userDto.getUsername());// 设置修改人

        hospitalDOMapper.insertSelective(hospitalDO);// 添加数据到hospital表
        userDOMapper.insertSelective(userDO);// 添加数据到user表
        userRoleRefDOMapper.insertSelective(userRoleRefDO);// 添加数据到user_role_ref表
    }

    @Override
    public void deleteUserByUsername(UserDto userDtO) {
        //删除用户角色关系
        UserDO userDO = userDOMapper.selectByUsername(userDtO.getUsername());

        UserRoleRefDOKey userRoleRefDOKey = new UserRoleRefDOKey();
        UserRoleRefDO userRoleRefDO = userRoleRefDOMapper.selectByUserCode(userDO.getItemcode());
        userRoleRefDOKey.setItemid(userRoleRefDO.getItemid());
        userRoleRefDOKey.setItemcode(userRoleRefDO.getItemcode());
        userRoleRefDOMapper.deleteByPrimaryKey(userRoleRefDOKey);
        //删除用户
        UserDOKey userDOKey = new UserDOKey();
        userDOKey.setItemid(userDO.getItemid());
        userDOKey.setItemcode(userDO.getItemcode());
        userDOMapper.deleteByPrimaryKey(userDOKey);
        //删除hospital
        HospitalDO hospitalDO = hospitalDOMapper.selectByHospitalName(userDtO.getOrgName());
        if (hospitalDO != null){
            HospitalDOKey hospitalDOKey = new HospitalDOKey();
            hospitalDOKey.setItemid(hospitalDO.getItemid());
            hospitalDOKey.setItemcode(hospitalDO.getItemcode());
            hospitalDOMapper.deleteByPrimaryKey(hospitalDOKey);
        }
    }

    @Override
    public int insert(UserDO record) {
        return userDOMapper.insert(record);
    }

    @Override
    public void insertUserSelective(UserDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        //添加用户
//        record.setUpdater(usernameUtil.getOperateUser());
//        record.setCreater(usernameUtil.getOperateUser());
        record.setPassword(new BCryptPasswordEncoder().encode("123456"));
        record.setItemcode(UUIDUtils.getUUID());
        userDOMapper.insertSelective(record);
        //分配角色
        //查询角色role_code
        RoleDO roleDO = roleDOMapper.selectByRoleName(record.getRoleName());
        UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
        userRoleRefDO.setItemcode(UUIDUtils.getUUID());
        userRoleRefDO.setRoleCode(roleDO.getItemcode());
        userRoleRefDO.setUserCode(record.getItemcode());
        userRoleRefDO.setPlatRole(roleDO.getRoleName());
        userRoleRefDOMapper.insertSelective(userRoleRefDO);
    }

    @Override
    public UserDO selectByPrimaryKey(UserDOKey key) {
        return userDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public void updateByPrimaryKeySelective(UserDO userDO) {
        UserDOKey userDOKey = new UserDOKey();
        userDOKey.setItemid(userDO.getItemid());
        userDOKey.setItemcode(userDO.getItemcode());
        UserDO userDO1 = userDOMapper.selectByPrimaryKey(userDOKey);
        //更新用户信息
//        userDO.setUpdater(usernameUtil.getOperateUser());
        userDOMapper.updateByPrimaryKeySelective(userDO);
        //更新角色
        if (!userDO1.getType().equals(userDO.getType())&& userDO.getType()!=null ){
            RoleDO roleDO = roleDOMapper.selectByRoleType(userDO.getType());
            UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
            //获取需要更新的userRoleRefDO
            UserRoleRefDO userRoleRefDO1 = userRoleRefDOMapper.selectByUserCode(userDO.getItemcode());
//            userRoleRefDO.setUpdater(usernameUtil.getOperateUser());
            userRoleRefDO.setItemid(userRoleRefDO1.getItemid());
            userRoleRefDO.setItemcode(userRoleRefDO1.getItemcode());
            userRoleRefDO.setRoleCode(roleDO.getItemcode());
            userRoleRefDO.setUserCode(userDO.getItemcode());
            userRoleRefDO.setPlatRole(roleDO.getRoleName());
            userRoleRefDOMapper.updateByPrimaryKeySelective(userRoleRefDO);
        }
    }

    @Override
    public int updateByPrimaryKey(UserDO record) {
        return userDOMapper.updateByPrimaryKey(record);
    }

    @Override
    public UserDO selectByName(String username) {
        return userDOMapper.selectByUsername(username);
    }

    /**
     * 修改密码
     *
     * @param updatePwdDto
     */
    @Override
    @Transactional
    public ResponseData UpdatePassword(UpdatePwdDto updatePwdDto) {
        ValidatorResult result = validator.validate(updatePwdDto);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }

        UserDO userDO = userDOMapper.selectByUsername(usernameUtil.getOperateUser());

        String mobilePhone = updatePwdDto.getMobilePhone();
        if (MobileUtil.checkPhone(mobilePhone)) {
            String oldPassword = updatePwdDto.getPassword();// 输入的原密码
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            oldPassword = passwordEncoder.encode(oldPassword);
            // 数据库查询到的原密码和输入的原密码比对
            if (userDO.getPassword().equals(oldPassword)) {
                updatePwdDto.setNewPassword(passwordEncoder.encode(updatePwdDto.getNewPassword()));
                userDOMapper.updatePasswordByMobilePhone(updatePwdDto.getNewPassword(), mobilePhone);
                return new ResponseData(EmBusinessError.success);
            } else {
                throw new BusinessException("输入的旧密码错误，请重新输入！", EmBusinessError.OLDPASSWORD_ERROR);
            }
        } else {
            throw new BusinessException("手机号码不正确！", EmBusinessError.MOBILEPHONE_ERROR);
        }
    }

    /**
     * 修改用户信息
     *
     * @param userDO
     * @return
     */
    @Override
    @Transactional
    public void UpdateUserMsg(UserDO userDO) {
        ValidatorResult result = validator.validate(userDO);
        if (result.isHasErrors()) {
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        // 验证通过返回 null，不通过则返回一个 字符串，
        // 所以利用判空来判断身份证号码是否合法
        String isValidIDCardNo = IDUtil.IdentityCardVerification(userDO.getIdcardNo());
        if (StringUtils.isEmpty(isValidIDCardNo)) {
            throw new BusinessException(isValidIDCardNo, EmBusinessError.IDNO_ERROR);
        }
        // 验证电话是否正确
        if (!MobileUtil.checkPhone(userDO.getMobilephone()) && !StringUtils.isEmpty(userDO.getMobilephone())) {
            throw new BusinessException("手机号码不正确！", EmBusinessError.MOBILEPHONE_ERROR);
        }

        UserSessionDto userSessionDto = (UserSessionDto) request.getSession().getAttribute("user");
        userDO.setItemid(userSessionDto.getItemid());
        userDO.setItemcode(userSessionDto.getItemcode());
        userDOMapper.updateByPrimaryKeySelective(userDO);
    }

    /**
     * 修改用户头像
     *
     * @param userDO
     */
    @Override
    @Transactional
    public void UpdateUserPortrait(UserDO userDO) {
        UserSessionDto userSessionDto = (UserSessionDto) request.getSession().getAttribute("user");
        userDO.setItemid(userSessionDto.getItemid());
        userDO.setItemcode(userSessionDto.getItemcode());
        userDOMapper.updateByPrimaryKeySelective(userDO);
    }
}
