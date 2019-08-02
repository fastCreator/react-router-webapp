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
    this._init()
  }
  _init () {
    let path = this.history.location.pathname
    if (this.tabBarMap[path]) {
      this._setSelected(path)
    } else {
      this.selected = this.tabBar[0]
      setTimeout(() => {
        this.history.replace(this.selected.path)
        this.history.push(path)
      }, 0)
    }
  }
  _listen = listen => {
    this.unlisten = this.history.listen((location, action) => {
      let path = location.pathname
      this._setSelected(path, action)
      this._setStack(path, action)
      this._onPop(path, action)
      listen(this.selected, location, action)
    })
  }
  _onPop = (path, action) => {
    if (action === 'POP') {
      let page = this.stack.find(it => it.regexp.exec(path))
      if (page) {
        let index = this.stack.indexOf(page)
        this.stack = this.stack.slice(0, index + 1)
      } else {
        this.stack = []
      }
    }
  }
  _setSelected = path => {
    let tabbar = this.tabBarMap[path]
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
  _setStack = (path, action) => {
    let page = this.pages.find(it => it.regexp.exec(path))
    if (page) {
      let obj = {}
      obj.ele = React.createElement(page.component, {
        history: this,
        ref: ele => {
          obj.ref = ele
        }
      })
      Object.assign(obj, page)
      if (action === 'PUSH') {
        this.stack.push(obj)
      } else if (action === 'REPLACE') {
        this.stack.splice(this.stack.length - 1, 1, obj)
      }
    } else if (this.tabBarMap[path]) {
      this.stack = []
    } else {
      console.error('404')
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
  navigateBack = (num = 1) => {
    if (num) {
      this.history.go(-num)
    }
  }
  switchTab = path => {
    let clearLen = this.stack.length
    clearLen && this.history.go(-clearLen)
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
