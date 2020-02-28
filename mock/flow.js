import { delay } from 'roadhog-api-doc';

function getFakeList(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  const list = [];
  list.push(
    {
      id: '1',
      modelKey: 'leave',
      name: '请假流程',
      version: '1',
      created: 'admin',
      lastUpdated: '2019-04-15 23:33:33',
    },
    {
      id: '1',
      modelKey: 'expense',
      name: '报销流程',
      version: '2',
      created: 'admin',
      lastUpdated: '2019-04-15 23:33:33',
    }
  );
  json.data = {
    total: 10,
    size: 10,
    current: 2,
    searchCount: true,
    pages: 1,
    records: list,
  };
  return res.json(json);
}

function fakeSuccess(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  return res.json(json);
}

function getFakeSelect(req, res) {
  const json = { code: 200, success: true, msg: '操作成功' };
  json.data = [
    {
      dictKey: '1',
      dictValue: '请假流程',
    },
    {
      dictKey: '2',
      dictValue: '报销流程',
    },
  ];
  return res.json(json);
}

const proxy = {
  'GET /api/blade-flow/model/list': getFakeList,
  'GET /api/blade-flow/model/select': getFakeSelect,
  'GET /api/blade-flow/manager/list': getFakeList,
  'GET /api/blade-flow/status/list': fakeSuccess,
  'POST /api/blade-flow/model/deploy': fakeSuccess,
};
export default delay(proxy, 500);
