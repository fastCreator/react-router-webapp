import React, { Component } from 'react'
// import history from 'react-router-webapp'
export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      a: 1
    }
  }
  componentWillMount () {}
  onHide = () => {
    console.log('home_hide')
  }
  onShow = () => {
    console.log('home_show')
  }
  render () {
    const { history } = this.props
    return (
      <div>
        <div
          onClick={() => {
            history.navigateTo('/list')
          }}
        >
          home(navigateTo(list))
        </div>
        <input />
      </div>
    )
  }
}
