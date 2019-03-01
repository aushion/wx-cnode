import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button,Icon } from '@tarojs/components'
import _Const from '../../static/_Const'
import './login.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  constructor () {
    super(...arguments)
    this.state = {
      accessToken: ''
    }
  }
  componentWillMount () {
   }

  componentDidMount () { 
   
  }
  
  handleChange = (e) => {
    this.setState({
      accessToken: e.detail.value
    })
  }

  showTip = () => {
    Taro.showModal({
      content: '在CNode社区网站端登录你的账户，然后在右上角找到【设置】按钮，点击进入后在页面底部找到你的Access Token',
      showCancel: false,
    })
  }

  login = (current) => {
    const {accessToken} = this.state;
    const a = accessToken?accessToken:current
    if(a){
      Taro.request(
        {
          url: _Const.serverApi+'/accesstoken',
          data: {
              accesstoken: a
          },
          method: 'POST',
          header: {
              'content-type': 'application/json'
          },
          }
      ).then(res => {
        const data = res.data;
        if(data.success){
          Taro.showToast({
            icon: 'success',
            title: '登录成功',
            
          }).then( () => {
            const userInfo = {
              loginname: data.loginname,
              id: data.id,
              avatar_url: data.avatar_url,
              accessToken: a
            }
            Taro.setStorageSync('userInfo',userInfo);
            Taro.navigateBack({
              delta: 1
            })
          })
        }else{
          Taro.showToast({
            title: data.error_msg,
            icon: 'none'
          })
        }
    }) 
  }else{
    Taro.showToast({
      title: '请填写AccessToken后再登录',
      icon: 'none'
    })
  }
  }

  handleQr = () => {
    Taro.scanCode({
      success: (res) => {
        this.setState({
          accessToken: res.result
        },this.login(res.result))
      }
    })
  }

  render () {
    return (
      <View className='login'>
         <View className="top"></View>

         <View className="form">
              <View className="token">
                <Input placeholder='Access Token:' onChange={this.handleChange} defaultValue={this.state.accessToken} />
                
              </View>
              <Button className="btn-login" onClick={this.login}>登录</Button>

              <View className='btn-wrapper'>
                <View className="qrcode" onClick={this.handleQr}><Icon className="iconfont icon-saoma"></Icon>扫码登录</View>
                <View className="github"><Icon className="iconfont icon-github"></Icon>GitHub登录</View>
              </View>
        </View>

        <View className="tip" onClick={this.showTip}>如何获取Access Token？</View>
      </View>
    )
  }
}

