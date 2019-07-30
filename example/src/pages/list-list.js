import React, { Component } from 'react'
export default class List extends Component {
  onClick = () => {
    this.history.goHome()
  }
  render () {
    const { history } = this.props
    return (
      <div>
        <div
          onClick={() => {
            history.switchTab('/home')
          }}
        >
          list-list(go home)
        </div>
        <input />
      </div>
    )
  }
}
