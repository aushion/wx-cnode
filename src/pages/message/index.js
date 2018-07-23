import Taro, { Component } from '@tarojs/taro'
import { View,Image,RichText } from '@tarojs/components'
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
    if(!this.state.userInfo){
      Taro.showModal({
        title: '该操作需要登录，是否立即登录',
        success: (confirm) => {
          if(confirm){
            Taro.navigateTo({
              url: '../login/login'
            })
          }
        }
      })
    }else{
      this.getMessages()     
    }
  }

  componentDidShow() {
    
  }
  
  getMessages = () => {
    const {userInfo} = this.state
    Taro.request({
      url: _Const.serverApi+'/messages',
      method: 'GET',
      data: {
        accesstoken: userInfo.accessToken,
        //mdrender:false,
      },
    }).then(res => {
      console.log(res.data.data)
      this.setState({
        has_read_messages: res.data.data.has_read_messages,
        hasnot_read_messages: res.data.data.hasnot_read_messages

      })
    })
  }
 
  handleClick = (id) => {
    Taro.navigateTo({
      url: '/pages/detail/detail?id='+id
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

                  <View className="content">
                    <RichText nodes={item.reply.content}></RichText>
                  </View>

                  <View className="topic" onClick={this.handleClick.bind(this,item.topic.id)} >
                    话题：{item.topic.title}
                  </View>
              </View>
          )
        })}
          
        </View>
        <View className="hasnot_read_messages">
        {hasnot_read_messages.map((item,index) => {
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

                  <View className="content">
                    <RichText nodes={item.reply.content}></RichText>
                    
                  </View>
                  <View className="topic" onClick={this.handleClick.bind(this,item.topic.id)} >
                    话题：{item.topic.title}
                  </View>
              </View>
          )
        })}
        </View>
      </View>
    )
  }
}

