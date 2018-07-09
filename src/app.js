import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.styl'

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/detail/detail',
      'pages/message/index',
      'pages/user/index',
      'pages/login/login',
      'pages/post/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#474546',
      navigationBarTitleText: 'wechat',
      navigationBarTextStyle: 'light'
    },
    tabBar: {
      color: '#474546',
      selectedColor: '#80bd01',
      list: [
        {
        pagePath: "pages/index/index",
        text: "社区",
        iconPath: "static/img/forum.png",
        selectedIconPath: "static/img/forum_active.png"
      }, 
      {
        pagePath: "pages/message/index",
        text: "消息",
        iconPath: "static/img/message.png",
        selectedIconPath: "static/img/message_active.png"
      },
      {
        pagePath: "pages/user/index",
        text: "我的",
        iconPath: "static/img/user.png",
        selectedIconPath: "static/img/user_active.png"
      }
      
    ]
    },
  }


  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
