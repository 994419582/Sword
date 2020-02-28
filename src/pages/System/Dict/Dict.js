import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Col, Divider, Form, Input, Row, Tag } from 'antd';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import { DICT_PARENT_LIST, DICT_PARENT_CLEAR } from '../../../actions/dict';

const FormItem = Form.Item;

@connect(({ dict, loading }) => ({
  dict,
  loading: loading.models.dict,
}))
@Form.create()
class Dict extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(DICT_PARENT_CLEAR());
  }

  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(DICT_PARENT_LIST(params));
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

  handleClick = parentId => {
    router.push(`/system/dict/sub/${parentId}`);
  };

  renderActionButton = (keys, rows) => (
    <Fragment>
      <Divider type="vertical" />
      <a
        title="列表"
        onClick={() => {
          this.handleClick(rows[0].id);
        }}
      >
        列表
      </a>
    </Fragment>
  );

  render() {
    const {
      form,
      loading,
      dict: { parentData },
    } = this.props;

    const columns = [
      {
        title: '字典名称',
        dataIndex: 'dictValue',
      },
      {
        title: '字典编号',
        dataIndex: 'code',
        render: (text, record) => (
          <span>
            <Tag
              color="blue"
              style={{ cursor: 'pointer' }}
              key={record.id}
              onClick={() => {
                this.handleClick(record.id);
              }}
            >
              {text}
            </Tag>
          </span>
        ),
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
      <Panel>
        <Grid
          code="dict"
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          renderActionButton={this.renderActionButton}
          loading={loading}
          data={parentData}
          columns={columns}
        />
      </Panel>
    );
  }
}
export default Dict;
