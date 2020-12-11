<template>
	<view>
		<bar @handle="barEvent" placeHolderVal="搜索歌曲" />
		<view class="index" v-show="!isSearch">
			<mescroll-uni
				ref="mescroll"
				:top="CustomBar * 2 + 20 + 'rpx'"
				:down="downOption"
				@down="downCallback"
				:up="upOption"
			>
				<view class="banners">
					<swiper
						class="swiper"
						:indicator-dots="true"
						:autoplay="true"
						:interval="2000"
						:duration="600"
						:circular="true"
					>
					
					
						<swiper-item
							v-for="(ele, index) in banners"
							:key="index"
							@click="toMusic({ id: ele.targetId, type: ele.targetType })"
						>
							<view class="swiper-item"><image :src="ele.imageUrl" mode="" class="img"></image></view>
						</swiper-item>
					</swiper>
				</view>

				<view class="cu-list grid" :class="['col-' + gridCol, gridBorder ? '' : 'no-border']">
					<view
						class="cu-item"
						@click="cuClick"
						v-for="(item, index) in cuIconList"
						:key="index"
						v-if="index < gridCol * 2"
					>
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

<script src="./index.js"></script>
<style lang="scss" scoped src="./index.scss"></style>
