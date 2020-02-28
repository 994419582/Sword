import { stringify } from 'qs';
import request from '../utils/request';
import func from '../utils/Func';

// =====================参数===========================

export async function startList(params) {
  return request(`/api/blade-flow/work/start-list?${stringify(params)}`);
}

export async function claimList(params) {
  return request(`/api/blade-flow/work/claim-list?${stringify(params)}`);
}

export async function todoList(params) {
  return request(`/api/blade-flow/work/todo-list?${stringify(params)}`);
}

export async function sendList(params) {
  return request(`/api/blade-flow/work/send-list?${stringify(params)}`);
}

export async function doneList(params) {
  return request(`/api/blade-flow/work/done-list?${stringify(params)}`);
}

export async function claimTask(params) {
  return request('/api/blade-flow/work/claim-task', {
    method: 'POST',
    body: func.toFormData(params),
  });
}

export async function completeTask(params) {
  return request('/api/blade-flow/work/complete-task', {
    method: 'POST',
    body: params,
  });
}
