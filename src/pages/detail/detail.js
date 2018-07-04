import Taro, { Component } from '@tarojs/taro'
import { View,RichText,Image,Text} from '@tarojs/components'
import moment from 'moment'
import _Const from '../../static/_Const'
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
        visit_count: data.visit_count,
        create_at: moment(data.create_at).fromNow(),
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
    const { data,replies,content,create_at,visit_count } = this.state
    return (
      <View className='index'>
        {!this.state.loading?
        <View className="main">

          <View className="title">{data.title}</View>
          <View className="tips">
            <View>{create_at}  阅读{visit_count}  来自于{_Const.tab[data.tab]}</View>
          </View>
          <View className="content">
              <View className="landlord">
                <Image src={data.author.avatar_url} className="avatar"></Image>
                <Text className="name">{data.author.loginname}</Text>
              </View>
              <RichText nodes={content}></RichText>  
            </View>
          
          <View className="comments">
            <View className="tag">{replies.length}回复</View>
            {replies.map((item,index) => {
            return (<View key={index} className="list">
                      <View className='author'>
                        <Image src={item.author.avatar_url} className='avatar' />
                        <Text className='name'>{item.author.loginname}·{index+1}楼·{moment(item.create_at).fromNow()}
                        
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

