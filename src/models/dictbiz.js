import { message } from 'antd';
import router from 'umi/router';
import { DICT_BIZ_NAMESPACE } from '@/actions/dictbiz';
import { list, parentList, childList, submit, detail, remove, tree } from '../services/dictbiz';

export default {
  namespace: DICT_BIZ_NAMESPACE,
  state: {
    data: {
      list: [],
      pagination: false,
    },
    parentData: {
      list: [],
      pagination: {},
    },
    childData: {
      list: [],
      pagination: {},
    },
    init: {
      tree: [],
    },
    detail: {},
    parentId: 0,
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(list, payload);
      if (response.success) {
        yield put({
          type: 'saveList',
          payload: {
            list: response.data,
            pagination: false,
          },
        });
      }
    },
    *fetchParentList({ payload }, { call, put }) {
      const response = yield call(parentList, payload);
      if (response.success) {
        yield put({
          type: 'saveParentList',
          payload: {
            list: response.data.records,
            pagination: {
              total: response.data.total,
              current: response.data.current,
              pageSize: response.data.size,
            },
          },
        });
      }
    },
    *fetchChildList({ payload }, { call, put }) {
      const response = yield call(childList, payload);
      if (response.success) {
        yield put({
          type: 'saveChildList',
          payload: {
            list: response.data.records,
            pagination: {
              total: response.data.total,
              current: response.data.current,
              pageSize: response.data.size,
            },
          },
        });
      }
    },
    *fetchInit({ payload }, { call, put }) {
      const response = yield call(tree, payload);
      if (response.success) {
        yield put({
          type: 'saveInit',
          payload: {
            tree: response.data,
          },
        });
      }
    },
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(detail, payload);
      if (response.success) {
        yield put({
          type: 'saveDetail',
          payload: {
            detail: response.data,
          },
        });
      }
    },
    *clearDetail({ payload }, { put }) {
      yield put({
        type: 'removeDetail',
        payload,
      });
    },
    *submit({ payload }, { call, select }) {
      const response = yield call(submit, payload);
      if (response.success) {
        message.success('提交成功');
        const parentId = yield select(state => state.dictbiz.parentId);
        const backUrl = parentId > 0 ? `/system/dictbiz/sub/${parentId}` : '/system/dictbiz';
        router.push(backUrl);
      }
    },
    *remove({ payload }, { call }) {
      const {
        data: { keys },
        success,
      } = payload;
      const response = yield call(remove, { ids: keys });
      if (response.success) {
        success();
      }
    },
    *setParent({ payload }, { put }) {
      yield put({
        type: 'submitParent',
        payload,
      });
    },
    *clearParent({ payload }, { put }) {
      yield put({
        type: 'removeParent',
        payload,
      });
    },
  },
  reducers: {
    saveList(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveParentList(state, action) {
      return {
        ...state,
        parentData: action.payload,
      };
    },
    saveChildList(state, action) {
      return {
        ...state,
        childData: action.payload,
      };
    },
    saveInit(state, action) {
      return {
        ...state,
        init: action.payload,
      };
    },
    saveDetail(state, action) {
      return {
        ...state,
        detail: action.payload.detail,
      };
    },
    removeDetail(state) {
      return {
        ...state,
        detail: {},
      };
    },
    submitParent(state, action) {
      return {
        ...state,
        parentId: action.payload.parentId,
      };
    },
    removeParent(state) {
      return {
        ...state,
        parentId: 0,
      };
    },
  },
};
