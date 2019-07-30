import React, { Component } from 'react'
import TabBar from 'antd-mobile/lib/tab-bar'
import 'antd-mobile/lib/tab-bar/style/css'
export default class RouterTabBar extends Component {
  renderContent = () => {
    return <div>123123</div>
  }
  render () {
    const {
      list,
      history: { config, selected, switchTab, tabBar }
    } = this.props
    console.log('render tabbar')
    // console.log(this)
    return (
      <TabBar {...config}>
        {list.map((it, i) => (
          <TabBar.Item
            icon={{
              uri: it.icon
            }}
            selectedIcon={{
              uri: it.selectedIcon
            }}
            title={it.title}
            key={i}
            selected={selected.path === it.path}
            onPress={() => {
              switchTab(it.path)
            }}
          >
            {tabBar[i].ele}
          </TabBar.Item>
        ))}
      </TabBar>
    )
  }
}
