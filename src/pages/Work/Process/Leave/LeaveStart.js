import React, { PureComponent } from 'react';
import { Form, Input, Card, Button, message, DatePicker, Select } from 'antd';
import moment from 'moment';
import router from 'umi/router';
import { connect } from 'dva';
import Panel from '../../../../components/Panel';
import styles from '../../../../layouts/Sword.less';
import { leaveProcess } from '../../../../services/process';
import { PROCESS_INIT } from '../../actions/process';
import func from '../../../../utils/Func';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ process, loading }) => ({
  process,
  loading: loading.models.process,
}))
@Form.create()
class LeaveStart extends PureComponent {
  state = {
    submitting: false,
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(PROCESS_INIT({}));
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      form,
      match: {
        params: { processDefinitionId },
      },
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          processDefinitionId,
          ...values,
          startTime: func.format(values.startTime),
          endTime: func.format(values.endTime),
        };
        this.setState({ submitting: true });
        leaveProcess(params).then(resp => {
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

  disabledDate = current =>
    // Can not select days before today
    current && current < moment().endOf('day');

  render() {
    const {
      form: { getFieldDecorator },
      process: {
        init: { userList },
      },
    } = this.props;

    const { submitting } = this.state;

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
      <Button type="primary" onClick={this.handleSubmit} loading={submitting}>
        提交
      </Button>
    );

    return (
      <Panel title="请假申请" back="/work/start" action={action}>
        <Form style={{ marginTop: 8 }}>
          <Card title="基本信息" className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="审批人员">
              {getFieldDecorator('taskUser', {
                rules: [
                  {
                    required: true,
                    message: '请选择审批人员',
                  },
                ],
              })(
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear
                  placeholder="请选择审批人员"
                >
                  {userList.map(d => (
                    <Select.Option key={d.id} value={d.id}>
                      {d.name}({d.account})
                    </Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="开始时间">
              {getFieldDecorator('startTime', {
                rules: [
                  {
                    required: true,
                    message: '请选择请假开始时间',
                  },
                ],
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={this.disabledDate}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="结束时间">
              {getFieldDecorator('endTime', {
                rules: [
                  {
                    required: true,
                    message: '请选择请假结束时间',
                  },
                ],
              })(
                <DatePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={this.disabledDate}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="请假理由">
              {getFieldDecorator('reason', {
                rules: [
                  {
                    required: true,
                    message: '请输入请假理由',
                  },
                ],
              })(<TextArea placeholder="请输入请假理由" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default LeaveStart;
