/**
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved.
 */
package com.skyeye.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;
import com.skyeye.common.util.ToolUtil;
import com.skyeye.dao.CompanyJobDao;
import com.skyeye.service.CompanyJobService;

@Service
public class CompanyJobServiceImpl implements CompanyJobService {

    @Autowired
    private CompanyJobDao companyJobDao;

    /**
     * @param @param  inputObject
     * @param @param  outputObject
     * @param @throws Exception    参数
     * @return void    返回类型
     * @throws
     * @Title: queryCompanyJobList
     * @Description: 获取公司部门职位信息列表
     */
    @Override
    public void queryCompanyJobList(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        List<Map<String, Object>> beans = companyJobDao.queryCompanyJobList(map,
                new PageBounds(Integer.parseInt(map.get("page").toString()), Integer.parseInt(map.get("limit").toString())));
        PageList<Map<String, Object>> beansPageList = (PageList<Map<String, Object>>) beans;
        int total = beansPageList.getPaginator().getTotalCount();
        outputObject.setBeans(beans);
        outputObject.settotal(total);
    }

    /**
     * @param @param  inputObject
     * @param @param  outputObject
     * @param @throws Exception    参数
     * @return void    返回类型
     * @throws
     * @Title: insertCompanyJobMation
     * @Description: 添加公司部门职位信息信息
     */
    @Override
    public void insertCompanyJobMation(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        Map<String, Object> bean = companyJobDao.queryCompanyJobMationByName(map);
        if (bean == null) {
            Map<String, Object> user = inputObject.getLogParams();
            map.put("id", ToolUtil.getSurFaceId());
            map.put("pId", "0");
            map.put("createId", user.get("id"));
            map.put("createTime", ToolUtil.getTimeAndToString());
            companyJobDao.insertCompanyJobMation(map);
        } else {
            outputObject.setreturnMessage("该公司部门职位信息名称已存在，不可进行二次保存");
        }
    }

    /**
     * @param @param  inputObject
     * @param @param  outputObject
     * @param @throws Exception    参数
     * @return void    返回类型
     * @throws
     * @Title: deleteCompanyJobMationById
     * @Description: 删除公司部门职位信息信息
     */
    @Override
    public void deleteCompanyJobMationById(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        companyJobDao.deleteCompanyJobMationById(map);
    }

    /**
     * @param @param  inputObject
     * @param @param  outputObject
     * @param @throws Exception    参数
     * @return void    返回类型
     * @throws
     * @Title: queryCompanyJobMationToEditById
     * @Description: 编辑公司部门职位信息信息时进行回显
     */
    @Override
    public void queryCompanyJobMationToEditById(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        Map<String, Object> bean = companyJobDao.queryCompanyJobMationToEditById(map);
        outputObject.setBean(bean);
        outputObject.settotal(1);
    }

    /**
     * @param @param  inputObject
     * @param @param  outputObject
     * @param @throws Exception    参数
     * @return void    返回类型
     * @throws
     * @Title: editCompanyJobMationById
     * @Description: 编辑公司部门职位信息信息
     */
    @Override
    public void editCompanyJobMationById(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        Map<String, Object> bean = companyJobDao.queryCompanyJobMationByNameAndId(map);
        if (bean == null) {
            companyJobDao.editCompanyJobMationById(map);
        } else {
            outputObject.setreturnMessage("该公司部门职位信息名称已存在，不可进行二次保存");
        }
    }

    /**
     * @param @param  inputObject
     * @param @param  outputObject
     * @param @throws Exception    参数
     * @return void    返回类型
     * @throws
     * @Title: queryCompanyJobListTreeByDepartmentId
     * @Description: 获取公司部门职位信息列表展示为树根据公司id
     */
    @SuppressWarnings({"unchecked", "rawtypes"})
    @Override
    public void queryCompanyJobListTreeByDepartmentId(InputObject inputObject, OutputObject outputObject) throws Exception {
        Map<String, Object> map = inputObject.getParams();
        List<Map<String, Object>> beans = companyJobDao.queryCompanyJobListTreeByDepartmentId(map);
        beans = ToolUtil.listToTree(beans, "id", "parentId", "children");
        if (!beans.isEmpty()) {
            outputObject.setBeans(beans);
            outputObject.settotal(beans.size());
        }
    }

}
