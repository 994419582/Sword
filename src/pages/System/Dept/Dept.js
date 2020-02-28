import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Col, Divider, Form, Input, Row, Tag } from 'antd';
import Panel from '../../../components/Panel';
import Grid from '../../../components/Sword/Grid';
import { DEPT_LIST } from '../../../actions/dept';
import { tenantMode } from '../../../defaultSettings';

const FormItem = Form.Item;

@connect(({ dept, loading }) => ({
  dept,
  loading: loading.models.dept,
}))
@Form.create()
class Dept extends PureComponent {
  // ============ 查询 ===============
  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch(DEPT_LIST(params));
  };

  // ============ 查询表单 ===============
  renderSearchForm = onReset => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={6} sm={24}>
          <FormItem label="机构名称">
            {getFieldDecorator('deptName')(<Input placeholder="请输入机构名称" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="租户ID">
            {getFieldDecorator('tenantId')(<Input placeholder="请输入角色名称" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="机构全称">
            {getFieldDecorator('fullName')(<Input placeholder="请输入机构全称" />)}
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
    router.push(`/system/dept/add/${parentId}`);
  };

  renderActionButton = (keys, rows) => (
    <Fragment>
      <Divider type="vertical" />
      <a
        title="新增下级"
        onClick={() => {
          this.handleClick(rows[0].id);
        }}
      >
        新增下级
      </a>
    </Fragment>
  );

  render() {
    const code = 'dept';

    const {
      form,
      loading,
      dept: { data },
    } = this.props;

    const columns = [
      {
        title: '租户ID',
        dataIndex: 'tenantId',
      },
      {
        title: '机构名称',
        dataIndex: 'deptName',
      },
      {
        title: '机构全称',
        dataIndex: 'fullName',
      },
      {
        title: '机构类型',
        dataIndex: 'deptCategoryName',
        render: deptCategoryName => (
          <span>
            <Tag color="geekblue" key={deptCategoryName}>
              {deptCategoryName}
            </Tag>
          </span>
        ),
      },
      {
        title: '排序',
        dataIndex: 'sort',
      },
    ];

    if (!tenantMode) {
      columns.splice(0, 1);
    }

    return (
      <Panel>
        <Grid
          code={code}
          form={form}
          onSearch={this.handleSearch}
          renderSearchForm={this.renderSearchForm}
          renderActionButton={this.renderActionButton}
          actionColumnWidth={250}
          loading={loading}
          data={data}
          columns={columns}
        />
      </Panel>
    );
  }
}
export default Dept;
