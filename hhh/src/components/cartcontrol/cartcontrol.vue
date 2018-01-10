<template>
	<div class="cartcontrol">
		<div class="cart-decrease" v-show="this.food.count>0" @click="decreaseCart">-</div>
		<div class="cart-count" v-show="this.food.count>0">{{this.food.count}} </div>
		<div class="cart-add" @click="addCart">+</div>
	</div> 
</template>
<script type="text/javascript">
	import Vue from 'vue';
	export default {
		
		props:{
			good:{
				type:Object
			},
			food:{
				type:Object
			},
		},
		created() {
			//console.log(this.food);
		},
		methods:{
			addCart(event) {
				if(!event._constructed) {
					return;
				} //解决pc端被点击两次的问题
				if(!this.food.count) {
					Vue.set(this.food,'count',1);
					//this.food.count = 1;不能直接添加没有的属性
				} else {
					this.food.count++;
				}
				//console.log(this.food.count); 
			},
			decreaseCart() {
				if(!event._constructed) {
					return;
				}
				if(this.food.count) {
					this.food.count--;
				}
			}
		}
	}
</script>

<style type="text/css">
	.cartcontrol{
		font-size: 0;
	}
	.cartcontrol .cart-decrease {

	}
	.cartcontrol .cart-decrease, .cart-add{
		display: inline-block;
		padding: 6px;
		border-radius: 50%;
		background-color: rgb(0, 160, 220);
		text-align: center;
		font-size: 24px;
		width: 20px;
		height: 20px;
		line-height: 20px;
		color: #fff;

	}
	.cartcontrol .cart-count {
		display: inline-block;
		font-size: 20px;
		padding-left: 8px;
		padding-right: 8px;
		color: rgb(147,153,159);
	}
	/* .cartcontrol .cart-add {
		display: inline-block;
		padding: 6px;
		border-radius: 50%;
		background-color: rgb(0, 160, 220);
		text-align: center;
		font-size: 24px;
		width: 20px;
		height: 20px;
		line-height: 20px;
		color: #fff;
	
	} */
</style>