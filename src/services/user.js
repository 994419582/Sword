import { stringify } from 'qs';
import request from '../utils/request';
import { getCaptchaKey } from '../utils/authority';
import func from '../utils/Func';

// =====================用户===========================

export async function accountLogin(params) {
  const values = params;
  values.grant_type = 'captcha';
  values.scope = 'all';
  return request('/api/blade-auth/oauth/token', {
    headers: {
      'Tenant-Id': values.tenantId,
      'Captcha-key': getCaptchaKey(),
      'Captcha-code': values.code,
    },
    method: 'POST',
    body: func.toFormData(values),
  });
}

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function list(params) {
  return request(`/api/blade-user/page?${stringify(params)}`);
}

export async function grant(params) {
  return request('/api/blade-user/grant', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function resetPassword(params) {
  return request('/api/blade-user/reset-password', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function remove(params) {
  return request('/api/blade-user/remove', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function submit(params) {
  return request('/api/blade-user/submit', {
    method: 'POST',
    body: params,
  });
}

export async function update(params) {
  return request('/api/blade-user/update', {
    method: 'POST',
    body: params,
  });
}

export async function detail(params) {
  return request(`/api/blade-user/detail?${stringify(params)}`);
}

export async function getUserInfo() {
  return request('/api/blade-user/info');
}

export async function updatePassword(params) {
  return request('/api/blade-user/update-password', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function getCaptchaImage() {
  return request('/api/blade-auth/oauth/captcha');
}
