<template>
	<view class="music">
		<bar @handle="barEvent" placeHolderVal="搜索歌单" :searchType="1000"></bar>
		<mescroll-uni ref="mescroll" :top="CustomBar * 2 + 20 + 'rpx'" :down="downOption" @down="downCallback" :up="upOption">
			<view v-show="!isSearch">
				<mu-list title="歌曲推荐" :list="targetMuList" />
				<song-list title="热门推荐" :list="songlist" :scrollX="true" link="" />
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
import { getHotSongs } from '@/apis/index.js';
import { getMuListDetail } from '@/apis/music.js';
import bar from '../../components/bar.vue';
import muList from '../../components/musiclist.vue';
import songList from '../../components/songlist.vue';
export default {
	components: {
		bar,
		songList,
		muList
	},
	data() {
		return {
			isSearch: false,
			songlist: [],
			musiclist: [],
			DeviceHight: this.DeviceHight,
			downOption: {
				auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
			},
			upOption: {
				use: false
			}
		};
	},
	computed: {
		targetMuList() {
			const t = this.musiclist.slice(0, 10);
			return t.map(val => {
				return {
					id: val.id,
					name: val.name,
					picUrl: val.al.picUrl,
					n1: val.ar[0].name,
					n2: val.al.name
				};
			});
		}
	},
	onLoad() {
		this.getHotSongs();
	},
	methods: {
		downCallback(mescroll) {
			this.timeout = setTimeout(() => {
				mescroll.resetUpScroll();
				mescroll.endErr();
				this.getHotSongs();
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

		async getHotSongs() {
			const list = await getHotSongs({
				limit: 20
			});

			const target = parseInt(Math.random() * list.playlists.length);
			const id = list.playlists[target].id;
			const mulist = await getMuListDetail({
				id
			});

			this.musiclist = mulist.playlist.tracks;
			this.songlist = list.playlists;
			uni.showToast({
				icon: 'success',
				title: '',
				duration: 1500
			});
		}
	}
};
</script>

<style></style>
