import Taro, { Component } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
import moment from 'moment'
import 'moment/locale/zh-cn';
import _Const from '../../static/_Const'
import './index.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '消息'
  }
  constructor () {
    super(...arguments)
    this.state = {
      userInfo: Taro.getStorageSync('userInfo')||null,
      has_read_messages: [],
      hasnot_read_messages: []
    }
  }
  componentWillMount () {
   }

  componentDidMount () { 
   this.getMessages()
  }
  
  getMessages = () => {
    const {userInfo} = this.state
    Taro.request({
      url: _Const.serverApi+'/messages',
      method: 'GET',
      data: {
        accesstoken: userInfo.accessToken,
        mdrender:false,
      },
    }).then(res => {
      console.log(res.data.data)
      this.setState({
        has_read_messages: res.data.data.has_read_messages,
        hasnot_read_messages: res.data.data.hasnot_read_messages

      })
    })
  }
 



  render () {
    const {has_read_messages,hasnot_read_messages} = this.state;
    return (
      <View className='message'>
        <View className="has_read_messages">
        {has_read_messages.map((item,index) => {
          return (
              <View className="wrapper" key={index} >
                  <View className="replyer">
                    <Image className="avatar" src={item.author.avatar_url} />
                    <View className="name-wrapper">
                      <View className="name">{item.author.loginname}</View>
                      <View>回复了你的话题</View>
                    </View>

                    <View className="time">{moment(item.create_at).fromNow()}</View>
                  </View>

                  <View className="content"></View>

                  <View className="topic"></View>
              </View>
          )
        })}
          
        </View>
        <View className="hasnot_read_messages">
          <View className="wrapper">
            <View className="replyer">
              <Image className="avatar" />
              <View className="name-wrapper">
                <View className="name">aushion</View>
                <View>回复了你的话题</View>
              </View>

              <View className="time"></View>
            </View>

            <View className="content"></View>

            <View className="topic"></View>
          </View>
        </View>
      </View>
    )
  }
}

