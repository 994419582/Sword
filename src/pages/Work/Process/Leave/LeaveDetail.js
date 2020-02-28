import React, { PureComponent } from 'react';
import { Form, Card } from 'antd';
import { connect } from 'dva';
import Panel from '../../../../components/Panel';
import styles from '../../../../layouts/Sword.less';
import func from '../../../../utils/Func';
import { PROCESS_HISTORY_FLOW_INIT, PROCESS_LEAVE_DETAIL } from '../../actions/process';
import FlowLine from '../../../../components/Sword/FlowLine';

const FormItem = Form.Item;

@connect(({ process, loading }) => ({
  process,
  loading: loading.models.process,
}))
@Form.create()
class LeaveDetail extends PureComponent {
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

  render() {
    const {
      process: { leaveDetail, historyFlowList },
      match: {
        params: { processInstanceId },
      },
    } = this.props;

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

    return (
      <Panel title="请假申请详情页" back="/work/start">
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
          </Card>
          <FlowLine flowList={historyFlowList} processInstanceId={processInstanceId} />
        </Form>
      </Panel>
    );
  }
}

export default LeaveDetail;
