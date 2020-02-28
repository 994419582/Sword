import { message } from 'antd';
import router from 'umi/router';
import { OSS_NAMESPACE } from '../actions/oss';
import { list, submit, detail, remove } from '../services/oss';
import { dict } from '../services/dict';

export default {
  namespace: OSS_NAMESPACE,
  state: {
    data: {
      list: [],
      pagination: false,
    },
    init: {
      category: [],
    },
    detail: {},
  },
  effects: {
    *fetchInit({ payload }, { call, put }) {
      const response = yield call(dict, payload);
      if (response.success) {
        yield put({
          type: 'saveInit',
          payload: {
            category: response.data,
          },
        });
      }
    },
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
        router.push('/resource/oss');
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
  },
  reducers: {
    saveInit(state, action) {
      return {
        ...state,
        init: action.payload,
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
