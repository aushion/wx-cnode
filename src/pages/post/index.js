import Taro, { Component } from '@tarojs/taro'
import { View, } from '@tarojs/components'
// import moment from 'moment'
import 'moment/locale/zh-cn';
import './user.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '发帖'
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
  componentDidShow () {
    
  }

 

  
 



  render () {
    return (
      <View className='user'>
       发帖
        
      </View>
    )
  }
}

