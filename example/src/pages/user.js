import React, { Component } from 'react'
export default class User extends Component {
  onShow () {
    console.log('user-show')
  }
  render () {
    return (
      <div>
        user
        <input />
      </div>
    )
  }
}
