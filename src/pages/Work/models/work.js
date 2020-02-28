import { WORK_NAMESPACE } from '../actions/work';
import { startList, claimList, todoList, sendList, doneList } from '../../../services/work';
import { dict } from '../../../services/dict';

export default {
  namespace: WORK_NAMESPACE,
  state: {
    init: {
      flowCategory: [],
    },
    start: {
      list: [],
      pagination: {},
    },
    claim: {
      list: [],
    },
    todo: {
      list: [],
    },
    send: {
      list: [],
      pagination: {},
    },
    done: {
      list: [],
      pagination: {},
    },
    routes: {
      flow_1: 'leave',
      flow_2: 'expense',
    },
  },
  effects: {
    *fetchInit({ payload }, { call, put }) {
      const response = yield call(dict, payload);
      if (response.success) {
        yield put({
          type: 'saveInit',
          payload: {
            init: {
              flowCategory: response.data,
            },
          },
        });
      }
    },
    *fetchStartList({ payload }, { call, put }) {
      const response = yield call(startList, payload);
      if (response.success) {
        yield put({
          type: 'saveStartList',
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
    *fetchClaimList({ payload }, { call, put }) {
      const response = yield call(claimList, payload);
      if (response.success) {
        yield put({
          type: 'saveClaimList',
          payload: {
            list: response.data.records,
          },
        });
      }
    },
    *fetchTodoList({ payload }, { call, put }) {
      const response = yield call(todoList, payload);
      if (response.success) {
        yield put({
          type: 'saveTodoList',
          payload: {
            list: response.data.records,
          },
        });
      }
    },
    *fetchSendList({ payload }, { call, put }) {
      const response = yield call(sendList, payload);
      if (response.success) {
        yield put({
          type: 'saveSendList',
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
    *fetchDoneList({ payload }, { call, put }) {
      const response = yield call(doneList, payload);
      if (response.success) {
        yield put({
          type: 'saveDoneList',
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
  },
  reducers: {
    saveInit(state, action) {
      return {
        ...state,
        init: action.payload.init,
      };
    },
    saveStartList(state, action) {
      return {
        ...state,
        start: action.payload,
      };
    },
    saveClaimList(state, action) {
      return {
        ...state,
        claim: action.payload,
      };
    },
    saveTodoList(state, action) {
      return {
        ...state,
        todo: action.payload,
      };
    },
    saveSendList(state, action) {
      return {
        ...state,
        send: action.payload,
      };
    },
    saveDoneList(state, action) {
      return {
        ...state,
        done: action.payload,
      };
    },
  },
};
