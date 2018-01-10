<template>
	<div class="shoppingCart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<span class="icon_shopping_cart" :class="{'highlight':totalCount>0}">购</span>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container">
			
		</div>
		<!-- <div class="shopcart-list" v-show="listShow">
		      	<div class="list-header">
		      		<h1 class="title">购物车</h1>
		      		<span class="empty">清空</span>
		      	</div>
		      	<div class="list-content">
		      		<ul>
		      			<li class="food" v-for="food in selectFoods">
		      				<span class="name">{{food.name}}</span>
		      				<div class="price">
		      					<span>￥{{food.price*food.count}}</span>
		      				</div>
		      				<div class="cartcontrol-wrapper">
		      					<cartcontrol></cartcontrol>
		      				</div>
		      	
		      			</li>
		      		</ul>
		      	</div>
		      </div> -->      
	</div> 
</template>

<script type="text/javascript">
	import cartcontrol from "../cartcontrol/cartcontrol";
	export default {
		props:{
			selectFoods: {
				type:Array,
				default() {
					return [

					];
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		computed:{
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				console.log(total);
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc() {
				if (this.totalPrice=== 0) {
					return `￥${this.minPrice}元起送`;
				} else if(this.totalPrice<this.minPrice) {
					let deff =  this.minPrice-this.totalPrice;
					return `还差￥${diff}元起送`;
				} else {
					return '去结算';
				}
				let pay = 0;
				this.selectFoods.forEach()
			},
			payClass() {
				if(this.totalPrice<=this.minPrice) {
					return 'not-enough';
				} else {
					return 'enough';
				}
			},
			listShow() {
		      if (!this.totalCount) {
		        this.show = true;
		        return false;
		      }
		      let show = !this.show;
		      if (show) {
		        this.$nextTick(function () {
		          if (!this.scroll) {
		            this.scroll = new iscroll(this.$refs['list-content'],{
		              click: true
		            })
		          } else {
		            this.scroll.refresh();
		          }
		        });
		      }
		      return show;
		    }
		},
		methods: {
		    drop() {
		      for (let i = 0; i < this.balls.length; i++) {
		        let ball = this.balls[i];
		        if (!ball.show) {
		          ball.show = true;
		          ball.el = this.$store.state.ballEle;
		          this.dropBalls.push(ball);
		          return;
		        }
		      }
		    },
		    beforeEnter(el) {
		      for (let i = 0; i < this.balls.length; i++) {
		        let ball = this.balls[i]
		        if (ball.show) {
		          console.log(ball);
		          let rect = ball.el.getBoundingClientRect();
		          let x = rect.left - 22;
		          let y = -(window.innerHeight - rect.top - 48)
		          el.style.display = "";
		          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
		          el.style.transform = `translate3d(0,${y}px,0)`;
		          let inner = el.getElementsByClassName('inner-hook')[0];
		          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
		          inner.style.transform = `translate3d(${x}px,0,0)`;
		        }
		      }
		    },
		    enter(el) {
		      //触发浏览器重绘
		      let rf = el.offsetHeight;
		      this.$nextTick(() => {
		        el.style.webkitTransform = `translate3d(0,0,0)`;
		        el.style.transform = `translate3d(0,0,0)`;
		        let inner = el.getElementsByClassName('inner-hook')[0];
		        inner.style.webkitTransform = `translate3d(0,0,0)`;
		        inner.style.transform = `translate3d(0,0,0)`;
		      });
		    },
		    afterEnter(el) {
		      let ball = this.dropBalls.shift();
		      if (ball) {
		        ball.show = false;
		        el.style.display = 'none'
		      }
		    },
		    toggleList() {
		      if (!this.totalCount) {
		        return;
		      }
		      this.show = !this.show;
		    },
		    emptyCart() {
		      this.selectFoods.forEach((food) => {
		        food.count = 0;
		      });
		    },
		    pay() {
		      if (this.totalPrice < this.minPrice) {
		        return;
		      }
		      alert('支付功能还在开发中。。。');
		    }
		  },
		components:{
			cartcontrol
		}
	};
</script>

<style type="text/css">
.shoppingCart {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  height: 48px;
  width: 100%;
  color: #fff;
}
.shoppingCart .content {
  display: flex;
  background-color: #141d27;
  font-size: 0;
  color: rgba(255, 255, 255, 0.4);
}
.shoppingCart .content .content-left{
  flex: 1;
}
.shoppingCart .content .content-left .logo-wrapper {
  display: inline-block;
  position: relative;
  top: -10px;
  margin: 0 12px;
  padding: 6px;
  width: 56px;
  height: 56px;
  box-sizing: border-box;
  vertical-align: top;
  border-radius: 50%;
  background-color: #141d27;
}
.shoppingCart .content .content-left .logo-wrapper .logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #2b343c;
  text-align: center;
}
.shoppingCart .content .content-left .logo-wrapper  .highlight {
  background: rgb(0, 160, 220);
}
.icon_shopping_cart {
  font-size: 16px;
  line-height: 44px;

}
.shoppingCart .content .content-left .logo-wrapper .logo .highlight {
  color: #fff;
}
.shoppingCart .content .content-left .logo-wrapper .num {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 16px;
  font-weight: 700;
  font-size: 9px;
  color: #fff;
  background-color: rgb(240, 20, 20);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);

}
.shoppingCart .content .content-left .price {
  display: inline-block;
  vertical-align: top;
  line-height: 24px;
  margin-top: 12px; 
  box-sizing: border-box;
  padding-right: 12px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 16px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.4);

}
.shoppingCart .content .content-left .highlight {
  color: #fff;
}
.shoppingCart .content .content-left .desc {
  display: inline-block;
  vertical-align: top;
  line-height: 24px;
  margin: 12px 0 0 12px;
  font-size: 10px;
  

}
.shoppingCart .content .content-right{
  flex: 0 0 105px;
  width: 105px;
  background-color: #2b333b;
}
.shoppingCart .content .content-right .pay {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
}
.shoppingCart .content .content-right .not-enough {
  background: #2b333b;
}
.shoppingCart .content .content-right .enough {
  background: #00b34c;
  color: #fff;
}
.shoppingCart .total {
  margin-left: 80px; 
  font-size: 24px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 700;
  height: 50px;
  padding: 12px 0;
  
}
.shoppingCart .total p {
  padding-right: 12px;
  height: 24px;
  line-height: 24px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}
.shoppingCart .deliveryFee {
  margin-left: 12px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 700;
  height: 50px;
  padding: 12px 0;
}
.shoppingCart .deliveryFee p {
  height: 24px;
  line-height: 24px;
  
}
.shoppingCart .des {
  margin-left: 22px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 700;
  height: 50px;
  width: 105px;
  padding: 12px 0;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: center;
}
.shoppingCart .des p{
  height: 24px;
  line-height: 24px;
}

</style>