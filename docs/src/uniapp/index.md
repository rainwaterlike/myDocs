```vue
<template>
<view style="width: 100%;">
	<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
		<view class="scroll-view-item_H">黄果树攻略</view>
		<view class="scroll-view-item_H">龙宫攻略</view>
		<view class="scroll-view-item_H">盛夏文旅消费券</view>
		<view class="scroll-view-item_H">盛夏文旅消费券</view>
		<view class="scroll-view-item_H">盛夏文旅消费券</view>
		<view class="scroll-view-item_H">盛夏文旅消费券</view>
	</scroll-view>
</view>

<view class="p-24 w-100p">
	<scroll-view class="strategyListBox flex white-nowrap f-s-28 w-100p" scroll-x="true" scroll-left="120">
		<view class="strategyItem flex items-center white-nowrap " v-for="(item,index) in strategyList"
			:key="item.id">
			{{item.title}}
		</view>
	</scroll-view>
</view>
</template>
<style>
.scroll-view_H {
	white-space: nowrap;
	width: 100%;
}

.scroll-view-item_H {
	display: inline-block;
	text-align: center;
	font-size: 36rpx;
	margin-left: 10rpx;
}
</style>
```