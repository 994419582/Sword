import React, { PureComponent } from 'react';
import { Form, Card, Input, Button, message } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import Panel from '../../../../components/Panel';
import styles from '../../../../layouts/Sword.less';
import func from '../../../../utils/Func';
import { PROCESS_HISTORY_FLOW_INIT, PROCESS_LEAVE_DETAIL } from '../../actions/process';
import { completeTask } from '../../../../services/work';
import FlowLine from '../../../../components/Sword/FlowLine';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ process, loading }) => ({
  process,
  loading: loading.models.process,
}))
@Form.create()
class LeaveHandle extends PureComponent {
  state = {
    submitting: false,
  };

  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { processInstanceId, businessId },
      },
    } = this.props;
    dispatch(PROCESS_LEAVE_DETAIL({ businessId }));
    dispatch(PROCESS_HISTORY_FLOW_INIT({ processInstanceId }));
  }

  handleAgree = e => {
    e.preventDefault();
    const {
      form,
      match: {
        params: { taskId, processInstanceId },
      },
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          taskId,
          processInstanceId,
          flag: 'ok',
          ...values,
        };
        this.setState({ submitting: true });
        completeTask(params).then(resp => {
          if (resp.success) {
            message.success(resp.msg);
            router.push('/work/start');
          } else {
            message.error(resp.msg || '提交失败');
          }
          this.setState({ submitting: false });
        });
      }
    });
  };

  handleDisagree = e => {
    e.preventDefault();
    const {
      form,
      match: {
        params: { taskId, processInstanceId },
      },
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          taskId,
          processInstanceId,
          ...values,
        };
        this.setState({ submitting: true });
        completeTask(params).then(resp => {
          if (resp.success) {
            message.success(resp.msg);
            router.push('/work/start');
          } else {
            message.error(resp.msg || '提交失败');
          }
          this.setState({ submitting: false });
        });
      }
    });
  };

  back = () => {
    router.push('/work/start');
  };

  render() {
    const {
      form: { getFieldDecorator },
      process: { leaveDetail, historyFlowList },
      match: {
        params: { processInstanceId },
      },
    } = this.props;

    const { submitting } = this.state;

    const { flow } = leaveDetail;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const action = (
      <div>
        <Button type="primary" onClick={this.handleAgree} loading={submitting}>
          同意
        </Button>
        <Button type="danger" onClick={this.handleDisagree} loading={submitting}>
          驳回
        </Button>
        <Button
          type="default"
          style={{ color: '#189dff', border: '1px solid #189dff' }}
          onClick={this.back}
        >
          返回
        </Button>
      </div>
    );

    return (
      <Panel title="请假申请详情页" action={action}>
        <Form style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="申请人">
              <span>{func.notEmpty(flow) ? flow.assigneeName : ''}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="开始时间">
              <span>{leaveDetail.startTime}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="结束时间">
              <span>{leaveDetail.endTime}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="请假理由">
              <span>{leaveDetail.reason}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="批复意见">
              {getFieldDecorator('comment', {
                rules: [
                  {
                    required: true,
                    message: '请输入批复意见',
                  },
                ],
              })(<TextArea placeholder="请输入批复意见" />)}
            </FormItem>
          </Card>
          <FlowLine flowList={historyFlowList} processInstanceId={processInstanceId} />
        </Form>
      </Panel>
    );
  }
}

export default LeaveHandle;
