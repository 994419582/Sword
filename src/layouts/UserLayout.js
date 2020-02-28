import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import DocumentTitle from 'react-document-title';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import getPageTitle from '@/utils/getPageTitle';
import { title } from '../defaultSettings';

const links = [
  {
    key: 'help',
    title: formatMessage({ id: 'layout.user.link.help' }),
    href: '',
  },
  {
    key: 'privacy',
    title: formatMessage({ id: 'layout.user.link.privacy' }),
    href: '',
  },
  {
    key: 'terms',
    title: formatMessage({ id: 'layout.user.link.terms' }),
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 BladeX{' '}
    <a
      key="github"
      title="git"
      target="_blank"
      rel="noopener noreferrer"
      href="https://gitee.ltd/blade/BladeX"
    >
      <Icon type="github" />{' '}
    </a>
  </Fragment>
);

class UserLayout extends Component {
  componentDidMount() {
    const domain = window.location.href.split('/#/')[0];
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'menu/fetchMenuData',
      payload: { routes, authority },
    });
    dispatch({
      type: 'tenant/fetchInfo',
      payload: { domain },
    });
  }

  render() {
    const {
      children,
      location: { pathname },
      breadcrumbNameMap,
      tenant: { info },
    } = this.props;

    const { backgroundUrl } = info;

    const backgroundStyle = {
      backgroundImage: `url(${backgroundUrl})`,
    };

    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <div className={styles.container} style={backgroundStyle}>
          <div className={styles.lang}>
            <SelectLang />
          </div>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>{title}</span>
                </Link>
              </div>
              <div className={styles.desc}>
                Sword是BladeX前端UI项目，基于react 、ant design、umi、dva等流行技术栈。
              </div>
            </div>
            {children}
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(({ menu: menuModel, tenant }) => ({
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  tenant,
}))(UserLayout);
