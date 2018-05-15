import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd'
import Student from './Student'
import Teacher from './Teacher'
import College from './College'
import Major from './Major'
import Course from './Course'
import './Dashboard.css'

const { Header, Content, Sider } = Layout
const SubMenu = Menu.SubMenu

class Dashboard extends Component {
  state = {
    user: {},
    authority: 'administrator',
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

  handleClick = async ({ key }) => {
    switch (key) {
      case 'logout':
        await fetch('/api/logout')
        this.props.history.replace('/login')
        break
      default:
        break
    }
  }

  async componentDidMount() {
    const user = JSON.parse(await localStorage.getItem('user'))
    let authority
    if (user.studentName) authority = 'student'
    else if (user.teacherName) authority = 'teacher'
    else if (user.administratorId) authority = 'administrator'
    else this.props.history.replace('/login')
    this.setState({ user, authority })
  }

  render() {
    const menu = (
      <Menu onClick={this.handleClick}>
        <Menu.Item>1st menu item</Menu.Item>
        <Menu.Item>2nd menu item</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">注销</Menu.Item>
      </Menu>
    )

    const { user } = this.state

    return (
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
            <Menu.Item key="college">
              <Icon type="video-camera" />
              <span>学院管理</span>
            </Menu.Item>
            <Menu.Item key="major">
              <Icon type="upload" />
              <span>专业管理</span>
            </Menu.Item>
            <Menu.Item key="course">
              <Icon type="upload" />
              <span>课程管理</span>
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
            <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
            <Dropdown overlay={menu} placement="bottomCenter">
              <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
                {user.studentName || user.teacherName || user.administratorId}
              </Avatar>
            </Dropdown>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route path={`${this.props.match.url}/student`} component={Student} />
              <Route path={`${this.props.match.url}/teacher`} component={Teacher} />
              <Route path={`${this.props.match.url}/college`} component={College} />
              <Route path={`${this.props.match.url}/major`} component={Major} />
              <Route path={`${this.props.match.url}/course`} component={Course} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Dashboard
