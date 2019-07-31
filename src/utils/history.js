import {
  createBrowserHistory,
  createMemoryHistory,
  createHashHistory
} from 'history'
import pathToRegexp from 'path-to-regexp'
import React from 'react'
const createHistoryMap = {
  browser: createBrowserHistory,
  memory: createMemoryHistory,
  hash: createHashHistory
}

export default class History {
  constructor (mode, createHistoryOptions, listen, tabBar, pages) {
    this.stack = []
    this.tabBar = arrRegexpPath(tabBar)
    this.tabBarMap = arr2map(this.tabBar, 'path')
    this._inittabBarRenderContent()
    this.pages = arrRegexpPath(pages)
    this.history = createHistoryMap[mode](createHistoryOptions)
    this._listen(listen)
    this._setSelected(this.history.location)
    this._setStack(this.history.location, 'PUSH')
    if (!this.selected) {
      this.selected = this.tabBar[0]
    }
    // this.history.replace(
    //   this.history.pathname + this.history.search + this.history.hash
    // )
  }
  _listen = listen => {
    this.unlisten = this.history.listen((location, action) => {
      if (!this._stop) {
        this._setSelected(location, action)
        this._setStack(location, action)
        this._onPop(location, action)
        listen(this.selected, location, action)
      }
      this._stop = false
      console.log(action, location, this.history)
    })
  }
  _onPop = (location, action) => {
    if (action === 'POP') {
      // stack-page
      console.log(this.tabBarMap, location.pathname)
      if (
        this.tabBarMap[location.pathname] ||
        (this.stack.length - 1 > 0 &&
          this.stack[this.stack.length - 2].path === location.pathname)
      ) {
        // back
        console.log('后退')
        this.stack.splice(this.stack.length - 1, 1)
        if (this.stack.length) {
          let showRef = this.stack[this.stack.length - 1].ref.onShow
          showRef && showRef()
        }
      } else {
        // forword
        this._stop = true
        this.history.goBack()

        console.log('前进')
      }
    }
  }
  _setSelected = location => {
    let tabbar = this.tabBar.find(it => it.regexp.exec(location.pathname))
    if (tabbar) {
      if (this.selected) {
        let selected = this.selected
        setTimeout(() => {
          let hideRef = selected.ref.onHide
          hideRef && hideRef()
        }, 0)
      }
      this.selected = tabbar
      setTimeout(() => {
        let showRef = this.selected.ref.onShow
        showRef && showRef()
      }, 0)
    }
  }
  _setStack = (location, action) => {
    let page = this.pages.find(it => it.regexp.exec(location.pathname))
    if (page) {
      let obj = {}
      obj.ele = React.createElement(page.component, {
        history: this,
        ref: ele => {
          obj.ref = ele
        }
      })
      obj.path = location.pathname
      if (action === 'PUSH') {
        this.stack.push(obj)
      } else if (action === 'REPLACE') {
        this.stack.splice(this.stack.length - 1, 1, obj)
      }
    }
  }
  _inittabBarRenderContent = tabBar => {
    this.tabBar.forEach(it => {
      it.ele = React.createElement(it.component, {
        history: this,
        ref: ele => {
          it.ref = ele
        }
      })
    })
  }
  navigateBack = num => {
    if (num) {
      this.history.go(-num)
      this.stack.splice(this.stack.length - num, num)
    }
  }
  switchTab = path => {
    this.navigateBack(this.stack.length)
    this.history.replace(path)
  }
  redirectTo = path => {
    this.history.replace(path)
  }
  navigateTo = path => {
    this.history.push(path)
  }
  destory = () => {
    this.unlisten()
  }
}

function arrRegexpPath (arr) {
  return arr.map(it => ({
    ...it,
    regexp: pathToRegexp(it.path)
  }))
}

function arr2map (arr, key) {
  let obj = {}
  arr.forEach(it => {
    obj[it[key]] = it
  })
  return obj
}
