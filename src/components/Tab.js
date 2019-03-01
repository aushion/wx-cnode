import Taro, { Component } from '@tarojs/taro'
import {View} from '@tarojs/components'
import './Tab.styl'

export default class Tab extends Component{
    constructor (props) {
        super(props)
        this.state = {
          tabs: this.props.tabs,
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
      this.props.onTabChange(i)
    }
  render (){
    const tabs = this.props.tabs;
    return (
        <View className='flex-wrp' style='flex-direction:row;'>
          {tabs.map((item,index) => {
            console.log(item.active)
            return <View key={item.id} className={item.active?'flex-item active':'flex-item'} onClick={this.handleClick.bind(this,index)}>{item.title}</View>
          })}
        </View>

    )
  }
}