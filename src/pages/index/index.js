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
      tabs: _Const.tabs,
      current: 0,
    }
  }
  componentWillMount () {
   }

  componentDidMount () { 
   
  }
  
 

  handleTab = (id,index) => {
    this.setState({
      current: index
    })

  }
  render () {
    const { tabs,current } = this.state;
    return (
      <View className='index'>
        <Tab tabs={tabs} onTabChange={this.handleTab} />

        <View className="content">
          <Swiper 
            className="swiper-wrap"
            current={current}
          >
            <SwiperItem className="swiper-item">
              <List tab='all' />            
            </SwiperItem>

            <SwiperItem className="swiper-item">
              <List tab='share' />            
            </SwiperItem>

            <SwiperItem className="swiper-item">
              <List tab='ask' />            
            </SwiperItem>

            <SwiperItem className="swiper-item">
              <List tab='job' />            
            </SwiperItem>
           
          </Swiper>
        </View>
      </View>
    )
  }
}

