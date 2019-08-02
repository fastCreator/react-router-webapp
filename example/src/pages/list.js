import React, { Component } from 'react'
export default class List extends Component {
  onClick = () => {
    this.history.goHome()
  }
  onShow = () => {
    // console.log('list-show')
  }
  onHide = () => {
    // console.log('list-hide')
  }
  render () {
    const { history } = this.props
    return (
      <div>
        <div
          onClick={() => {
            history.navigateTo('/list-list')
          }}
        >
          list(go list-list)
        </div>
        <input />
      </div>
    )
  }
}
