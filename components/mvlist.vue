<template>
	<view class="mv-box clearfix">
		<view class="nav tit-bar" v-show="isNav">
			最新视频
			<text class="more fr" @click="toMvs">更多视频</text>
		</view>
		<view class="nv-item" v-for="(item, index) in mvlist" :key="index"
		 @click="toPlayer(item.id)">
			<image :src="item.cover" mode="" class="img"></image>
			<view class="desc ellipsis2">{{ item.name }}</view>
			<view class="count ab-center cuIcon-playfill"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		mvlist: {
			type: Array,
			default: () => []
		},
		link: {
			type: String,
			default: '',
			required: false
		},
		isNav:{
			type:Boolean,
			default:true
		}
	},
	methods:{
		toPlayer(id){
			uni.navigateTo({
				animationDuration:500,
				animationType:'fade-in',
				url:'/pages/palyer/videoplayer?id='+id
			})
			// uni.showToast({
			// 	icon: 'none',
			// 	title: '该类型的目标页面暂未开发！',
			// 	duration: 1500
			// });
		},
		toMvs(){
			uni.switchTab({
			    url: '/pages/video/index'
			});
		}
	}
};
</script>

<style lang="scss">
	.mv-box {
		padding-left: 0rpx;
		margin-top: 10rpx;
		.nav {
			font-size: 34rpx;
			font-weight: 600;
			line-height: 110rpx;
			padding-left: 30rpx;
			.more {
				width: 150rpx;
				height: 50rpx;
				line-height: 50rpx;
				text-align: center;
				margin-top: 30rpx;
				margin-right: 32rpx;
				font-weight: 400;
				font-size: 24rpx;
				border: 2rpx solid #e6e6e6;
				border-radius: 50rpx;
			}
		}

		.nv-item {
			width: 337rpx;
			float: left;
			margin-left: 30rpx;
			position: relative;
			&:nth-child(odd){
				margin-left: 16rpx;
			}
			.img {
				display: block;
				width: 100%;
				margin-bottom: 10rpx;
				height: 220rpx;
				background: #eee;
				border-radius: 10rpx;
			}
			.desc {
				height: 64rpx;
				line-height: 32rpx;
				text-align: center;
			}
			.count {
				font-size: 100rpx;
				color: #fff;
				opacity: 0.7;
				top:calc(50% - 32rpx);
				cursor: pointer;
			}
		}
	}
</style>
