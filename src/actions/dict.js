export const DICT_NAMESPACE = 'dict';

export function DICT_LIST(payload) {
  return {
    type: `${DICT_NAMESPACE}/fetchList`,
    payload,
  };
}

export function DICT_PARENT_LIST(payload) {
  return {
    type: `${DICT_NAMESPACE}/fetchParentList`,
    payload,
  };
}

export function DICT_CHILD_LIST(payload) {
  return {
    type: `${DICT_NAMESPACE}/fetchChildList`,
    payload,
  };
}

export function DICT_INIT() {
  return {
    type: `${DICT_NAMESPACE}/fetchInit`,
    payload: { code: 'DICT' },
  };
}

export function DICT_DETAIL(id) {
  return {
    type: `${DICT_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function DICT_CLEAR_DETAIL() {
  return {
    type: `${DICT_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function DICT_SUBMIT(payload) {
  return {
    type: `${DICT_NAMESPACE}/submit`,
    payload,
  };
}

export function DICT_REMOVE(payload) {
  return {
    type: `${DICT_NAMESPACE}/remove`,
    payload,
  };
}

export function DICT_PARENT_SET(parentId) {
  return {
    type: `${DICT_NAMESPACE}/setParent`,
    payload: { parentId },
  };
}

export function DICT_PARENT_CLEAR() {
  return {
    type: `${DICT_NAMESPACE}/clearParent`,
  };
}
