import Taro, { Component } from '@tarojs/taro'
import { View,RichText,Image,Text,Icon,Textarea} from '@tarojs/components'
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
      userInfo: Taro.getStorageSync('userInfo'),
      id: this.$router.params.id,
      data: null,
      loading: true,
      content: null,
      replies: [],
      display: false,
      collection: false

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
        replies: data.replies,
        collection: data.is_collect
      })
      Taro.hideLoading()
  })
  }
  componentWillUnmount () {
    this.setState({
      data: null,
      loading: true,
      content: null,
      replies: [],
      sendMsg: ''
    })
   }

  componentDidShow () { }

  componentDidHide () {
    
   }
  handleInput = (e) => {
    this.setState({
      sendMsg: e.target.value
    })
  } 

  response = () => {
    this.setState({
      display: true
    })
  } 
  hideModal = () => {
    this.setState({
      display: false
    })
  }

  sendMsg = () => {
    const {sendMsg} = this.state;
    const userInfo = Taro.getStorageSync('userInfo');
    const postdata = {
      accesstoken: userInfo.accessToken,
      content: sendMsg
    }
    Taro.request({
      url: _Const.serverApi+'/topic/'+this.$router.params.id+'/replies',
      data: postdata,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
    }).then(res => {
      if(res.data.success){
        this.setState({
          display: false
        },this.getTopicsDeail(this.$router.params.id))
      }
    })
  }

  collection = () => {
   const {id,userInfo,collection} = this.state;
   const url = collection?'/topic_collect/de_collect':'/topic_collect/collect'
    Taro.request({
      url: _Const.serverApi+url,
      method: 'POST',
      data: {
        accesstoken: userInfo.accessToken,
        topic_id: id
      },
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      if(res.data.success){
        this.setState({
          collection: true
        })
      }
    })
  }

  render () {
    const { data,replies,content,create_at,visit_count,display,collection} = this.state
    return (
      <View className='index'>
        {!this.state.loading?
        <View className="main">

          <View className="title">{data.title}</View>
          <View className="tips">
            <View className="tab">{create_at}  阅读{visit_count}  来自于{_Const.tab[data.tab]}</View>            
            <Icon className={collection?'iconfont icon-shoucang collection tab green':'iconfont icon-shoucang collection tab'} onClick={this.collection} />
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
        <Icon className="iconfont icon-huifu1 response" onClick={this.response}></Icon>
        <View className={display?'modal':'modal hide'} onClick={this.hideModal}>
        </View>
        <View className={display?'test':'response-wrapper'}>
          <View className="top">  
            <Text>请输入回复内容：</Text> 
            <Icon className="iconfont icon-icon_sent sent" onClick={this.sendMsg} />
            </View>
          <Textarea className="content" placeholder="说点什么吧..."  cursorSpacing={120}   fixed showConfirmBar={false} onInput={this.handleInput} />
        </View>
      </View>
    )
  }
}

