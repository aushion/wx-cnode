import Taro, { Component } from '@tarojs/taro'
import { View, Icon,Image,Button} from '@tarojs/components'
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
      userInfo: Taro.getStorageSync('userInfo')
    }
  }
  componentWillMount () {
   }

  componentDidMount () { 
   
  }
  componentDidShow () {
    // console.log('update')
    this.setState({
      userInfo: Taro.getStorageSync('userInfo')
    })
  }

  handleClick = () => {
    Taro.navigateTo({
      url:'../login/login'
    })
  }

  logout = () => {
    Taro.removeStorageSync('userInfo')
    Taro.showToast({
      title: '操作成功',
      icon: 'none'
    }).then(() => {
      this.setState({
        userInfo: {}
      })
    })
  }
 



  render () {
    const userInfo = this.state.userInfo
    return (
      <View className='user'>
        {userInfo.accessToken?
        <View>
          <Image src={userInfo.avatar_url} className="avatar" />
          <View>{userInfo.loginname}</View>
          <Button onClick={this.logout} type="primary" className="logout">注销</Button>
        </View>:
        <View>
          <Icon className='iconfont icon-user avatar' onClick={this.handleClick}></Icon>
          <View>点击头像登录</View>
        </View>
      }
        
      </View>
    )
  }
}

