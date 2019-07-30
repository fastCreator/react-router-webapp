import React, { Component } from 'react'
// import history from 'react-router-webapp'
export default class Home extends Component {
  render () {
    const { stack } = this.props
    return (
      <div
        className='router-pages'
        style={{ display: stack.length ? null : 'none' }}
      >
        {stack.map((it, i) => (
          <div key={i} className='router-page'>
            {it.ele}
          </div>
        ))}
      </div>
    )
  }
}
