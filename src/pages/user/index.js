import Taro, { Component } from '@tarojs/taro'
import { View, Icon } from '@tarojs/components'
// import moment from 'moment'
import 'moment/locale/zh-cn';
import './user.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '我的'
  }
  constructor () {
    super(...arguments)
    this.state = {
     
    }
  }
  componentWillMount () {
   }

  componentDidMount () { 
   
  }
  
 



  render () {
    return (
      <View className='user'>
        <Icon className='iconfont icon-user avatar'></Icon>
      </View>
    )
  }
}

