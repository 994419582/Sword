import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import Panel from '../../../components/Panel';
import { OSS_LIST, OSS_INIT } from '../../../actions/oss';
import { enable } from '../../../services/oss';
import Grid from '../../../components/Sword/Grid';

const FormItem = Form.Item;

@connect(({ oss, loading }) => ({
  oss,
  loading: loading.models.oss,
}))
@Form.create()
class Oss extends PureComponent {
  // ============ 初始化数据 ===============
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(OSS_INIT());
  }

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(OSS_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="资源地址">
            {getFieldDecorator('endpoint')(<Input placeholder="查询资源地址" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="accessKey">
            {getFieldDecorator('accessKey')(<Input placeholder="查询accessKey" />)}
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

  // ============ 处理按钮点击回调事件 ===============
  handleBtnCallBack = payload => {
    const { btn, keys, refresh } = payload;
    if (btn.code === 'oss_enable') {
      if (keys.length === 0) {
        message.warn('请先选择一条数据!');
        return;
      }
      if (keys.length > 1) {
        message.warn('只能选择一条数据!');
        return;
      }
      Modal.confirm({
        title: '配置启用确认',
        content: '是否将改配置启用?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        async onOk() {
          const response = await enable({ id: keys });
          if (response.success) {
            message.success(response.msg);
            refresh();
          } else {
            message.error(response.msg || '启用失败');
          }
        },
        onCancel() {},
      });
    }
  };

  render() {
    const code = 'oss';

    const {
      form,
      loading,
      oss: { data },
    } = this.props;

    const columns = [
      {
        title: '分类',
        dataIndex: 'categoryName',
      },
      {
        title: '资源地址',
        dataIndex: 'endpoint',
      },
      {
        title: 'accessKey',
        dataIndex: 'accessKey',
      },
      {
        title: 'secretKey',
        dataIndex: 'secretKey',
      },
      {
        title: '空间名',
        dataIndex: 'bucketName',
      },
      {
        title: '是否启用',
        dataIndex: 'statusName',
      },
    ];

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          btnCallBack={this.handleBtnCallBack}
          loading={loading}
          data={data}
          columns={columns}
        />
      </Panel>
    );
  }
}

export default Oss;
