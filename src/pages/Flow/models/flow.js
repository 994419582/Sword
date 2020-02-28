import { message } from 'antd';
import router from 'umi/router';
import { FLOW_NAMESPACE } from '../actions/flow';
import { modelList, managerList, followList, deployUpload } from '../../../services/flow';
import { dict } from '../../../services/dict';

export default {
  namespace: FLOW_NAMESPACE,
  state: {
    init: {
      flowCategory: [],
    },
    model: {
      list: [],
      pagination: {},
    },
    manager: {
      list: [],
      pagination: {},
    },
    follow: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetchInit({ payload }, { call, put }) {
      const response = yield call(dict, payload);
      if (response.success) {
        yield put({
          type: 'saveInit',
          payload: {
            flowCategory: response.data,
          },
        });
      }
    },
    *fetchModelList({ payload }, { call, put }) {
      const response = yield call(modelList, payload);
      if (response.success) {
        yield put({
          type: 'saveModelList',
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
    *fetchManagerList({ payload }, { call, put }) {
      const response = yield call(managerList, payload);
      if (response.success) {
        yield put({
          type: 'saveManagerList',
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
    *fetchFollowList({ payload }, { call, put }) {
      const response = yield call(followList, payload);
      if (response.success) {
        yield put({
          type: 'saveFollowList',
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
    *deployUpload({ payload }, { call }) {
      const response = yield call(deployUpload, payload);
      if (response.success) {
        message.success('部署成功');
        router.push('/flow/manager');
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
    saveModelList(state, action) {
      return {
        ...state,
        model: action.payload,
      };
    },
    saveManagerList(state, action) {
      return {
        ...state,
        manager: action.payload,
      };
    },
    saveFollowList(state, action) {
      return {
        ...state,
        follow: action.payload,
      };
    },
  },
};
