export const OSS_NAMESPACE = 'oss';

export function OSS_INIT() {
  return {
    type: `${OSS_NAMESPACE}/fetchInit`,
    payload: { code: 'oss' },
  };
}

export function OSS_LIST(payload) {
  return {
    type: `${OSS_NAMESPACE}/fetchList`,
    payload,
  };
}

export function OSS_DETAIL(id) {
  return {
    type: `${OSS_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function OSS_CLEAR_DETAIL() {
  return {
    type: `${OSS_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function OSS_SUBMIT(payload) {
  return {
    type: `${OSS_NAMESPACE}/submit`,
    payload,
  };
}

export function OSS_REMOVE(payload) {
  return {
    type: `${OSS_NAMESPACE}/remove`,
    payload,
  };
}
