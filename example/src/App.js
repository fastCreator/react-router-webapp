import React, { Component } from 'react'
import homePage from './pages/home'
import userPage from './pages/user'
import listPage from './pages/list'
import listList from './pages//list-list'
import Router from 'react-router-webapp'
const { Route, TabBar } = Router
const router = {
  mode: 'hash',
  tabBar: [
    {
      path: '/home',
      component: homePage
    },
    {
      path: '/user',
      component: userPage
    }
  ],
  pages: [
    {
      path: '/list',
      component: listPage
    },
    {
      path: '/list-list',
      component: listList
    }
  ]
}

const tabBar = {
  config: {
    tabBarPosition: 'bottom'
  },
  list: [
    {
      path: '/home',
      title: '首页',
      icon: require('./assert/images/home.png'),
      selectedIcon: require('./assert/images/home_select.png')
    },
    {
      path: '/user',
      title: '用户',
      icon: require('./assert/images/user.png'),
      selectedIcon: require('./assert/images/user_select.png')
    }
  ]
}
export default class App extends Component {
  render () {
    return (
      <div>
        <Route {...router}>
          <TabBar {...tabBar} />
        </Route>
      </div>
    )
  }
}
