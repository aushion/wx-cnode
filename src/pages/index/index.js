import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import List from '../../components/List'
import Tab from '../../components/Tab'
import _Const from '../../static/_Const'
import './index.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: 'Cnode'
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
  render () {
    const { tabs,current } = this.state;
    return (
      <View className='index'>
        <Tab tabs={tabs} onTabChange={this.handleTab} />

        <View className="content">
          <Swiper 
            className="swiper-wrap"
            current={current}
            onChange={this.handleChange}
            duration={500}
            circular='true'

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

