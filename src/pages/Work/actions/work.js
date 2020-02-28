export const WORK_NAMESPACE = 'work';

export function WORK_INIT() {
  return {
    type: `${WORK_NAMESPACE}/fetchInit`,
    payload: { code: 'flow' },
  };
}

export function WORK_START_LIST(payload) {
  return {
    type: `${WORK_NAMESPACE}/fetchStartList`,
    payload,
  };
}

export function WORK_CLAIM_LIST(payload) {
  return {
    type: `${WORK_NAMESPACE}/fetchClaimList`,
    payload,
  };
}

export function WORK_TODO_LIST(payload) {
  return {
    type: `${WORK_NAMESPACE}/fetchTodoList`,
    payload,
  };
}

export function WORK_SEND_LIST(payload) {
  return {
    type: `${WORK_NAMESPACE}/fetchSendList`,
    payload,
  };
}

export function WORK_DONE_LIST(payload) {
  return {
    type: `${WORK_NAMESPACE}/fetchDoneList`,
    payload,
  };
}
