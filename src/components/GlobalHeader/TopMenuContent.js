import React, { PureComponent } from 'react';
import { Icon } from 'antd';

export default class TopMenuContent extends PureComponent {
  render() {
    return (
      <div style={{ float: 'left' }}>
        <span>
          <Icon type="menu-fold" />
          流程挂你
        </span>
        <span>
          <Icon type="menu-fold" />
          流程挂你
        </span>
        <span>
          <Icon type="menu-fold" />
          流程挂你
        </span>
      </div>
    );
  }
}
