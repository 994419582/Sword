import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Row, message, Modal, Input, Badge, Card } from 'antd';
import Panel from '../../components/Panel';
import { FLOW_FOLLOW_LIST } from './actions/flow';
import Grid from '../../components/Sword/Grid';
import { deleteProcessInstance } from '../../services/flow';
import styles from '../../layouts/Sword.less';

const FormItem = Form.Item;
const { TextArea } = Input;

const statusMap = ['processing', 'default'];
const statusName = ['激活', '挂起'];

@connect(({ flow, loading }) => ({
  flow,
  loading: loading.models.flow,
}))
@Form.create()
class FlowFollow extends PureComponent {
  state = { stateVisible: false, processInstanceId: '', followLoading: false, params: {} };

  showStateModal = processInstanceId => {
    this.setState({
      stateVisible: true,
      processInstanceId,
    });
  };

  handleStateCancel = () => {
    this.setState({
      stateVisible: false,
      processInstanceId: '',
      followLoading: false,
    });
  };

  handleDeleteProcessInstance = () => {
    const { processInstanceId, params } = this.state;
    const { dispatch, form } = this.props;
    const deleteReason = form.getFieldValue('deleteReason');
    this.setState({ followLoading: true });
    deleteProcessInstance({ deleteReason, processInstanceId }).then(resp => {
      if (resp.success) {
        message.success(resp.msg);
        dispatch(FLOW_FOLLOW_LIST(params));
      } else {
        message.error(resp.msg || '变更失败');
      }
      this.handleStateCancel();
    });
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="流程key">
            {getFieldDecorator('processDefinitionKey')(<Input placeholder="请输入流程key" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="流程实例id">
            {getFieldDecorator('processInstanceId')(<Input placeholder="请输入流程实例id" />)}
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

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    this.setState({ params });
    dispatch(FLOW_FOLLOW_LIST(params));
  };

  // ============ 处理按钮点击回调事件 ===============
  handleBtnCallBack = payload => {
    const { btn, rows } = payload;
    const { processInstanceId } = rows[0];
    if (btn.code === 'flow_follow_delete') {
      this.showStateModal(processInstanceId);
    }
  };

  render() {
    const code = 'flow_follow';

    const {
      form,
      loading,
      flow: { follow },
    } = this.props;
    const { stateVisible, followLoading } = this.state;

    const { getFieldDecorator } = form;

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
        title: '执行id',
        dataIndex: 'executionId',
      },
      {
        title: '流程key',
        dataIndex: 'processDefinitionKey',
      },
      {
        title: '流程实例id',
        dataIndex: 'processInstanceId',
      },
      {
        title: '状态',
        dataIndex: 'suspensionState',
        render(suspensionState) {
          return (
            <Badge status={statusMap[suspensionState - 1]} text={statusName[suspensionState - 1]} />
          );
        },
      },
      {
        title: '发起人',
        dataIndex: 'startUser',
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
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
          data={follow}
          columns={columns}
        />
        <Modal
          title="删除确认"
          width={400}
          visible={stateVisible}
          confirmLoading={followLoading}
          onOk={this.handleDeleteProcessInstance}
          onCancel={this.handleStateCancel}
        >
          <Form style={{ marginTop: 8 }}>
            <Card className={styles.card} bordered={false}>
              <FormItem {...formItemLayout} label="删除理由">
                {getFieldDecorator('deleteReason')(<TextArea placeholder="请输入删除理由" />)}
              </FormItem>
            </Card>
          </Form>
        </Modal>
      </Panel>
    );
  }
}

export default FlowFollow;
