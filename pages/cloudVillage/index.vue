	
<template>
	<view>
		<top-bar>
		</top-bar>
		<scroll-view>
			<view>
				<view class="head-portrait">头像</view>
				<view class="release-content">
					<view>name</view>
					<view>2020-10-10</view>
					<view>
						xxxxxxx内容主体
					</view>
					<view>xxx的圈子</view>
					<view>
						<text><icon></icon>10</text>
						<text><icon></icon>10</text>
						<text><icon></icon>10</text>
						<text><icon></icon></text>
					</view>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>
<script>
import topBar from "../../components/topBar.vue";
	export default {
		data() {
			return {
				
			};
		},
		components: {
		  // mainnavbar
		  topBar
		},
	}
</script>
<style scoped>
</style>
