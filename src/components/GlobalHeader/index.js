import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import RightContent from './RightContent';
import { MENU_REFRESH_DATA, MENU_REFRESH_ROUTE } from '../../actions/menu';

class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  loadMenu = id => {
    const { dispatch } = this.props;
    dispatch(
      MENU_REFRESH_ROUTE(id, () => {
        dispatch(MENU_REFRESH_DATA());
      })
    );
  };

  render() {
    const { collapsed, isMobile, logo, topMenuData } = this.props;
    return (
      <div className={styles.header}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <span className={styles.trigger} onClick={this.toggle}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </span>

        <span
          className={styles.triggerSmall}
          onClick={() => {
            this.loadMenu(0);
          }}
        >
          <Icon type="home" style={{ paddingRight: '5px' }} />
          首页
        </span>

        {topMenuData.map(menu => (
          <span
            className={styles.triggerSmall}
            onClick={() => {
              this.loadMenu(menu.id);
            }}
          >
            <Icon type={menu.source} style={{ paddingRight: '5px' }} />
            {menu.name}
          </span>
        ))}

        <RightContent {...this.props} />
      </div>
    );
  }
}
export default connect(({ menu: menuModel }) => ({
  topMenuData: menuModel.topMenuData,
}))(GlobalHeader);
