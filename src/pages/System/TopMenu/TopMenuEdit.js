import React, { PureComponent } from 'react';
import { Form, Input, InputNumber, Card, Button, Tabs, Modal, Row, Col, Icon } from 'antd';
import { connect } from 'dva';
import Panel from '../../../components/Panel';
import styles from '../../../layouts/Sword.less';
import { TOP_MENU_DETAIL, TOP_MENU_SUBMIT } from '../../../actions/topmenu';
import { iconData } from '../../../components/IconPreview/IconData';
import func from '../../../utils/Func';

const FormItem = Form.Item;
const { Search } = Input;
const { TabPane } = Tabs;

@connect(({ topmenu, loading }) => ({
  topmenu,
  submitting: loading.effects['topmenu/submit'],
}))
@Form.create()
class TopMenuEdit extends PureComponent {
  state = { visible: false, iconSource: '' };

  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch(TOP_MENU_DETAIL(id)).then(() => {
      const {
        topmenu: { detail },
      } = this.props;
      this.setState({ iconSource: detail.source });
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleIconClick = type => {
    this.setState({
      iconSource: type.icon,
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      dispatch,
      match: {
        params: { id },
      },
      form,
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params = {
          id,
          ...values,
        };
        console.log(params);
        dispatch(TOP_MENU_SUBMIT(params));
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      topmenu: { detail },
      submitting,
    } = this.props;

    const { visible, iconSource } = this.state;

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
      <Panel title="修改" back="/system/topmenu" action={action}>
        <Form hideRequiredMark style={{ marginTop: 8 }}>
          <Card className={styles.card} bordered={false}>
            <FormItem {...formItemLayout} label="顶部菜单名">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入顶部菜单名',
                  },
                ],
                initialValue: detail.name,
              })(<Input placeholder="请输入顶部菜单名" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="顶部菜单编号">
              {getFieldDecorator('code', {
                rules: [
                  {
                    required: true,
                    message: '请输入顶部菜单编号',
                  },
                ],
                initialValue: detail.code,
              })(<Input placeholder="请输入顶部菜单编号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="顶部菜单资源">
              {getFieldDecorator('source', {
                rules: [
                  {
                    required: true,
                    message: '请输入顶部菜单资源',
                  },
                ],
                initialValue: iconSource,
              })(
                <Search
                  prefix={<Icon type={func.isEmpty(iconSource) ? 'setting' : iconSource} />}
                  placeholder="请选择菜单图标"
                  onSearch={this.showModal}
                  enterButton
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} className={styles.inputItem} label="顶部菜单排序">
              {getFieldDecorator('sort', {
                rules: [
                  {
                    required: true,
                    message: '请输入顶部菜单排序',
                  },
                ],
                initialValue: detail.sort,
              })(<InputNumber placeholder="请输入顶部菜单排序" />)}
            </FormItem>
          </Card>
        </Form>
        <Modal width={900} visible={visible} onCancel={this.handleCancel} footer={null}>
          <Tabs defaultActiveKey="direction">
            {iconData.map(data => (
              <TabPane tab={data.description} key={data.category}>
                <Card className={styles.card} bordered={false}>
                  <Row gutter={24} className={styles.iconPreview}>
                    {data.icons.map(icon => (
                      <Col span={4} key={icon}>
                        <Icon
                          type={icon}
                          onClick={() => {
                            this.handleIconClick({ icon });
                          }}
                        />
                      </Col>
                    ))}
                  </Row>
                </Card>
              </TabPane>
            ))}
          </Tabs>
        </Modal>
      </Panel>
    );
  }
}

export default TopMenuEdit;
