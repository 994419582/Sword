module.exports = {
  title: 'Sword 企业级开发平台',
  name: 'Sword Admin',
  clientId: 'sword', // 客户端id
  clientSecret: 'sword_secret', // 客户端密钥
  tenantMode: true, // 开启租户模式
  pwa: true,
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: true, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: true, // sticky siderbar
  collapse: true,
  menu: {
    disableLocal: false,
  },
  // your iconfont Symbol Scrip Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont图标项目里要进行批量去色处理
  iconfontUrl: '',
  // 流程设计器地址
  flowDesignUrl: 'http://localhost:9999',
};
