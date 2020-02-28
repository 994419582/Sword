import React, { PureComponent } from 'react';
import { Card, Timeline } from 'antd';
import func from '../../utils/Func';
import styles from '../../layouts/Sword.less';

export default class FlowLine extends PureComponent {
  render() {
    const { flowList, processInstanceId } = this.props;
    return (
      <div>
        <Card title="流程信息" className={styles.card} bordered={false}>
          <Timeline mode="alternate">
            {flowList.map(d => (
              <Timeline.Item>
                <p>
                  {func.notEmpty(d.assigneeName) ? `[${d.assigneeName}]` : ''} 在 [{d.createTime}]
                  开始处理 [{d.historyActivityName}] 环节
                  {func.notEmpty(d.historyActivityDurationTime)
                    ? `,任务历时 [${d.historyActivityDurationTime}]`
                    : ''}
                </p>
                {func.notEmpty(d.comment) ? <p>批复意见: [{d.comment}]</p> : null}
                {func.notEmpty(d.endTime) ? <p>结束时间: [{d.endTime}]</p> : null}
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
        <Card title="流程跟踪" className={styles.card} bordered={false}>
          <img
            src={`/api/blade-flow/process/diagram-view?processInstanceId=${processInstanceId}`}
            alt="design"
          />
        </Card>
      </div>
    );
  }
}
