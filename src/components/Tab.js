import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'
import './Tab.styl'

export default class Tab extends Component{
    constructor () {
        super(...arguments)
        this.state = {
          tabs: this.props.tabs,
          onTabChange: this.props.onTabChange,
        }

    }
    componentWillMount () { }

    componentDidMount () { 
        
    }

    componentWillUnmount () { }

    componentDidShow () { }

    componentDidHide () { }

    handleClick = (i) => {
      let tabs = this.state.tabs;
      tabs.map((item,index) => {
        item.active = false;       
        if(index === i) item.active = true;
      })
      this.setState({
        tabs: tabs
      })
      this.state.onTabChange(i)
    }
  render (){
    return (
        <View className='flex-wrp' style='flex-direction:row;'>
          {this.state.tabs.map((item,index) => {
            return <View key={item.id} className={item.active?'flex-item active':'flex-item'} onClick={this.handleClick.bind(this,index)}>{item.title}</View>
          })}
        </View>

    )
  }
}