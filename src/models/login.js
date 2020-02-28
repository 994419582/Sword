import { routerRedux } from 'dva/router';
import { notification } from 'antd';
import { stringify } from 'qs';
import { getFakeCaptcha } from '../services/api';
import { accountLogin } from '../services/user';
import { dynamicRoutes, dynamicButtons } from '../services/menu';
import {
  setAuthority,
  setToken,
  setCurrentUser,
  setRoutes,
  setButtons,
  removeAll,
} from '../utils/authority';
import { getPageQuery, formatRoutes, formatButtons } from '../utils/utils';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      if (response.error_description) {
        notification.error({
          message: response.error_description,
        });
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: true,
            type: 'login',
            data: { ...response },
          },
        });
        const responseRoutes = yield call(dynamicRoutes);
        const responseButtons = yield call(dynamicButtons);
        yield put({
          type: 'saveMenuData',
          payload: {
            routes: responseRoutes.data,
            buttons: responseButtons.data,
          },
        });
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          type: 'logout',
          data: {
            authority: 'guest',
            logout: true,
          },
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const { status, type } = payload;

      if (status) {
        const {
          data: { token_type, access_token, role_name, account, user_name, avatar },
        } = payload;
        const token = `${token_type} ${access_token}`;
        setToken(token);
        setAuthority(role_name);
        setCurrentUser({ avatar, account, name: user_name, authority: role_name });
      } else {
        removeAll();
      }

      return {
        ...state,
        status: type === 'login' ? (status ? 'ok' : 'error') : '',
        type: payload.type,
      };
    },
    saveMenuData(state, { payload }) {
      const { routes, buttons } = payload;
      setRoutes(formatRoutes(routes));
      setButtons(formatButtons(buttons));
      return {
        ...state,
      };
    },
  },
};
