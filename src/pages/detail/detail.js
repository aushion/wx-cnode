import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import List from '../../components/List'
import Tab from '../../components/Tab'
import _Const from '../../static/_Const'
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
      header: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      console.log(res.data)
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
    return (
      <View className='index'>
      
        {!this.state.loading?<View className="markdown-body">
          {data.content}
        </View>:null}
      </View>
    )
  }
}

