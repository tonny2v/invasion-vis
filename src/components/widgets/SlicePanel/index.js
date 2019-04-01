/*
 * @Author: TanJing 
 * @Date: 2018-02-24 14:58:43 
 * @Last Modified by: TanJing
 * @Last Modified time: 2018-03-05 11:24:37
 * @Description:  看板组件，可拖动、缩放和最小化，应与react-grid-layout结合使用，详情见components/test_pages/test_slice_panel/index.js
 * 调用需知：与react-grid-layout结合使用，props.【title】（str）（可选） + props.【mapComponent】（react组件）（可选）
 * this.props.【bodyDragCancel】存在，body不可拖动
 * this.props.【bodyStyle】
 * this.props.【colTit】
 * this.props.【colId】必填
 */
import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './index.css';


class SlicePanel extends Component {
  render() {
    const { colTit, colId, title, openPanel, closePanel, bodyDragCancel, mapComponent, bodyStyle } = this.props;
    return (
      <React.Fragment>
        <div className='collapseTit' onClick={ e => openPanel(colId)}>
          <Button className={styles.titBtn} icon='caret-right' ghost />
          {colTit || title || '*.* 折叠框 *.*'}
        </div>
        <div className='closeBtn' onClick={closePanel.bind(this, colId)}>
          - {' '}
        </div>
        <div className={`${styles.head}${title ? '' : ` ${styles.noTit}`}`}>
	    <span className={styles.headTit}>
{title}
     </span>
        </div>
        <div
          className={`${styles.body}${bodyDragCancel ? ' dragCancel' : ''}`}
          style={{ ...bodyStyle }}
        >
          {mapComponent}
        </div>
      </React.Fragment>
    );
  }
}

export default SlicePanel;
