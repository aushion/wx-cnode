import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import _Const from '../../static/_Const'
import WxParse from '../../components/wxParse/wxParse'
import '../../static/wxParse.css'
import './index.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }
  constructor () {
    super(...arguments)
   
    this.state = {
      data: null,
      loading: true

    }
  }
  componentWillMount () { 
    console.log(this.$router.params)
  }

  componentDidMount () { 
    Taro.showLoading({
      title: '加载中'
    })
    this.getTopicsDeail(this.$router.params.id)
  }
  getTopicsDeail = (id) => {
    Taro.request({
      url: _Const.serverApi+'/topic/'+id,   
      data: {
        mdrender: false
      },
      header: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      this.setState({
        data: res.data.data,
        loading: false
      })
      Taro.hideLoading()
  })
  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }



  
  render () {
    const { data } = this.state
    const that = this;
    const content = data?data.content:'<div>无<div>'
    return (
      <View className='index'>
        {this.state.data?<View className="markdown-body">
        {/* {data.content} */}
        {WxParse.wxParse('article','md',content,that,5)}
        </View>:null}
      </View>
    )
  }
}

