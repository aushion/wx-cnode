import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.styl'

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/detail/detail'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#474546',
      navigationBarTitleText: 'wechat',
      navigationBarTextStyle: 'light'
    }
  }


  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
