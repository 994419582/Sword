export const DICT_BIZ_NAMESPACE = 'dictbiz';

export function DICT_LIST(payload) {
  return {
    type: `${DICT_BIZ_NAMESPACE}/fetchList`,
    payload,
  };
}

export function DICT_PARENT_LIST(payload) {
  return {
    type: `${DICT_BIZ_NAMESPACE}/fetchParentList`,
    payload,
  };
}

export function DICT_CHILD_LIST(payload) {
  return {
    type: `${DICT_BIZ_NAMESPACE}/fetchChildList`,
    payload,
  };
}

export function DICT_INIT() {
  return {
    type: `${DICT_BIZ_NAMESPACE}/fetchInit`,
    payload: { code: 'DICT' },
  };
}

export function DICT_DETAIL(id) {
  return {
    type: `${DICT_BIZ_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function DICT_CLEAR_DETAIL() {
  return {
    type: `${DICT_BIZ_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function DICT_SUBMIT(payload) {
  return {
    type: `${DICT_BIZ_NAMESPACE}/submit`,
    payload,
  };
}

export function DICT_REMOVE(payload) {
  return {
    type: `${DICT_BIZ_NAMESPACE}/remove`,
    payload,
  };
}

export function DICT_PARENT_SET(parentId) {
  return {
    type: `${DICT_BIZ_NAMESPACE}/setParent`,
    payload: { parentId },
  };
}

export function DICT_PARENT_CLEAR() {
  return {
    type: `${DICT_BIZ_NAMESPACE}/clearParent`,
  };
}
