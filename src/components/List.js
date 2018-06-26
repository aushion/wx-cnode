import Taro, { Component } from '@tarojs/taro'
import {View,ScrollView,Image} from '@tarojs/components'
import _Const from '../static/_Const'
import  './List.styl'

export default class List extends Component{
    constructor (props) {
        super(props)
        this.state = {
            tab: this.props.tab || 'other',
            dataList: [],
            page: 1
        }
    }
    componentWillMount () {
     }

    componentDidMount () {
         Taro.showLoading({
                title: '加载中'
        })

        this.getTopics(this.state.tab)
    }
    getTopics = (tab) => {
        let {page,dataList} = this.state
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
        },this.getTopics(tab))
    }
  render (){
      const { dataList } = this.state;
    return (
        <ScrollView
          className='scrollview'
          scrollY
          scrollWithAnimation
          scrollTop='0'
          style='height: 800px;'
          lowerThreshold='20'
          upperThreshold='20'
          onScrolltoupper={this.onScrolltoupper}
          onScroll={this.onScroll}
          onScrolltolower={this.onScrolltolower}
        >
        {dataList.map(item => 
            <View key={item.id} className="listwrap" onClick={this.handleClick.bind(this,item.id)}>
                <Image src={item.author.avatar_url} className='avatar' />                
                <View className="list">
                    {item.title}            
                </View>   
            </View>            
        )}
           
        </ScrollView>
    )
  }
}