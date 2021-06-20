/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/

package com.skyeye.service.impl;

import com.skyeye.dao.ReportModelAttrDao;
import com.skyeye.service.ReportModelAttrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @ClassName: ReportModelAttrServiceImpl
 * @Description:
 * @author: skyeye云系列--卫志强
 * @date: 2021/6/20 15:22
 * @Copyright: 2021 https://gitee.com/doc_wei01/skyeye Inc. All rights reserved.
 * 注意：本内容仅限购买后使用.禁止私自外泄以及用于其他的商业目的
 */
@Service
public class ReportModelAttrServiceImpl implements ReportModelAttrService {

    @Autowired
    private ReportModelAttrDao reportModelAttrDao;


    /**
     * 插入模型属性信息
     *
     * @param reportModelAttr 模型属性信息
     * @return 成功条数
     * @throws Exception
     */
    @Override
    public int insertReportModelAttr(List<Map<String, Object>> reportModelAttr) throws Exception {
        return reportModelAttrDao.insertReportModelAttr(reportModelAttr);
    }

    /**
     * 根据模型id获取模型属性
     *
     * @param modelId 模型id
     * @return 模型属性
     * @throws Exception
     */
    @Override
    public List<Map<String, Object>> getReportModelAttrByModelId(String modelId) throws Exception {
        List<Map<String, Object>> result = reportModelAttrDao.getReportModelAttrByModelId(modelId);
        return result;
    }
}
