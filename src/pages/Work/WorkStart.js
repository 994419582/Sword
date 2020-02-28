import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Badge, Button, Col, Form, Modal, Row, Select, Tag, Radio } from 'antd';
import Panel from '../../components/Panel';
import { WORK_INIT, WORK_START_LIST } from './actions/work';
import Grid from '../../components/Sword/Grid';

const FormItem = Form.Item;

const statusMap = ['processing', 'default'];
const status = ['激活', '挂起'];

@connect(({ work, loading }) => ({
  work,
  loading: loading.models.work,
}))
@Form.create()
class WorkStart extends PureComponent {
  state = { imageVisible: false, processId: '', params: {}, mode: 1 };

  // ============ 初始化数据 ===============
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(WORK_INIT());
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

  // ============ 查询 ===============
  handleSearch = params => {
    this.setState({ params });
    const { dispatch } = this.props;
    const { mode } = this.state;
    dispatch(WORK_START_LIST(Object.assign(params, { mode })));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const {
      form,
      work: {
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
    const {
      work: { routes },
    } = this.props;
    if (btn.code === 'work_start_image') {
      this.showResource(keys[0]);
      return;
    }
    if (btn.code === 'work_start_flow') {
      const category = routes[rows[0].category];
      router.push(`/work/process/${category}/form/${keys[0]}`);
    }
  };

  onChange = e => {
    this.setState({
      mode: e.target.value,
    });
    const { dispatch } = this.props;
    const { params } = this.state;
    dispatch(WORK_START_LIST(Object.assign(params, { mode: e.target.value })));
  };

  renderLeftButton = () => (
    <Radio.Group onChange={this.onChange} defaultValue={1}>
      <Radio.Button value={1}>通用流程</Radio.Button>
      <Radio.Button value={2}>定制流程</Radio.Button>
    </Radio.Group>
  );

  render() {
    const code = 'work_start';

    const {
      form,
      loading,
      work: { start },
    } = this.props;
    const { imageVisible, processId } = this.state;

    const columns = [
      {
        title: '租户编号',
        dataIndex: 'tenantId',
        render: tenantId => (
          <span>
            <Tag color="geekblue" key={tenantId}>
              {tenantId || '通用'}
            </Tag>
          </span>
        ),
      },
      {
        title: '流程分类',
        dataIndex: 'categoryName',
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
          renderLeftButton={this.renderLeftButton}
          btnCallBack={this.handleBtnCallBack}
          loading={loading}
          data={start}
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
      </Panel>
    );
  }
}

export default WorkStart;
