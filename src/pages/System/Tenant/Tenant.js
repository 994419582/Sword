import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Tag,
} from 'antd';
import Panel from '../../../components/Panel';
import { TENANT_LIST } from '../../../actions/tenant';
import Grid from '../../../components/Sword/Grid';
import styles from '../../../layouts/Sword.less';
import func from '../../../utils/Func';
import { setting } from '../../../services/tenant';

const FormItem = Form.Item;

@connect(({ tenant, loading }) => ({
  tenant,
  loading: loading.models.tenant,
}))
@Form.create()
class Tenant extends PureComponent {
  state = {
    settingVisible: false,
    settingLoading: false,
    selectedRows: [],
    params: {},
  };

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(TENANT_LIST(params));
    this.setState({ params });
  };

  onSelectRow = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  getSelectKeys = () => {
    const { selectedRows } = this.state;
    return selectedRows.map(row => row.id);
  };

  // ============ 授权配置 ===============
  setting = () => {
    const keys = this.getSelectKeys();
    if (keys.length === 0) {
      message.warn('请先选择一条数据!');
      return;
    }
    this.setState({ settingVisible: true });
  };

  handleSettingCancel = () => {
    this.setState({
      settingVisible: false,
      settingLoading: false,
    });
  };

  handleSetting = () => {
    const { form } = this.props;
    const accountNumber = form.getFieldValue('accountNumber');
    const expireTime = func.format(form.getFieldValue('expireTime'));
    this.setState({ settingLoading: true });
    const keys = this.getSelectKeys();
    setting({ ids: keys.join(','), accountNumber, expireTime }).then(resp => {
      if (resp.success) {
        const { dispatch } = this.props;
        const { params } = this.state;
        dispatch(TENANT_LIST(params));
        message.success(resp.msg);
      } else {
        message.error(resp.msg || '配置失败');
      }
      this.handleSettingCancel();
    });
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="租户ID">
            {getFieldDecorator('tenantId')(<Input placeholder="请输入租户ID" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="租户名称">
            {getFieldDecorator('tenantName')(<Input placeholder="请输入租户名称" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="联系电话">
            {getFieldDecorator('contactNumber')(<Input placeholder="请输入联系电话" />)}
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

  renderLeftButton = () => (
    <Button icon="tool" onClick={this.setting}>
      授权配置
    </Button>
  );

  render() {
    const code = 'tenant';

    const {
      form,
      loading,
      tenant: { data },
    } = this.props;

    const { getFieldDecorator } = form;

    const { settingVisible, settingLoading } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 15 },
      },
    };

    const columns = [
      {
        title: '租户ID',
        dataIndex: 'tenantId',
      },
      {
        title: '租户名称',
        dataIndex: 'tenantName',
      },
      {
        title: '联系人',
        dataIndex: 'linkman',
      },
      {
        title: '联系电话',
        dataIndex: 'contactNumber',
      },
      {
        title: '账号额度',
        dataIndex: 'accountNumber',
        align: 'right',
        width: 120,
        render: accountNumber => (
          <span>
            <Tag color="geekblue" key={accountNumber}>
              {(accountNumber && accountNumber) > 0 ? accountNumber : '不限制'}
            </Tag>
          </span>
        ),
      },
      {
        title: '过期时间',
        dataIndex: 'expireTime',
        width: 165,
        render: expireTime => (
          <span>
            <Tag color="geekblue" key={expireTime}>
              {expireTime || '不限制'}
            </Tag>
          </span>
        ),
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
          renderLeftButton={this.renderLeftButton}
          loading={loading}
          data={data}
          columns={columns}
        />
        <Modal
          title="租户授权配置"
          width={400}
          visible={settingVisible}
          onOk={this.handleSetting}
          confirmLoading={settingLoading}
          onCancel={this.handleSettingCancel}
        >
          <Form style={{ marginTop: 8 }}>
            <Card className={styles.card} bordered={false}>
              <FormItem {...formItemLayout} className={styles.inputItem} label="账号额度">
                {getFieldDecorator('accountNumber')(<InputNumber placeholder="请输入账号额度" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="过期时间">
                {getFieldDecorator('expireTime')(
                  <DatePicker
                    style={{ width: '100%' }}
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={this.disabledDate}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  />
                )}
              </FormItem>
            </Card>
          </Form>
        </Modal>
      </Panel>
    );
  }
}

export default Tenant;
