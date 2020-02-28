import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Icon, Input, message, Modal, Row, Tree } from 'antd';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import {
  TOP_MENU_LIST,
  TOP_MENU_GRANT,
  TOP_MENU_TREE,
  TOP_MENU_TREE_KEYS,
  TOP_MENU_SET_TREE_KEYS,
} from '../../../actions/topmenu';
import { MENU_REFRESH_DATA } from '../../../actions/menu';

const FormItem = Form.Item;
const { TreeNode } = Tree;

@connect(({ topmenu, loading }) => ({
  topmenu,
  loading: loading.models.topmenu,
}))
@Form.create()
class TopMenu extends PureComponent {
  state = {
    visible: false,
    confirmLoading: false,
    selectedRows: [],
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(TOP_MENU_TREE());
  }

  onSelectRow = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  getSelectKeys = () => {
    const { selectedRows } = this.state;
    return selectedRows.map(row => row.id);
  };

  // ========== 权限配置  =============
  handleGrant = () => {
    const {
      topmenu: { menuTreeKeys },
    } = this.props;

    const keys = this.getSelectKeys();

    this.setState({
      confirmLoading: true,
    });

    const { dispatch } = this.props;
    dispatch(
      TOP_MENU_GRANT(
        {
          topMenuIds: keys[0],
          menuIds: menuTreeKeys,
        },
        () => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
          message.success('配置成功');
          dispatch(MENU_REFRESH_DATA());
        }
      )
    );
    return true;
  };

  showModal = () => {
    const keys = this.getSelectKeys();
    if (keys.length === 0) {
      message.warn('请先选择一条数据!');
      return;
    }
    if (keys.length > 1) {
      message.warn('只能选择一条数据!');
      return;
    }
    const { dispatch } = this.props;
    dispatch(TOP_MENU_TREE_KEYS({ topMenuIds: keys[0] }));
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch(TOP_MENU_SET_TREE_KEYS({ menuTreeKeys: [] }));
    this.setState({
      visible: false,
    });
  };

  onMenuCheck = checkedTreeKeys => {
    const { dispatch } = this.props;
    dispatch(TOP_MENU_SET_TREE_KEYS({ menuTreeKeys: checkedTreeKeys }));
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(TOP_MENU_LIST(params));
  };

  // ============ 处理按钮点击回调事件 ===============
  handleBtnCallBack = payload => {
    const { btn } = payload;
    if (btn.code === 'topmenu_setting') {
      this.showModal();
    }
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="顶部菜单名">
            {getFieldDecorator('name')(<Input placeholder="顶部菜单名" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="顶部菜单编号">
            {getFieldDecorator('code')(<Input placeholder="顶部菜单编号" />)}
          </FormItem>
        </Col>
        <Col>
          <div style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={onReset}>
              重置
            </Button>
          </div>
        </Col>
      </Row>
    );
  };

  render() {
    const code = 'topmenu';

    const { visible, confirmLoading } = this.state;

    const {
      form,
      loading,
      topmenu: { data, menuGrantTree, menuTreeKeys },
    } = this.props;

    const columns = [
      {
        title: '顶部菜单名',
        dataIndex: 'name',
      },
      {
        title: '顶部菜单图标',
        dataIndex: 'source',
        align: 'center',
        render: source => <Icon type={source} style={{ paddingRight: '5px' }} />,
      },
      {
        title: '顶部菜单编号',
        dataIndex: 'code',
      },
      {
        title: '顶部菜单排序',
        dataIndex: 'sort',
      },
    ];

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSelectRow={this.onSelectRow}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          btnCallBack={this.handleBtnCallBack}
          loading={loading}
          data={data}
          columns={columns}
        />
        <Modal
          title="权限配置"
          width={380}
          visible={visible}
          confirmLoading={confirmLoading}
          onOk={this.handleGrant}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Tree checkable checkedKeys={menuTreeKeys} onCheck={this.onMenuCheck}>
            {this.renderTreeNodes(menuGrantTree)}
          </Tree>
        </Modal>
      </Panel>
    );
  }
}
export default TopMenu;
