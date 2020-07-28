<template>
	<view>
		<bar @handle="barEvent" placeHolderVal="搜索歌曲" />
		<view class="index" v-show="!isSearch">
			<mescroll-uni ref="mescroll" :top="CustomBar * 2 + 20 + 'rpx'" :down="downOption" @down="downCallback" :up="upOption">
				<view class="banners">
					<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="600" :circular="true">
						<swiper-item v-for="(ele, index) in banners" :key="index" @click="toMusic({ id: ele.targetId, type: ele.targetType })">
							<view class="swiper-item"><image :src="ele.imageUrl" mode="" class="img"></image></view>
						</swiper-item>
					</swiper>
				</view>

				<view class="cu-list grid" :class="['col-' + gridCol, gridBorder ? '' : 'no-border']">
					<view class="cu-item" @click="cuClick" v-for="(item, index) in cuIconList" :key="index" v-if="index < gridCol * 2">
						<view :class="['cuIcon-' + item.cuIcon, 'text-' + item.color]">
							<view class="cu-tag badge" v-if="item.badge != 0">
								<block v-if="item.badge != 1">{{ item.badge > 99 ? '99+' : item.badge }}</block>
							</view>
						</view>
						<text>{{ item.name }}</text>
					</view>
				</view>

				<song-list title="推荐歌单" :list="songlist1" link="" />
				<song-list title="热门推荐" :list="songlist2" :scrollX="true" link="" />

				<mv-list :mvlist="mvlist" />
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
import { getBanner, getHotSongs, getMvs } from '@/apis/index.js';
import bar from '../../components/bar.vue';
import songList from '../../components/songlist.vue';
import mvList from '../../components/mvlist.vue';
export default {
	data() {
		return {
			downOption: {
				auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
			},
			upOption: {
				use: false
			},
			banners: [],
			songlist: [],
			mvlist: [],
			cuIconList: [
				{
					cuIcon: 'hotfill',
					color: 'red',
					badge: 0,
					name: '推荐'
				},
				{
					cuIcon: 'musicfill',
					color: 'orange',
					badge: 0,
					name: '列表'
				},
				{
					cuIcon: 'rankfill',
					color: 'yellow',
					badge: 0,
					name: '排行'
				},
				{
					cuIcon: 'wefill',
					color: 'olive',
					badge: 22,
					name: '电台'
				}
			],
			gridCol: 4,
			gridBorder: false,
			isSearch: false
		};
	},
	computed: {
		songlist1() {
			return this.songlist.slice(0, 6);
		},
		songlist2() {
			return this.songlist.slice(6);
		}
	},
	components: {
		// mainnavbar
		bar,
		songList,
		mvList
	},
	onLoad() {
		this.getBanners();
		this.getHotSongs();
		this.getMvs();
	},
	methods: {
		downCallback(mescroll) {
			this.timeout = setTimeout(() => {
				mescroll.resetUpScroll();
				mescroll.endErr();
				uni.showToast({
					icon: 'success',
					title: '',
					duration: 1500
				});
			}, 1000);
		},
		barEvent(param) {
			if (param == 'searching') {
				this.isSearch = true;
			}
			if (param == 'searched') {
				this.isSearch = false;
			}
		},
		getBanners() {
			getBanner().then(res => {
				// this.banners = res.banners.reverse();
				this.banners = res.banners;
			});
		},
		getHotSongs() {
			getHotSongs({
				limit: 16
			}).then(res => {
				this.songlist = res.playlists;
			});
		},
		getMvs() {
			getMvs({ limit: 4 }).then(res => {
				this.mvlist = res.data;
			});
		},
		toMusic(ele) {
			if (ele.type == 1000) {
				uni.navigateTo({
					animationDuration: 500,
					animationType: 'pop-in',
					url: '/pages/index/musicalbum?id=' + ele.id
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '此功能暂未开发，敬请期待!',
					duration: 1500
				});
			}
		},
		cuClick(){
			uni.showToast({
				icon: 'none',
				title: '此功能暂未开发，敬请期待!',
				duration: 1500
			});
		}
	}
};
</script>

<style lang="scss">
.banners {
	width: 750rpx;
	margin: 20rpx 0;
	border-radius: 14rpx;
	overflow: hidden;
}
.banners image {
	height: 300rpx;
	width: 100%;
}
.content {
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.swiper-item {
	position: relative;
	margin: 0 30rpx;
	display: block;
}

.cu-list.grid.no-border {
	padding: 0;
}

.cu-list.grid.no-border > .cu-item {
	padding-top: 0;
	padding-bottom: 5px;
}

.cuIcon-rankfill:before {
	display: inline-block;
	padding-top: 10rpx;
	width: 85rpx;
	height: 75rpx;
	border-radius: 50%;
	background-color: #eee;
}

.cuIcon-wefill:before {
	display: inline-block;
	padding-top: 10rpx;
	width: 85rpx;
	height: 75rpx;
	border-radius: 50%;
	background-color: #eee;
}

.cuIcon-musicfill:before {
	display: inline-block;
	padding-top: 10rpx;
	width: 85rpx;
	height: 75rpx;
	border-radius: 50%;
	background-color: #eee;
}

.cuIcon-hotfill:before {
	display: inline-block;
	padding-top: 10rpx;
	width: 85rpx;
	height: 75rpx;
	border-radius: 50%;
	background-color: #eee;
}
</style>
