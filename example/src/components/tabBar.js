import React, { Component } from 'react'
// import history from 'react-router-webapp'
export default class Home extends Component {
  render () {
    return (
      <div
        onClick={() => {
          // history.push('/list')
        }}
      >
        home
      </div>
    )
  }
}
