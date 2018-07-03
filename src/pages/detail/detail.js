import Taro, { Component } from '@tarojs/taro'
import { View,RichText,Image,Text} from '@tarojs/components'
import _Const from '../../static/_Const'
import moment from 'moment'
import './detail.styl'


export default class Index extends Component {
  config = {
    navigationBarTitleText: 'Cnode'
  }
  constructor () {
    super(...arguments)
   
    this.state = {
      data: null,
      loading: true,
      content: null,
      replies: []

    }
  }
  componentWillMount () { 
    //console.log(this.$router.params)
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
        mdrender: true
      },
      header: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      let data = res.data.data
      //正则表达式处理图片过大的问题
      let content = data.content.replace(/\<img/gi, '<img style="width:100%;height:auto" ')
      this.setState({
        data: data,
        loading: false,
        content: content,
        replies: res.data.data.replies
      })
      Taro.hideLoading()
  })
  }
  componentWillUnmount () {
    this.setState({
      data: null,
      loading: true,
      content: null,
      replies: []
    })
   }

  componentDidShow () { }

  componentDidHide () {
    
   }



  
  render () {
    const { data,replies,content } = this.state
    return (
      <View className='index'>
        {!this.state.loading?
        <View className="main">

          <View className="title">{data.title}</View>

          <View className="content">
              <RichText nodes={content}></RichText>  
            </View>
          
          <View className="comments">
            <View className="tag">评论</View>
            {replies.map((item,index) => {
            return (<View key={index} className="list">
                      <View className='author'>
                        <Image src={item.author.avatar_url} className='avatar' />
                        <Text className='name'>{item.author.loginname}·{index+1}楼·{moment(item.create_at).locale('zh-cn').fromNow()}
                        
                        </Text>
                        </View>
                      <View className='content'>
                        <RichText nodes={item.content.replace(/\<img/gi, '<img style="width:100%;height:auto" ')} ></RichText>          
                        
                      </View>  
              
                  </View>)
            })}          
          </View>
          
        </View>:null}
      </View>
    )
  }
}

