import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Form, Card, Button, Icon } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { TOP_MENU_DETAIL } from '../../../actions/topmenu';

const FormItem = Form.Item;

@connect(({ topmenu }) => ({
  topmenu,
}))
@Form.create()
class TopMenuView extends PureComponent {
  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(TOP_MENU_DETAIL(id));
  }

  handleEdit = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    router.push(`/system/topmenu/edit/${id}`);
  };

  render() {
    const {
      topmenu: { detail },
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
      <Panel title="查看" back="/system/topmenu" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="顶部菜单名">
              <span>{detail.name}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="顶部菜单编号">
              <span>{detail.code}</span>
            </FormItem>
            <FormItem {...formItemLayout} label="顶部菜单资源">
              <span>
                <Icon type={detail.source} style={{ paddingRight: '5px' }} />
                {detail.source}
              </span>
            </FormItem>
            <FormItem {...formItemLayout} label="顶部菜单排序">
              <span>{detail.sort}</span>
            </FormItem>
          </Card>
        </Form>
      </Panel>
    );
  }
}
export default TopMenuView;
