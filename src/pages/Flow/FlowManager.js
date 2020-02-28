import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Badge, Button, Card, Col, Form, message, Modal, Row, Select, Tag } from 'antd';
import Panel from '../../components/Panel';
import { FLOW_INIT, FLOW_MANAGER_LIST } from './actions/flow';
import Grid from '../../components/Sword/Grid';
import { changeState, deleteDeployment } from '../../services/flow';
import styles from '../../layouts/Sword.less';

const FormItem = Form.Item;

const statusMap = ['processing', 'default'];
const status = ['激活', '挂起'];

@connect(({ flow, loading }) => ({
  flow,
  loading: loading.models.flow,
}))
@Form.create()
class FlowModel extends PureComponent {
  state = { imageVisible: false, stateVisible: false, processId: '', params: {} };

  // ============ 初始化数据 ===============
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(FLOW_INIT());
  }

  showResource = processId => {
    this.setState({
      imageVisible: true,
      processId,
    });
  };

  handleImageCancel = () => {
    this.setState({
      imageVisible: false,
      processId: '',
    });
  };

  showStateModal = processId => {
    this.setState({
      stateVisible: true,
      processId,
    });
  };

  handleChangeState = () => {
    const { processId, params } = this.state;
    const { dispatch, form } = this.props;
    const flowState = form.getFieldValue('flowState');
    changeState({ state: flowState, processId }).then(resp => {
      if (resp.success) {
        message.success(resp.msg);
        dispatch(FLOW_MANAGER_LIST(params));
      } else {
        message.error(resp.msg || '变更失败');
      }
      this.handleStateCancel();
    });
  };

  handleStateCancel = () => {
    this.setState({
      stateVisible: false,
      processId: '',
    });
  };

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    this.setState({ params });
    dispatch(FLOW_MANAGER_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const {
      form,
      flow: {
        init: { flowCategory },
      },
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="流程分类">
            {getFieldDecorator('category')(
              <Select placeholder="请选择流程分类">
                {flowCategory.map(d => (
                  <Select.Option key={`flow_${d.dictKey}`} value={`flow_${d.dictKey}`}>
                    {d.dictValue}
                  </Select.Option>
                ))}
              </Select>
            )}
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
    const { btn, keys, rows } = payload;
    const { dispatch } = this.props;
    const { params } = this.state;
    if (btn.code === 'flow_manager_image') {
      this.showResource(keys[0]);
      return;
    }
    if (btn.code === 'flow_manager_state') {
      this.showStateModal(keys[0]);
    }
    if (btn.code === 'flow_manager_remove') {
      if (keys.length <= 0) {
        message.warn('请先选择要删除的记录!');
        return;
      }
      Modal.confirm({
        title: '删除确认',
        content: '确定删除选中记录?',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          const selectKeys = rows.map(row => {
            const deploymentIdField = 'deploymentId';
            const selectKey = row[deploymentIdField];
            if (`${selectKey}`.indexOf(',') > 0) {
              return `${selectKey}`.split(',');
            }
            return selectKey;
          });
          deleteDeployment({ deploymentIds: selectKeys }).then(resp => {
            if (resp.success) {
              message.success(resp.msg);
              dispatch(FLOW_MANAGER_LIST(params));
            } else {
              message.error(resp.msg || '删除失败');
            }
          });
        },
      });
    }
  };

  render() {
    const code = 'flow_manager';

    const {
      form,
      loading,
      flow: { manager },
    } = this.props;
    const { imageVisible, stateVisible, processId } = this.state;

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
        title: '流程主键',
        dataIndex: 'id',
      },
      {
        title: '流程标识',
        dataIndex: 'key',
      },
      {
        title: '流程名称',
        dataIndex: 'name',
      },
      {
        title: '流程分类',
        dataIndex: 'categoryName',
      },
      {
        title: '流程版本',
        dataIndex: 'version',
        render: version => (
          <span>
            <Tag color="geekblue" key={version}>
              v{version}
            </Tag>
          </span>
        ),
      },
      {
        title: '状态',
        dataIndex: 'suspensionState',
        render(suspensionState) {
          return (
            <Badge status={statusMap[suspensionState - 1]} text={status[suspensionState - 1]} />
          );
        },
      },
      {
        title: '部署时间',
        dataIndex: 'deploymentTime',
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
          data={manager}
          columns={columns}
        />
        <Modal
          width={1024}
          height={768}
          style={{ top: 20 }}
          visible={imageVisible}
          onOk={this.handleImageCancel}
          onCancel={this.handleImageCancel}
        >
          <img
            src={`/api/blade-flow/process/resource-view?processDefinitionId=${processId}`}
            alt="design"
          />
        </Modal>
        <Modal
          title="流程状态变更"
          width={400}
          visible={stateVisible}
          onOk={this.handleChangeState}
          onCancel={this.handleStateCancel}
        >
          <Form style={{ marginTop: 8 }}>
            <Card className={styles.card} bordered={false}>
              <FormItem {...formItemLayout} label="流程状态">
                {getFieldDecorator('flowState')(
                  <Select placeholder="请选择流程类型">
                    <Select.Option key="active" value="active">
                      激活
                    </Select.Option>
                    <Select.Option key="suspend" value="suspend">
                      挂起
                    </Select.Option>
                  </Select>
                )}
              </FormItem>
            </Card>
          </Form>
        </Modal>
      </Panel>
    );
  }
}

export default FlowModel;
