/**
 * Copyright 卫志强 QQ：598748873@qq.com Inc. All rights reserved.
 */
package com.skyeye.service;

import com.skyeye.common.object.InputObject;
import com.skyeye.common.object.OutputObject;

public interface CompanyMationService {

	public void queryCompanyMationList(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void insertCompanyMation(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void deleteCompanyMationById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryCompanyMationToEditById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void editCompanyMationById(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryOverAllCompanyMationList(InputObject inputObject, OutputObject outputObject) throws Exception;

	public void queryCompanyMationListTree(InputObject inputObject, OutputObject outputObject) throws Exception;

}
