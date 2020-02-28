import { stringify } from 'qs';
import request from '../utils/request';
import func from '../utils/Func';

// =====================参数===========================

export async function modelList(params) {
  return request(`/api/blade-flow/model/list?${stringify(params)}`);
}

export async function managerList(params) {
  return request(`/api/blade-flow/manager/list?${stringify(params)}`);
}

export async function followList(params) {
  return request(`/api/blade-flow/follow/list?${stringify(params)}`);
}

export async function changeState(params) {
  return request('/api/blade-flow/manager/change-state', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function deployUpload(params) {
  const { flowCategory, fileList, tenantIds } = params;
  const formData = new FormData();
  formData.append('category', flowCategory);
  formData.append('tenantIds', tenantIds);
  fileList.forEach(file => {
    formData.append('files', file);
  });
  return request('/api/blade-flow/manager/deploy-upload', {
    method: 'POST',
    body: formData,
  });
}

export async function deployModel(params) {
  return request('/api/blade-flow/model/deploy', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function deleteDeployment(params) {
  return request('/api/blade-flow/manager/delete-deployment', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function deleteProcessInstance(params) {
  return request('/api/blade-flow/follow/delete-process-instance', {
    method: 'POST',
    body: func.toFormData(params),
  });
}
