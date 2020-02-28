export const TOP_MENU_NAMESPACE = 'topmenu';

export function TOP_MENU_LIST(payload) {
  return {
    type: `${TOP_MENU_NAMESPACE}/fetchList`,
    payload,
  };
}

export function TOP_MENU_DETAIL(id) {
  return {
    type: `${TOP_MENU_NAMESPACE}/fetchDetail`,
    payload: { id },
  };
}

export function TOP_MENU_CLEAR_DETAIL() {
  return {
    type: `${TOP_MENU_NAMESPACE}/clearDetail`,
    payload: {},
  };
}

export function TOP_MENU_SUBMIT(payload) {
  return {
    type: `${TOP_MENU_NAMESPACE}/submit`,
    payload,
  };
}

export function TOP_MENU_REMOVE(payload) {
  return {
    type: `${TOP_MENU_NAMESPACE}/remove`,
    payload,
  };
}

export function TOP_MENU_TREE(payload) {
  return {
    type: `${TOP_MENU_NAMESPACE}/topMenuTree`,
    payload,
  };
}

export function TOP_MENU_TREE_KEYS(payload) {
  return {
    type: `${TOP_MENU_NAMESPACE}/topMenuTreeKeys`,
    payload,
  };
}

export function TOP_MENU_SET_TREE_KEYS(payload) {
  return {
    type: `${TOP_MENU_NAMESPACE}/setTopMenuTreeKeys`,
    payload,
  };
}

export function TOP_MENU_GRANT(payload, callback) {
  return {
    type: `${TOP_MENU_NAMESPACE}/grant`,
    payload,
    callback,
  };
}
