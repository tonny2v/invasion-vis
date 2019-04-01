/*
 * @Author: TanJing 
 * @Date: 2018-02-24 15:16:50 
 * @Last Modified by: TanJing
 * @Last Modified time: 2018-04-23 12:13:43
 * @Description:  整体布局组件，带顶部菜单
 */
import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import styles from './index.css';

const location = window.location;
const { Header, Content } = Layout;
function genMenu(route) {
  if (route.subList) {
    return (
    <Menu.SubMenu 
        key={route.name} 
        title={
            <span>{route.name}{route.topMenu && <Icon type='down' style={{ marginLeft: 6 }} />}
            </span> 
        }   
    >
    {route.subList.map(subRoute => genMenu(subRoute))}
    </Menu.SubMenu>); 
  }
  return (route.path.split('/')[1] === 'LinkPages' ? null : <Menu.Item key={route.path}><Link to={route.path}>{route.name}</Link></Menu.Item>);
}

function generateMenuItems(menuConfig, n = getComputedStyle(document.body).getPropertyValue('--menu-item-count-max').trim()) {
  return (
    [
      menuConfig.slice(0, n).map(route => genMenu(route)),
      menuConfig.length > n &&
                <Menu.SubMenu key='more' title={<span>更多 <Icon type='down' /></span>}>
                    {menuConfig.slice(n).map(route => genMenu(route))}
                </Menu.SubMenu>
    ]);
}

export default class MainLayout extends Component {
  render() {
    return (
    <Layout className={styles.layout}>
        <Header className={styles.layoutHeader}>
            <div className={styles.headerLogo}><span>{this.props.title || 'Welcome to my space'}</span></div>
            {location.pathname.split('/')[1] == 'LinkPages' ? null :
                <Menu
                    theme='dark'
                    mode='horizontal'
                    onClick={this.handleClick}
                    selectedKeys={[`/${location.pathname.split('/')[1]}`]}
                    className={styles.headerMenu}
                >
                    {generateMenuItems(this.props.menuConfig)}
                </Menu>}
        </Header>
        <Content className={styles.layoutContent}>
            {this.props.children}
        </Content>
    </Layout>
    );
  }
}
