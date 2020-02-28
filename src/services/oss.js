import { stringify } from 'qs';
import func from '../utils/Func';
import request from '../utils/request';

export async function list(params) {
  return request(`/api/blade-resource/oss/list?${stringify(params)}`);
}

export async function submit(params) {
  return request('/api/blade-resource/oss/submit', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-resource/oss/detail?${stringify(params)}`);
}

export async function remove(params) {
  return request('/api/blade-resource/oss/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function enable(params) {
  return request('/api/blade-resource/oss/enable', {
    method: 'POST',
    body: func.toFormData(params),
  });
}
