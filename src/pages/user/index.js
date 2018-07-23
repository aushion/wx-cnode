import Taro, { Component } from '@tarojs/taro'
import { View, Icon,Image, Swiper, SwiperItem} from '@tarojs/components'
import moment from 'moment'
import Tab from '../../components/Tab'
import _Const from '../../static/_Const'
import './user.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '我的'
  }
  constructor () {
    super(...arguments)
    this.state = {
      userInfo: Taro.getStorageSync('userInfo'),
      current: 0,
      tabs:  [
        {id: 'recent_reply',title: '最近回复',active: true},
        {id: 'recent_publish',title: '最近发布',active: false},
        {id: 'recent_reply',title: '最近收藏',active: false},      
      ],
      recent_replies:[],
      recent_topics:[],
      collections:[]
    }
  }
  componentWillMount () {
   }

  componentDidMount () { 
   
  }
  componentDidShow () {
   const userInfo = Taro.getStorageSync('userInfo')
   userInfo.loginname && this.setState({
      userInfo: userInfo
    },() => {
      this.getUser();
      this.getCollections();
    })

  


  }

  getUser = () => {
    const {loginname} = this.state.userInfo
    Taro.request({
      url: _Const.serverApi+'/user/'+loginname,
      method: 'GET'
    }).then(res => {
      this.setState({
        recent_replies: res.data.data.recent_replies,
        recent_topics: res.data.data.recent_topics
      })
        
    })
  }

  getCollections = () => {
    const {loginname} = this.state.userInfo
    Taro.request({
      url: _Const.serverApi+'/topic_collect/'+loginname,
      method: 'GET'
    }).then(res => {
      this.setState({
        collections: res.data.data
      })
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
 
  handleTab = (index) => {
    this.setState({
      current: index
    })
  }

  handleChange = (e) => {
    let {tabs} = this.state;
    tabs.map((item,index) => {
      item.active = false;
      if(index === e.currentTarget.current) item.active = true
    })
    this.setState({
      tabs: tabs,
      current: e.currentTarget.current
    })
  }


  goDetail = (id) => {
    Taro.navigateTo({
      url: '/pages/detail/detail?id='+id
    })
  }
  render () {
    const {userInfo,current,tabs,recent_replies,recent_topics,collections} = this.state;

    return (
      <View className='user'>
        {userInfo.accessToken?
        <View>
          <Image src={userInfo.avatar_url} className="avatar" />
          <View className="name">{userInfo.loginname}</View>
          <Icon onClick={this.logout}  className="iconfont icon-icon logout" >注销</Icon>
          <View className="tabs">
            <Tab tabs={tabs} onTabChange={this.handleTab} />         
          </View>

          <View className="content">
          <Swiper 
            className="swiper-wrap"
            current={current}
            onChange={this.handleChange}
            duration={500}
            circular='true'
          >
            <SwiperItem className="swiper-item">
                  <View>
                    {recent_replies.map((item,index) =>{
                      return(
                        <View key={index} className="item-wrapper" onClick={this.goDetail.bind(this,item.id)}>
                          <Image src={item.author.avatar_url} className="avatar" />
                          <View className="right">
                            <View className="title">{item.title}</View>
                            <View className="bottom">
                              <View className="loginname">{item.author.loginname}</View>
                              <View className="time">{moment(item.last_reply_at).fromNow()}</View>
                            </View>
                          </View>
                        </View>
                      )
                    } )}
                  </View>
            </SwiperItem>

             <SwiperItem className="swiper-item">
             <View>
                    {recent_topics.map((item,index) =>{
                      return(
                        <View key={index} className="item-wrapper" onClick={this.goDetail.bind(this,item.id)}>
                          <Image src={item.author.avatar_url} className="avatar" />
                          <View className="right">
                            <View className="title">{item.title}</View>
                            <View className="bottom">
                              <View className="loginname">{item.author.loginname}</View>
                              <View className="time">{moment(item.last_reply_at).fromNow()}</View>
                            </View>
                          </View>
                        </View>
                      )
                    } )}
                  </View>
            </SwiperItem>

            <SwiperItem className="swiper-item">
            <View>
                    {collections.map((item,index) =>{
                      return(
                        <View key={index} className="item-wrapper" onClick={this.goDetail.bind(this,item.id)}>
                          <Image src={item.author.avatar_url} className="avatar" />
                          <View className="right">
                            <View className="title">{item.title}</View>
                            <View className="bottom">
                              <View className="loginname">{item.author.loginname}</View>
                              <View className="time">{moment(item.last_reply_at).fromNow()}</View>
                            </View>
                          </View>
                        </View>
                      )
                    } )}
                  </View>
            </SwiperItem>

          </Swiper>
          </View>
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

