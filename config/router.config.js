export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './Login/Login' },
      { path: '/user/register', name: 'register', component: './Login/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './Login/RegisterResult',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      {
        path: '/',
        redirect: '/dashboard/workplace',
        authority: ['administrator', 'admin', 'user', 'test'],
      },
      {
        path: '/result',
        routes: [
          // result
          { path: '/result/success', component: './Result/Success' },
          { path: '/result/fail', component: './Result/Error' },
        ],
      },
      {
        path: '/exception',
        routes: [
          // exception
          { path: '/exception/403', name: 'not-permission', component: './Exception/403' },
          { path: '/exception/404', name: 'not-find', component: './Exception/404' },
          { path: '/exception/500', name: 'server-error', component: './Exception/500' },
          {
            path: '/exception/trigger',
            name: 'trigger',
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        path: '/account',
        routes: [
          {
            path: '/account/center',
            component: './Account/Center/Center',
            routes: [
              { path: '/account/center', redirect: '/account/center/articles' },
              { path: '/account/center/articles', component: './Account/Center/Articles' },
              { path: '/account/center/applications', component: './Account/Center/Applications' },
              { path: '/account/center/projects', component: './Account/Center/Projects' },
            ],
          },
          {
            path: '/account/settings',
            //component: './Account/Settings/Info',
            routes: [
              { path: '/account/settings', redirect: '/account/settings/base' },
              { path: '/account/settings/base', component: './Account/Settings/BaseView' },
              { path: '/account/settings/password', component: './Account/Settings/PasswordView' },
              //{ path: '/account/settings/security', component: './Account/Settings/SecurityView' },
              //{ path: '/account/settings/binding', component: './Account/Settings/BindingView' },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      //  editor
      {
        name: 'editor',
        icon: 'highlight',
        path: '/editor',
        routes: [
          {
            path: '/editor/flow',
            name: 'flow',
            component: './Editor/GGEditor/Flow',
          },
          {
            path: '/editor/mind',
            name: 'mind',
            component: './Editor/GGEditor/Mind',
          },
          {
            path: '/editor/koni',
            name: 'koni',
            component: './Editor/GGEditor/Koni',
          },
        ],
      },
      {
        path: '/dashboard',
        routes: [
          { path: '/dashboard/analysis', component: './Dashboard/Analysis' },
          { path: '/dashboard/monitor', component: './Dashboard/Monitor' },
          { path: '/dashboard/workplace', component: './Dashboard/Workplace' },
        ],
      },
      {
        path: '/desk',
        routes: [
          {
            path: '/desk/notice',
            routes: [
              { path: '/desk/notice', redirect: '/desk/notice/list' },
              { path: '/desk/notice/list', component: './Desk/Notice/Notice' },
              { path: '/desk/notice/add', component: './Desk/Notice/NoticeAdd' },
              { path: '/desk/notice/edit/:id', component: './Desk/Notice/NoticeEdit' },
              { path: '/desk/notice/view/:id', component: './Desk/Notice/NoticeView' },
            ],
          },
        ],
      },
      {
        path: '/work',
        routes: [
          {
            path: '/work/start',
            routes: [
              { path: '/work/start', redirect: '/work/start/list' },
              { path: '/work/start/list', component: './Work/WorkStart' },
            ],
          },
          {
            path: '/work/claim',
            routes: [
              { path: '/work/claim', redirect: '/work/claim/list' },
              { path: '/work/claim/list', component: './Work/WorkClaim' },
            ],
          },
          {
            path: '/work/todo',
            routes: [
              { path: '/work/todo', redirect: '/work/todo/list' },
              { path: '/work/todo/list', component: './Work/WorkTodo' },
            ],
          },
          {
            path: '/work/send',
            routes: [
              { path: '/work/send', redirect: '/work/send/list' },
              { path: '/work/send/list', component: './Work/WorkSend' },
            ],
          },
          {
            path: '/work/done',
            routes: [
              { path: '/work/done', redirect: '/work/done/list' },
              { path: '/work/done/list', component: './Work/WorkDone' },
            ],
          },
          {
            path: '/work/process',
            routes: [
              {
                path: '/work/process/leave/form/:processDefinitionId',
                component: './Work/Process/Leave/LeaveStart',
              },
              {
                path: '/work/process/leave/handle/:taskId/:processInstanceId/:businessId',
                component: './Work/Process/Leave/LeaveHandle',
              },
              {
                path: '/work/process/leave/detail/:processInstanceId/:businessId',
                component: './Work/Process/Leave/LeaveDetail',
              },
            ],
          },
        ],
      },
      {
        path: '/authority',
        routes: [
          {
            path: '/authority/role',
            routes: [
              { path: '/authority/role', redirect: '/authority/role/list' },
              { path: '/authority/role/list', component: './Authority/Role/Role' },
              { path: '/authority/role/add', component: './Authority/Role/RoleAdd' },
              { path: '/authority/role/add/:id', component: './Authority/Role/RoleAdd' },
              { path: '/authority/role/edit/:id', component: './Authority/Role/RoleEdit' },
              { path: '/authority/role/view/:id', component: './Authority/Role/RoleView' },
            ],
          },
          {
            path: '/authority/datascope',
            routes: [
              { path: '/authority/datascope', redirect: '/authority/datascope/list' },
              { path: '/authority/datascope/list', component: './Authority/DataScope/DataScope' },
            ],
          },
          {
            path: '/authority/apiscope',
            routes: [
              { path: '/authority/apiscope', redirect: '/authority/apiscope/list' },
              { path: '/authority/apiscope/list', component: './Authority/ApiScope/ApiScope' },
            ],
          },
        ],
      },
      {
        path: '/system',
        routes: [
          {
            path: '/system/user',
            routes: [
              { path: '/system/user', redirect: '/system/user/list' },
              { path: '/system/user/list', component: './System/User/User' },
              { path: '/system/user/add', component: './System/User/UserAdd' },
              { path: '/system/user/edit/:id', component: './System/User/UserEdit' },
              { path: '/system/user/view/:id', component: './System/User/UserView' },
            ],
          },
          {
            path: '/system/dict',
            routes: [
              { path: '/system/dict', redirect: '/system/dict/list' },
              { path: '/system/dict/list', component: './System/Dict/Dict' },
              { path: '/system/dict/add', component: './System/Dict/DictAdd' },
              { path: '/system/dict/add/:id', component: './System/Dict/DictAdd' },
              { path: '/system/dict/edit/:id', component: './System/Dict/DictEdit' },
              { path: '/system/dict/view/:id', component: './System/Dict/DictView' },
              { path: '/system/dict/sub/:parentId', component: './System/Dict/DictSub' },
            ],
          },
          {
            path: '/system/dictbiz',
            routes: [
              { path: '/system/dictbiz', redirect: '/system/dictbiz/list' },
              { path: '/system/dictbiz/list', component: './System/DictBiz/DictBiz' },
              { path: '/system/dictbiz/add', component: './System/DictBiz/DictBizAdd' },
              { path: '/system/dictbiz/add/:id', component: './System/DictBiz/DictBizAdd' },
              { path: '/system/dictbiz/edit/:id', component: './System/DictBiz/DictBizEdit' },
              { path: '/system/dictbiz/view/:id', component: './System/DictBiz/DictBizView' },
              { path: '/system/dictbiz/sub/:parentId', component: './System/DictBiz/DictBizSub' },
            ],
          },
          {
            path: '/system/dept',
            routes: [
              { path: '/system/dept', redirect: '/system/dept/list' },
              { path: '/system/dept/list', component: './System/Dept/Dept' },
              { path: '/system/dept/add', component: './System/Dept/DeptAdd' },
              { path: '/system/dept/add/:id', component: './System/Dept/DeptAdd' },
              { path: '/system/dept/edit/:id', component: './System/Dept/DeptEdit' },
              { path: '/system/dept/view/:id', component: './System/Dept/DeptView' },
            ],
          },
          {
            path: '/system/menu',
            routes: [
              { path: '/system/menu', redirect: '/system/menu/list' },
              { path: '/system/menu/list', component: './System/Menu/Menu' },
              { path: '/system/menu/add', component: './System/Menu/MenuAdd' },
              { path: '/system/menu/add/:id', component: './System/Menu/MenuAdd' },
              { path: '/system/menu/edit/:id', component: './System/Menu/MenuEdit' },
              { path: '/system/menu/view/:id', component: './System/Menu/MenuView' },
            ],
          },
          {
            path: '/system/topmenu',
            routes: [
              { path: '/system/topmenu', redirect: '/system/topmenu/list' },
              { path: '/system/topmenu/list', component: './System/TopMenu/TopMenu' },
              { path: '/system/topmenu/add', component: './System/TopMenu/TopMenuAdd' },
              { path: '/system/topmenu/add/:id', component: './System/TopMenu/TopMenuAdd' },
              { path: '/system/topmenu/edit/:id', component: './System/TopMenu/TopMenuEdit' },
              { path: '/system/topmenu/view/:id', component: './System/TopMenu/TopMenuView' },
            ],
          },
          {
            path: '/system/param',
            routes: [
              { path: '/system/param', redirect: '/system/param/list' },
              { path: '/system/param/list', component: './System/Param/Param' },
              { path: '/system/param/add', component: './System/Param/ParamAdd' },
              { path: '/system/param/edit/:id', component: './System/Param/ParamEdit' },
              { path: '/system/param/view/:id', component: './System/Param/ParamView' },
            ],
          },
          {
            path: '/system/tenant',
            routes: [
              { path: '/system/tenant', redirect: '/system/tenant/list' },
              { path: '/system/tenant/list', component: './System/Tenant/Tenant' },
              { path: '/system/tenant/add', component: './System/Tenant/TenantAdd' },
              { path: '/system/tenant/edit/:id', component: './System/Tenant/TenantEdit' },
              { path: '/system/tenant/view/:id', component: './System/Tenant/TenantView' },
            ],
          },
          {
            path: '/system/client',
            routes: [
              { path: '/system/client', redirect: '/system/client/list' },
              { path: '/system/client/list', component: './System/Client/Client' },
              { path: '/system/client/add', component: './System/Client/ClientAdd' },
              { path: '/system/client/edit/:id', component: './System/Client/ClientEdit' },
              { path: '/system/client/view/:id', component: './System/Client/ClientView' },
            ],
          },
        ],
      },
      {
        path: '/monitor',
        routes: [
          {
            path: '/monitor/log',
            routes: [
              {
                path: '/monitor/log/usual',
                routes: [
                  { path: '/monitor/log/usual', redirect: '/monitor/log/usual/list' },
                  { path: '/monitor/log/usual/list', component: './Monitor/Log/LogUsual' },
                  { path: '/monitor/log/usual/view/:id', component: './Monitor/Log/LogUsualView' },
                ],
              },
              {
                path: '/monitor/log/api',
                routes: [
                  { path: '/monitor/log/api', redirect: '/monitor/log/api/list' },
                  { path: '/monitor/log/api/list', component: './Monitor/Log/LogApi' },
                  { path: '/monitor/log/api/view/:id', component: './Monitor/Log/LogApiView' },
                ],
              },
              {
                path: '/monitor/log/error',
                routes: [
                  { path: '/monitor/log/error', redirect: '/monitor/log/error/list' },
                  { path: '/monitor/log/error/list', component: './Monitor/Log/LogError' },
                  { path: '/monitor/log/error/view/:id', component: './Monitor/Log/LogErrorView' },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/tool',
        routes: [
          {
            path: '/tool/code',
            routes: [
              { path: '/tool/code', redirect: '/tool/code/list' },
              { path: '/tool/code/list', component: './System/Code/Code' },
              { path: '/tool/code/add', component: './System/Code/CodeAdd' },
              { path: '/tool/code/add/:id', component: './System/Code/CodeAdd' },
              { path: '/tool/code/edit/:id', component: './System/Code/CodeEdit' },
              { path: '/tool/code/view/:id', component: './System/Code/CodeView' },
            ],
          },
          {
            path: '/tool/datasource',
            routes: [
              { path: '/tool/datasource', redirect: '/tool/datasource/list' },
              { path: '/tool/datasource/list', component: './System/DataSource/DataSource' },
              { path: '/tool/datasource/add', component: './System/DataSource/DataSourceAdd' },
              { path: '/tool/datasource/add/:id', component: './System/DataSource/DataSourceAdd' },
              {
                path: '/tool/datasource/edit/:id',
                component: './System/DataSource/DataSourceEdit',
              },
              {
                path: '/tool/datasource/view/:id',
                component: './System/DataSource/DataSourceView',
              },
            ],
          },
        ],
      },
      {
        path: '/flow',
        routes: [
          {
            path: '/flow/model',
            routes: [
              { path: '/flow/model', redirect: '/flow/model/list' },
              { path: '/flow/model/list', component: './Flow/FlowModel' },
            ],
          },
          {
            path: '/flow/deploy',
            routes: [
              { path: '/flow/deploy', redirect: '/flow/deploy/upload' },
              { path: '/flow/deploy/upload', component: './Flow/FlowDeploy' },
            ],
          },
          {
            path: '/flow/manager',
            routes: [
              { path: '/flow/manager', redirect: '/flow/manager/list' },
              { path: '/flow/manager/list', component: './Flow/FlowManager' },
            ],
          },
          {
            path: '/flow/follow',
            routes: [
              { path: '/flow/follow', redirect: '/flow/follow/list' },
              { path: '/flow/follow/list', component: './Flow/FlowFollow' },
            ],
          },
        ],
      },
      {
        path: '/resource',
        routes: [
          {
            path: '/resource/oss',
            routes: [
              { path: '/resource/oss', redirect: '/resource/oss/list' },
              { path: '/resource/oss/list', component: './Resource/Oss/Oss' },
              { path: '/resource/oss/add', component: './Resource/Oss/OssAdd' },
              { path: '/resource/oss/edit/:id', component: './Resource/Oss/OssEdit' },
              { path: '/resource/oss/view/:id', component: './Resource/Oss/OssView' },
            ],
          },
        ],
      },
    ],
  },
];
