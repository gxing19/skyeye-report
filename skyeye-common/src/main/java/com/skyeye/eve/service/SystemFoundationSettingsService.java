/*******************************************************************************
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved. 开源地址：https://gitee.com/doc_wei01/skyeye
 ******************************************************************************/
package com.skyeye.eve.service;

import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;

import java.util.Map;

public interface SystemFoundationSettingsService {

	public void querySystemFoundationSettingsList(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void editSystemFoundationSettings(InputObject inputObject, OutputObject outputObject) throws Exception;
	
	public void getSystemFoundationSettings(Map<String, Object>	bean) throws Exception;

}
