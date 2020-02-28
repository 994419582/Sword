import { PROCESS_NAMESPACE } from '../actions/process';
import { userList, leaveDetail, historyFlowList } from '../../../services/process';

export default {
  namespace: PROCESS_NAMESPACE,
  state: {
    init: {
      userList: [],
    },
    historyFlowList: [],
    leaveDetail: {},
  },
  effects: {
    *fetchInit({ payload }, { call, put }) {
      const response = yield call(userList, payload);
      if (response.success) {
        yield put({
          type: 'saveInit',
          payload: {
            init: {
              userList: response.data,
            },
          },
        });
      }
    },
    *fetchLeaveDetail({ payload }, { call, put }) {
      const response = yield call(leaveDetail, payload);
      if (response.success) {
        yield put({
          type: 'saveLeaveDetail',
          payload: {
            leaveDetail: response.data,
          },
        });
      }
    },
    *fetchHistoryFlowList({ payload }, { call, put }) {
      const response = yield call(historyFlowList, payload);
      if (response.success) {
        yield put({
          type: 'saveHistoryFlowList',
          payload: {
            historyFlowList: response.data,
          },
        });
      }
    },
  },
  reducers: {
    saveInit(state, action) {
      return {
        ...state,
        init: action.payload.init,
      };
    },
    saveLeaveDetail(state, action) {
      return {
        ...state,
        leaveDetail: action.payload.leaveDetail,
      };
    },
    saveHistoryFlowList(state, action) {
      return {
        ...state,
        historyFlowList: action.payload.historyFlowList,
      };
    },
  },
};
