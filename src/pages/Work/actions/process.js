export const PROCESS_NAMESPACE = 'process';

export function PROCESS_INIT(payload) {
  return {
    type: `${PROCESS_NAMESPACE}/fetchInit`,
    payload,
  };
}

export function PROCESS_LEAVE_DETAIL(payload) {
  return {
    type: `${PROCESS_NAMESPACE}/fetchLeaveDetail`,
    payload,
  };
}

export function PROCESS_HISTORY_FLOW_INIT(payload) {
  return {
    type: `${PROCESS_NAMESPACE}/fetchHistoryFlowList`,
    payload,
  };
}
