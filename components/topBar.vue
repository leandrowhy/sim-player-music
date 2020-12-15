<template>
	<view class="main">
		<text class="menu">菜单</text>
		<text class="content">
			<text>关注</text>
			<text>推荐</text>
		</text>
		<text class="release">添加</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	
		
	}
</script>

<style lang="scss">
	.main{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.menu{
			background-color: #ff0000;
		}
		.content{
			display: flex;
			justify-content: space-between;
			background-color: #39B54A;
			& text{
				margin-left: 40rpx;
				&:first-child{
					margin-left: 0rpx;
				}
			}
		}
		.release{
			background-color: #007AFF;
		}
	}
</style>
