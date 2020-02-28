import { message } from 'antd';
import router from 'umi/router';
import { TOP_MENU_NAMESPACE } from '../actions/topmenu';
import { list, submit, detail, remove } from '../services/topmenu';
import {
  dynamicButtons,
  dynamicRoutes,
  topMenuTree,
  topMenuTreeKeys,
  topMenuGrant,
} from '../services/menu';
import { setButtons, setRoutes } from '../utils/authority';
import { formatButtons, formatRoutes } from '../utils/utils';

export default {
  namespace: TOP_MENU_NAMESPACE,
  state: {
    data: {
      list: [],
      pagination: false,
    },
    detail: {},
    menuGrantTree: [],
    menuTreeKeys: [],
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(list, payload);
      if (response.success) {
        yield put({
          type: 'saveList',
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
        payload: { payload },
      });
    },
    *submit({ payload }, { call }) {
      const response = yield call(submit, payload);
      if (response.success) {
        message.success('提交成功');
        router.push('/system/topmenu');
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
    *topMenuTree({ payload }, { call, put }) {
      const response = yield call(topMenuTree, payload);
      yield put({
        type: 'save',
        payload: {
          menuGrantTree: response.data.menu,
        },
      });
    },
    *topMenuTreeKeys({ payload }, { call, put }) {
      const response = yield call(topMenuTreeKeys, payload);
      yield put({
        type: 'save',
        payload: {
          menuTreeKeys: response.data.menu,
        },
      });
    },
    *setTopMenuTreeKeys({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          menuTreeKeys: payload.menuTreeKeys,
        },
      });
    },
    *grant({ payload, callback }, { call }) {
      const response = yield call(topMenuGrant, payload);
      if (response.success) {
        if (callback) {
          callback();
        }
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveList(state, action) {
      return {
        ...state,
        data: action.payload,
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
  },
};
