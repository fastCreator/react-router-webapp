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
