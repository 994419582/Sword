import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Col, Form, Input, Row, Tag } from 'antd';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import { DICT_CHILD_LIST, DICT_PARENT_SET } from '../../../actions/dict';

const FormItem = Form.Item;

@connect(({ dict, loading }) => ({
  dict,
  loading: loading.models.dict,
}))
@Form.create()
class DictSub extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { parentId },
      },
    } = this.props;
    dispatch(DICT_PARENT_SET(parentId));
  }

  // ============ 查询 ===============
  handleSearch = params => {
    const {
      dispatch,
      match: {
        params: { parentId },
      },
    } = this.props;
    const value = { ...params, parentId };
    dispatch(DICT_CHILD_LIST(value));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="字典编号">
            {getFieldDecorator('code')(<Input placeholder="请输入字典编号" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="字典名称">
            {getFieldDecorator('dictValue')(<Input placeholder="请输入字典名称" />)}
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

  render() {
    const code = 'dict';

    const {
      form,
      loading,
      dict: { childData },
    } = this.props;

    const columns = [
      {
        title: '字典名称',
        dataIndex: 'dictValue',
      },
      {
        title: '字典编号',
        dataIndex: 'code',
      },
      {
        title: '字典键值',
        dataIndex: 'dictKey',
      },
      {
        title: '是否封存',
        dataIndex: 'isSealed',
        render: isSealed => (
          <span>
            <Tag color="geekblue" key={isSealed}>
              {isSealed === 0 ? '否' : '是'}
            </Tag>
          </span>
        ),
      },
      {
        title: '排序',
        dataIndex: 'sort',
      },
    ];

    return (
      <Panel title="字典详细列表" back="/system/dict">
        <Grid
          code={code}
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          loading={loading}
          data={childData}
          columns={columns}
        />
      </Panel>
    );
  }
}
export default DictSub;
