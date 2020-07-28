<template>
	<view class="video-player">
		<cu-custom class="nav-bar" :isBack="true" backText="返回" :content="detail.name" bgColor="bg-gradual-orange shadow-blur"></cu-custom>
		<view class="video-box">
			<video :src="url" controls class="video"></video>
			<view class="video-nav">
				<view :class="{ activeNav: curNav }" class="item" @click="curNav = true">详情</view>
				<view :class="{ activeNav: !curNav }" class="item" @click="curNav = false">评论({{ commentNum }})</view>
			</view>
		</view>

		<scroll-view scroll-y="true" :style="{ height: scrollH  + 'rpx' }" class="scroll-box">
			<view class="center">
				<view v-if="curNav">
					<view class="title">{{ detail.name }}</view>
					<view class="art">
						——
						<text class="name">{{ detail.artistName }}</text>
						<text>{{ detail.publishTime }}</text>
					</view>
					<view class="desc">{{ getDesc }}</view>
					<image :src="detail.cover" mode="aspectFit"></image>
				</view>
				<view class="content" v-else>
					<view class="item" v-for="(item, index) in commentList" :key="index">
						<view class="img-box left-box"><image :src="item.picUrl" mode=""></image></view>
						<view class="right-box">
							<view class="user-title">
								<text class="name">{{ item.name }}</text>
								<text>{{ item.time }}</text>
							</view>
							<view class="content-title">
								<text class="con-title">{{ item.content }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { apiMv, apiMvDetail, apiMvComment } from '@/apis/player.js';
export default {
	data() {
		return {
			id: '',
			url: '',
			detail: '',
			isfirstplay: true,
			isplaying: false,
			isShowCover: true,
			curNav: true,
			videoContext: null,
			DeviceHight: this.DeviceHight,
			scrollH: 630,
			commentList: []
		};
	},
	computed: {
		commentNum() {
			return this.detail.commentCount;
		},
		getDesc() {
			return this.detail.desc ? this.detail.desc : '无~';
		}
	},
	onLoad(param) {
		this.id = param.id;
		this.initMv();
		this.apiMvComment();
	},
	methods: {
		async initMv() {
			const id = this.id;
			const [mvr, mvd] = await Promise.all([
				apiMv({
					id
				}).then(res => {
					return {
						url: res.data.url
					};
				}),
				apiMvDetail({
					mvid: id
				}).then(res => {
					return res.data;
				})
			]);
			this.url = mvr.url;
			this.detail = mvd;
			console.log(this.url);
			console.log(this.detail);
		},
		apiMvComment() {
			apiMvComment({ id: this.id, limit: 500 }).then(res => {
				const arr = res.hotComments.concat(res.comments);
				const lists = [];
				arr.forEach((val, index) => {
					if (!val.parentCommentId) {
						lists.push({
							name: val.user.nickname,
							picUrl: val.user.avatarUrl,
							content: val.content,
							time: this.$util.formatDate(val.time)
						});
					}
				});
				this.commentList = lists;
				console.log(this.commentList);
			});
		}
	}
};
</script>

<style scoped>
.video {
	width: 750rpx;
}
.video-nav {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	border-bottom: 1px solid #f0f0f0;
	box-shadow: 0 2px 3px #f0f0f0;
}
.item {
	position: relative;
	flex: 1;
	text-align: center;
	font-size: 35rpx;
	padding: 10rpx 0;
}
.activeNav::after {
	content: '';
	display: inline-block;
	position: absolute;
	background-color: #39b54a;
	height: 2px;
	width: 70rpx;
	bottom: 0;
	left: 50%;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
}
.center {
	font-size: 35rpx;
	padding: 50rpx 15rpx;
	padding-bottom: 0;
	text-align: center;
}
.art {
	font-size: 28rpx;
	text-align: right;
	color: #6b6b6b;
	margin: 10rpx 0;
}
.name {
	padding: 0 15rpx;
}
.desc {
	text-align: left;
	text-indent: 60rpx;
	font-size: 30rpx;
}
.activeNav {
	color: #39b54a;
}
.content {
	text-align: left;
}
.content .item {
	display: block;
	text-align: left;
	font-size: 20rpx;
	margin: 10rpx 0;
	height: 150rpx;
}
.user-title {
	padding: 10rpx 0;
	padding-top: 0;
	color: #007aff;
}
.img-box {
	/* background-color: #007AFF; */
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 10rpx;
}
.img-box image {
	width: 100%;
	height: 100%;
}

.left-box {
	float: left;
}
.left-box::before {
	content: '';
	clear: both;
}
.con-title {
	font-size: 28rpx;
	margin-left: 20rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
