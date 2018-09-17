import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Icon } from '@tarojs/components';
// import moment from 'moment'
import 'moment/locale/zh-cn';
import List from '../../components/List';
import Tab from '../../components/Tab';
import _Const from '../../static/_Const';
import './index.styl';

export default class Index extends Component {
	config = {
		navigationBarTitleText: '社区'
	};
	constructor() {
		super(...arguments);
		this.state = {
			tabs: _Const.tabs,
			current: 0
		};
	}
	componentWillMount() {}

	componentDidMount() {}

	handleTab = (index) => {
		this.setState({
			current: index
		});
	};

	handleChange = (e) => {
		let { tabs } = this.state;
		tabs.map((item, index) => {
			item.active = false;
			if (index === e.currentTarget.current) item.active = true;
		});
		this.setState({
			tabs: tabs,
			current: e.currentTarget.current
		});
	};

	handleClick = () => {
		const userInfo = Taro.getStorageSync('userInfo');
		if (userInfo.accessToken) {
			console.log('已经登录');
			Taro.navigateTo({
				url: '../post/index'
			});
		} else {
			Taro.showModal({
				title: '该操作需要登录，是否立即登录',
				success: (confirm) => {
					if (confirm) {
						Taro.navigateTo({
							url: '../login/login'
						});
					}
				}
			});
		}
	};
	render() {
		const { tabs, current } = this.state;
		return (
			<View className="index">
				{/* <View className='slideout'>
          <Icon className="iconfont icon-zhankai slide"> 浏览</Icon>
          
        </View> */}
				<View>
					<Tab tabs={tabs} onTabChange={this.handleTab} />
				</View>
				<View className="content">
					<Swiper
						className="swiper-wrap"
						current={current}
						onChange={this.handleChange}
						duration={500}
						circular="true"
					>
						<SwiperItem className="swiper-item">
							<List tab="all" />
						</SwiperItem>

						<SwiperItem className="swiper-item">
							<List tab="good" />
						</SwiperItem>

						<SwiperItem className="swiper-item">
							<List tab="share" />
						</SwiperItem>

						<SwiperItem className="swiper-item">
							<List tab="ask" />
						</SwiperItem>

						<SwiperItem className="swiper-item">
							<List tab="job" />
						</SwiperItem>
					</Swiper>
				</View>
				<Icon className="iconfont icon-edit4 post" onClick={this.handleClick} />
			</View>
		);
	}
}
