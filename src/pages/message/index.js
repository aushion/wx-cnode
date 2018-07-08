import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import 'moment/locale/zh-cn';
import './index.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '消息'
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
      <View className='index'>
       
      消息
        
      </View>
    )
  }
}

