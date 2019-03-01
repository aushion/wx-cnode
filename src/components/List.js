import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView, Image, Text } from '@tarojs/components';
import moment from 'moment';
import _Const from '../static/_Const';
import './List.styl';

export default class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
            hidden: true,
            loadingData: false,
			tab: this.props.tab || 'other',
			dataList: [],
			page: 1
		};
	}
	componentWillMount() {}

	componentDidMount() {
		Taro.showLoading({
			title: '加载中'
		});

		this.getTopics(this.state.tab, this.state.page);
	}
	getTopics = (tab, page) => {
		Taro.request({
			url: _Const.serverApi + '/topics',
			data: {
                page: page,
				tab: tab,
				limit: 20
				// mdrender: false
			},
			header: {
				'content-type': 'application/json'
			}
		}).then((res) => {
			let { dataList } = this.state;
			let arr = res.data.data;
			arr = arr.map((item) => {
				return {
					id: item.id,
					author: item.author,
					tab: item.tab,
					title: item.title,
					create_at: item.create_at,
					visit_count: item.visit_count,
					reply_count: item.reply_count,
					top: item.top,
					good: item.good,
					last_reply_at: moment(item.last_reply_at).fromNow()
				};
			});
			dataList = dataList.concat(arr);
			this.setState({
                dataList: dataList,
                hidden: true,
                loadingData: false,
			});
			Taro.hideLoading();
		});
	};

	handleClick = (id) => {
		Taro.navigateTo({
			url: '/pages/detail/detail?id=' + id
		});
	};

	onScrolltoupper = () => {
        let { tab } = this.state;
        Taro.showLoading()
		this.setState(
			{
                page: 1,
                dataList: []             
			},
			this.getTopics(tab, 1)
		);
	};

	onScrolltolower = (e) => {
        let { page, tab, hidden, loadingData } = this.state;
        if( hidden ) {
            this.setState({
                hidden: false
            })
        };
        if(loadingData){
            return;
        }
        this.setState({
            loadingData: true
        })
		page = page + 1;
		this.setState(
			{
                page: page,
			},
			this.getTopics(tab, page)
		);
	};

	render() {
		const { dataList, hidden } = this.state;
		return (
			<ScrollView
				className="scrollview"
				scrollY={true}
				scrollWithAnimation
				scrollTop="0"
				lowerThreshold="30"
				upperThreshold="0"
				onScrolltoupper={this.onScrolltoupper}
				// onScroll={this.onScroll}
				onScrolltolower={this.onScrolltolower}
			>
				{dataList.map((item) => (
					<View key={item.id} className="listwrap" onClick={this.handleClick.bind(this, item.id)}>
						<View className="top">
							<View className={item.top || item.good ? 'tag good' : 'tag'}>
								{item.top ? '置顶' : item.good ? '精华' : _Const.tab[item.tab]}
							</View>
							<View className="count">
								<Text className="reply_count">{item.reply_count}/</Text>
								{item.visit_count} · <Text>{item.last_reply_at}</Text>
							</View>
						</View>

						<View className="list">{item.title}</View>
						<View className="info">
							<View className="author">
								<Image src={item.author.avatar_url} className="avatar" lazy-load="{{true}}" />
								<Text className="name">{item.author.loginname}</Text>
							</View>

							<Text className="create_at">{moment(item.create_at).format('YYYY-MM-DD HH:mm:ss')}</Text>
						</View>
					</View>
                ))}
                
                <View class="data-loading" hidden={hidden}>
                    数据加载中...
                </View>
			</ScrollView>
		);
	}
}
