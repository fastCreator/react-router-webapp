import React, { Component } from 'react'
import Ppages from './pages'
import History from '../utils/history'
export default class Router extends Component {
  static defaultProps = {
    mode: 'hash'
  }
  constructor (props) {
    super(props)
    this.state = {
      Component: 'div'
    }
  }

  componentWillMount () {
    const { mode, createHistoryOptions, tabBar, pages } = this.props
    this.history = new History(
      mode,
      createHistoryOptions,
      this.listenHistory,
      tabBar,
      pages
    )
  }
  componentWillUnmount () {
    this.history.destory()
  }
  listenHistory = (location, action) => {
    // console.log(action, location.pathname, location.state)
    this.forceUpdate()
  }
  render () {
    const { history } = this
    console.log('render route')
    // console.log(this)
    // const { Component } = this.state
    const child = React.Children.only(this.props.children)
    const childrenWithProps = React.cloneElement(child, {
      history
    })
    return (
      <div className='router-webapp'>
        <Ppages {...history} />
        <div
          className='router-tabBar'
          style={{ display: history.stack.length ? 'none' : null }}
        >
          {childrenWithProps}
        </div>
      </div>
    )
  }
}
