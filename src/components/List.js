import Taro, { Component } from '@tarojs/taro'
import {View,ScrollView,Image,Text} from '@tarojs/components'
import moment from 'moment'
import _Const from '../static/_Const'
import  './List.styl'

export default class List extends Component{
    constructor (props) {
        super(props)
        this.state = {
            tab: this.props.tab || 'other',
            dataList: [],
            page: 1,
        }
    }
    componentWillMount () {
     }

    componentDidMount () {
         Taro.showLoading({
                title: '加载中'
        })

        this.getTopics(this.state.tab,this.state.page)
    }
    getTopics = (tab,page) => {
        let {dataList} = this.state
        Taro.request({
        url: _Const.serverApi+'/topics',
        data: {
            page: page,
            tab: tab,
            limit: 20,
            // mdrender: false
        },
        header: {
            'content-type': 'application/json'
        },
        })
        .then(res => {
            dataList = dataList.concat(res.data.data)
            dataList = dataList.map((item) => {
                return {
                    id: item.id,
                    author: item.author,
                    tab: item.tab,
                    title: item.title,
                    create_at: item.create_at,
                    visit_count: item.visit_count,
                    reply_count: item.reply_count,
                    top:item.top,
                    good:item.good,
                    last_reply_at:moment(item.last_reply_at).fromNow(),
                    
                }
            })
            this.setState({
                dataList: dataList,
            })
        Taro.hideLoading()
    })
  }
    
    
    handleClick = (id) => {
        Taro.navigateTo({
            url: '/pages/detail/detail?id='+id
          })
    }

    onScrolltolower = () => {
        let {page,tab} = this.state;
        page = page + 1;
        this.setState({
            page: page
        },this.getTopics(tab,page))
    }

  render (){
      const { dataList } = this.state;
    return (
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style='height: 1100px;'
          lowerThreshold='10'
          upperThreshold='0'
          onScrolltoupper={this.onScrolltoupper}
          onScroll={this.onScroll}
          onScrolltolower={this.onScrolltolower}
        >
        {dataList.map(item => 
            <View key={item.id} className="listwrap" onClick={this.handleClick.bind(this,item.id)}>
                <View className="top">
                    <View className={(item.top || item.good)?'tag good':'tag'}>{(item.top)?'置顶':item.good?'精华':_Const.tab[item.tab]}</View>
                    <View className="count"><Text className='reply_count'>{item.reply_count}/</Text>{item.visit_count} · <Text>{item.last_reply_at}</Text></View>
                    
                </View>     
               
                <View className="list">
                    {item.title}            
                </View>   
                <View className="info"> 
                    <View className="author">
                        <Image src={item.author.avatar_url} className='avatar'  lazy-load="{{true}}" /> 
                        <Text className="name">{item.author.loginname}</Text>   
                    </View>
                    
                    <Text className="create_at">{moment(item.create_at).format('YYYY-MM-DD HH:mm:ss')}</Text>

                </View>
            </View>            
        )}
           
        </ScrollView>
    )
  }
}