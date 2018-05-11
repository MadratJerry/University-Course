import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd'
import Student from './Student'
import { GlobalContext } from '../Context'
import './Dashboard.css'

const { Header, Content, Sider } = Layout
const SubMenu = Menu.SubMenu

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
)

class Dashboard extends Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  handleMenuClick = ({ key }) => {
    this.props.history.replace(`${this.props.match.url}/${key}`)
  }

  render() {
    return (
      <GlobalContext.Consumer>
        {({ user }) => (
          <Layout style={{ height: '100%' }}>
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
              <div className="logo" />
              <Menu theme="dark" mode="inline" defaultOpenKeys={['sub1']} onClick={this.handleMenuClick}>
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      <span>用户管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="student">学生管理</Menu.Item>
                  <Menu.Item key="teacher">教师管理</Menu.Item>
                </SubMenu>
                <Menu.Item key="2">
                  <Icon type="video-camera" />
                  <span>nav 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="upload" />
                  <span>nav 3</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header
                style={{
                  background: '#fff',
                  justifyContent: 'space-between',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
                <Dropdown overlay={menu} placement="bottomCenter">
                  <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
                    {user.name}
                  </Avatar>
                </Dropdown>
              </Header>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                <Switch>
                  <Route path={`${this.props.match.url}/student`} component={Student} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        )}
      </GlobalContext.Consumer>
    )
  }
}

export default Dashboard
