import React, { PureComponent } from 'react';
import { Form, Input, Card, Button, Select } from 'antd';
import { connect } from 'dva/index';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { OSS_INIT, OSS_SUBMIT } from '../../../actions/oss';

const FormItem = Form.Item;

@connect(({ oss, loading }) => ({
  oss,
  submitting: loading.effects['oss/submit'],
}))
@Form.create()
class OssAdd extends PureComponent {
  // ============ 初始化数据 ===============
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(OSS_INIT());
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch(OSS_SUBMIT(values));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      oss: { init },
      submitting,
    } = this.props;

    const { category } = init;

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
      <Panel title="新增" back="/resource/oss" action={action}>
        <Form style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="所属分类">
              {getFieldDecorator('category', {
                rules: [
                  {
                    required: true,
                    message: '请选择所属分类',
                  },
                ],
              })(
                <Select placeholder="请选择所属分类">
                  {category.map(d => (
                    <Select.Option key={d.dictKey} value={d.dictKey}>
                      {d.dictValue}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="资源地址">
              {getFieldDecorator('endpoint', {
                rules: [
                  {
                    required: true,
                    message: '请输入资源地址',
                  },
                ],
              })(<Input placeholder="请输入资源地址" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="空间名">
              {getFieldDecorator('bucketName', {
                rules: [
                  {
                    required: true,
                    message: '请输入空间名',
                  },
                ],
              })(<Input placeholder="请输入空间名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="accessKey">
              {getFieldDecorator('accessKey', {
                rules: [
                  {
                    required: true,
                    message: '请输入accessKey',
                  },
                ],
              })(<Input placeholder="请输入accessKey" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="secretKey">
              {getFieldDecorator('secretKey', {
                rules: [
                  {
                    required: true,
                    message: '请输入secretKey',
                  },
                ],
              })(<Input placeholder="请输入secretKey" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="appId">
              {getFieldDecorator('appId')(<Input placeholder="请输入应用ID" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="region">
              {getFieldDecorator('region')(<Input placeholder="地域简称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="备注">
              {getFieldDecorator('remark')(<Input placeholder="请输入备注" />)}
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}

export default OssAdd;
