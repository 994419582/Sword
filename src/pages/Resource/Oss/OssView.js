import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Button } from 'antd';
import { connect } from 'dva/index';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { OSS_DETAIL } from '../../../actions/oss';

const FormItem = Form.Item;

@connect(({ oss }) => ({
  oss,
}))
@Form.create()
class OssView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(OSS_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/resource/oss/edit/${id}`);
  };

  render() {
    const {
      oss: { detail },
    } = this.props;

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
      <Button type="primary" onClick={this.handleEdit}>
        修改
      </Button>
    );

    return (
      <Panel title="查看" back="/resource/oss" action={action}>
        <Form style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="所属分类">
              <span>{detail.categoryName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="资源地址">
              <span>{detail.endpoint}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="空间名">
              <span>{detail.bucketName}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="accessKey">
              <span>{detail.accessKey}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="secretKey">
              <span>{detail.secretKey}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="应用ID">
              <span>{detail.appId}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="地域简称">
              <span>{detail.region}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="备注">
              <span>{detail.remark}</span>
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}
export default OssView;
