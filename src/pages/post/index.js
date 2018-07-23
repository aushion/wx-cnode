import Taro, { Component } from '@tarojs/taro'
import { View, Radio,Form, RadioGroup, Label, Input, Textarea, Button} from '@tarojs/components'
import _Const from '../../static/_Const';
import './post.styl'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '发帖'
  }
  constructor () {
    super(...arguments)
    this.state = {
     tabs:  [
      {id: 'dev',title: '测试',active: true},
      {id: 'share',title: '分享',active: false},
      {id: 'ask',title: '问答',active: false},
      {id: 'job',title: '招聘',active: false},

    ],
    userInfo: Taro.getStorageSync('userInfo')
    }
  }
  componentWillMount () {
   }

  componentDidMount () { 
   
  }
  componentDidShow () {
    
  }

 

  
  handleSubmit = (e) => {
    const formData = e.target.value;
    const {userInfo} =this.state
    if(!formData.title){
      Taro.showToast('请填写标题')
      return
    }
    if(!formData.content){
      Taro.showToast('请填写内容')
      return
    }
    const postData = {...formData,accesstoken: userInfo.accessToken}

    Taro.request(
      {
        url: _Const.serverApi+'/topics',
        data: postData,
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },

      }
    ).then(res => {
      const data = res.data
      if(data.success){
        Taro.redirectTo({
          url: '/pages/detail/detail?id='+data.topic_id
        })
      }
    })
    
  }



  render () {
    
    return (
    <Form className='post' onSubmit={this.handleSubmit}>
        <View className='tabs'>
          <View className="label">选择发布到：</View>
            <RadioGroup className="radio-wrap" name='tab'>
            { this.state.tabs.map((item,i) => {
                return (
                  <Label for={i} key={i} className="radio-item">
                    <Radio value={item.id} checked={item.active}>{item.title}</Radio>
                </Label>
                )
              }
              )
            }
            </RadioGroup>
          </View>
        
        <View className='title' >
          <View className="label">标题：</View>
          <Input className="title-input" placeholder="请输入标题" type="text" name='title' />
        </View>
          
        <View className='content'>
          <View className='label'>内容：</View>
          <Textarea className='content-textarea' placeholder="请输入内容"  name='content' />
        </View>


        <Button formType='submit' type="primary" className="sendBtn">发送</Button>
    </Form>
    )
  }
}

