export const FLOW_NAMESPACE = 'flow';

export function FLOW_INIT() {
  return {
    type: `${FLOW_NAMESPACE}/fetchInit`,
    payload: { code: 'flow' },
  };
}

export function FLOW_MODEL_LIST(payload) {
  return {
    type: `${FLOW_NAMESPACE}/fetchModelList`,
    payload,
  };
}

export function FLOW_MANAGER_LIST(payload) {
  return {
    type: `${FLOW_NAMESPACE}/fetchManagerList`,
    payload,
  };
}

export function FLOW_FOLLOW_LIST(payload) {
  return {
    type: `${FLOW_NAMESPACE}/fetchFollowList`,
    payload,
  };
}

export function FLOW_DEPLOY_UPLOAD(payload) {
  return {
    type: `${FLOW_NAMESPACE}/deployUpload`,
    payload,
  };
}
