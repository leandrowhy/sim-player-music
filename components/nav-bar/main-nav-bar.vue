<template>
	<view class="nav">
		<view v-slot="centent" class="bg-gradual-orange">
			<view class="nav-centen">
				<view class="search-form round" v-if="isShow">
					<view class="iconfont icon-sousuo icon-size"></view>
					<view>{{ messges }}</view>
				</view>
				<view class="title" v-else>
					<view>{{ messges }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from "./nav-bar.vue"
	export default {
		props: {
			messges: {
				type: String,
				default: "请输入要搜索的内容"
			},
			isShow: {
				type: Boolean
			}
		},
		mounted() {
			// console.log(this.isShow)
		},
		comments: {
			navbar
		}
	}
</script>

<style scoped>
	.nav {
		position: fixed;
		z-index: 999;
		width: 100%;
		background-color: #f37b1d;
		height: 55px;
	}
	.nav::before {
		content: "";
		display: block;
		background: inherit;
		-webkit-filter: blur(5px);
		filter: blur(5px);
		position: absolute;
		width: 100%;
		height: 100%;
		top: 5px;
		left: 5px;
		z-index: -1;
		opacity: .4;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		border-radius: inherit;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	.nav-centen{
		width: 95%;
	}
	.bg-gradual-orange {
		height: 100%;
		background-image: linear-gradient(45deg, #ff9700, #ed1c24);
		color: #fff;
	}
	.round {
		border-radius: 2760px;
	}
	.search-form {
		background-color: #f5f5f5;
		line-height: 35px;
		height: 35px;
		font-size: 13px;
		color: #333;
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		margin: 0 16px;
	}
	.bg-gradual-orange,.nav-centen{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.icon-size{
		padding-left: 5px;
		font-size: 26px;
	}
</style>
