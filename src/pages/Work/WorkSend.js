import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Col, Form, Modal, Row, Select, Tag, DatePicker } from 'antd';
import Panel from '../../components/Panel';
import { WORK_INIT, WORK_SEND_LIST } from './actions/work';
import Grid from '../../components/Sword/Grid';
import func from '../../utils/Func';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ work, loading }) => ({
  work,
  loading: loading.models.work,
}))
@Form.create()
class WorkSend extends PureComponent {
  state = { imageVisible: false, src: '' };

  // ============ 初始化数据 ===============
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(WORK_INIT());
  }

  showResource = src => {
    this.setState({
      imageVisible: true,
      src,
    });
  };

  handleImageCancel = () => {
    this.setState({
      imageVisible: false,
      src: '',
    });
  };

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;

    const { dateRange } = params;
    const payload = {
      ...params,
      beginDate: dateRange ? func.format(dateRange[0], 'YYYY-MM-DD hh:mm:ss') : null,
      endDate: dateRange ? func.format(dateRange[1], 'YYYY-MM-DD hh:mm:ss') : null,
    };
    payload.dateRange = null;

    dispatch(WORK_SEND_LIST(payload));
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
        <Col md={8} sm={24}>
          <FormItem label="流程时间">
            {getFieldDecorator('dateRange')(
              <RangePicker placeholder={['开始时间', '结束时间']} style={{ width: '100%' }} />
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
    const { btn, rows } = payload;
    const {
      work: { routes },
    } = this.props;
    const { processInstanceId, businessId } = rows[0];
    if (btn.code === 'work_send_follow') {
      this.showResource(
        `/api/blade-flow/process/diagram-view?processInstanceId=${processInstanceId}`
      );
      return;
    }
    if (btn.code === 'work_send_detail') {
      const category = routes[rows[0].category];
      router.push(`/work/process/${category}/detail/${processInstanceId}/${businessId}`);
    }
  };

  render() {
    const code = 'work_send';

    const {
      form,
      loading,
      work: { send },
    } = this.props;
    const { imageVisible, src } = this.state;

    const columns = [
      {
        title: '流程名称',
        dataIndex: 'processDefinitionName',
      },
      {
        title: '当前步骤',
        dataIndex: 'taskName',
      },
      {
        title: '流程版本',
        dataIndex: 'processDefinitionVersion',
        render: processDefinitionVersion => (
          <span>
            <Tag color="geekblue" key={processDefinitionVersion}>
              v{processDefinitionVersion}
            </Tag>
          </span>
        ),
      },
      {
        title: '流程进度',
        dataIndex: 'processIsFinished',
        render: processIsFinished => (
          <span>{processIsFinished === 'finished' ? '已完成' : '未完成'}</span>
        ),
      },
      {
        title: '申请时间',
        dataIndex: 'createTime',
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
          data={send}
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
          <img src={src} alt="design" />
        </Modal>
      </Panel>
    );
  }
}

export default WorkSend;
