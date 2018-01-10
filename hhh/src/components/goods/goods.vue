<template>
    <div class="good">
    	<div class="goods">
        <div class="menu-wrapper" ref="meunWrapper">
          <ul>
            <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex==index}" @click="selectMeun(index)">
              <span class="text">
                <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
              </span>
            </li>
          </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
          <ul>
            <li v-for="item in goods" class="food-list-goods">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for="food in item.foods" @click="selectFood(food)" class="food-item">
                  <div class="avatar"><img :src="food.icon"></div>

                  <div class="content">
                    <h1 class="name">{{food.name}}</h1>
                    <p class="des" v-if="food.description">{{food.description}}</p>
                    <p class="des">
                      <span>月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span>
                    </p>
                    <p>
                      <span class="price">￥{{food.price}}</span>
                      <div class="cartcontrol-wrapper" @click="test">
                        <cartcontrol :food="food"  ></cartcontrol>
                      </div>
                      <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </li>
            </ul>
        </div>
      </div>
       <shopcart :goods="goods" :foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
    
</template>

<script>
import Bscroll from 'better-scroll';
import shopcart from '../shopcart/shopcart.vue';
import cartcontrol from "../cartcontrol/cartcontrol";
const ERR_OK = 0;
  export default {
  	props: {
      seller:{
        type:Object
      }
    },
    data() {
    	return {
    		goods:{},
        selectedFood: {},
        listHight:[],
        scrollY:0
    	};
    },    
    created() {
    	let _this = this;
      this.classMap = ['decrease','discount','special','invoice'];
      this.$http.get('/api/goods').then((response) => {
			response = response.body;
			if(response.errno === ERR_OK) {
				this.goods = response.data;
				console.log(this.goods);
        this.$nextTick(() => {
          this._initScroll();
        });
			}
		});
    },
    watch: {
      selectFoods: function () { }
    },
    methods:{
      selectMeun(index) {
        let target = this.foodListHeights[index];
        this.foodsScroll.scrollTo(0, -target, 300);
      },
      countI() {
        this.count = this.count+1;
      },
      _initScroll() {
        this.meunScroll = new Bscroll(this.$refs.meunWrapper,{
          click:true
        });
        this.foodsScroll = new Bscroll(this.$refs.foodsWrapper,{
          click:true,//可以被点击
          probeType:3//监听滚动的位置
        });
        this.foodsScroll.on('scroll',(pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-goods');
        let height = 0;
        this.listHight.push(hight);
        for (var i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.ClientHight;
          this.listHight.push(height);

        }
      },
      test() {
        console.log("goods:"+this.goods);
      }
    },
    computed:{
      currentIndex() {
        for(let i =0;i<this.listHight.length;i++) {
          let height1 = this.listHight[i];
          let height2 = this.listHight[i+1];
          //对滑动后currentY值不足的情况进行修正
          let diff = Math.abs(this.currentY - heightTop);
          if (diff < 5) {
            this.currentY = heightTop;
          }
          //判断currentY当前所在的区间
          if(!height2||(this.scrollY>=height1&&this.scrollY<height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
          let foods = [{
              price:50,
              count:2
            }];
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if(food.count) {
                foods.push(food);
              }
            });
          });
          return foods;
      }
      
    },
    components:{
      shopcart,
      cartcontrol
    }
    
  }
</script>

<style>
.goods {
	position: absolute;
  display: flex;
	top: 174px;
	bottom: 40px;
	width: 100%;
	overflow: hidden;
}
.goods .menu-wrapper {
	flex: 0 0 80px;
  float: left;
	width: 80px;
	height: 100%;
	background-color: rgba(7, 17, 27, 0.1);

}

.menu-item {
  display: table;
  width: 56px;
  height: 54px;
  line-height: 14px;
  padding: 0 12px;
  
}
.goods .menu-wrapper .current {
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #fff;
  font-weight: 700;
}
.goods .menu-wrapper .current .text {
  border: none;
}
.menu-item .text {
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  font-size: 12px;
  font-weight: 200;
}
.menu-item .text .icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  vertical-align: top;
}
.decrease{
  background-image: url(decrease_3@2x.png);
} 
.discount {
  background-image: url(discount_3@2x.png);
}
.invoice {
  background-image: url(invoice_3@2x.png);
}
.special {
  background-image: url(special_3@2x.png);
}
.goods .foods-wrapper {
  flex: 1;

}
.foods-wrapper .title {
  height: 26px;
  line-height: 26px;
  padding-left: 5px;
  background-color: rgba(7, 17, 27,0.1);
  color: rgb(147, 153, 159);
  font-size: 12px;
  border-left: 2px solid #d9dde1;
}
.foods-wrapper .food-item {
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  position: relative;
}
.foods-wrapper .food-item : last-child {
  border-bottom:none;
}
.foods-wrapper .food-item .avatar img{
  width: 64px;
  height: 64px;
}
.foods-wrapper .food-item .content {
  margin-left: 10px;

}
.foods-wrapper .food-item .content .name {
  margin-bottom: 8px;
  font-size: 14px; 
  color: rgb(7, 17, 27);
  line-height: 14px;
  height: 14px;
}
.foods-wrapper .food-item .content .des {
  margin-bottom: 15px;
  font-size: 10px;
  color: rgb(147, 153, 159);
  height: 10px;
  line-height: 10px;
}
.foods-wrapper .food-item .content .price {
  width: 24px;
  font-size: 14px;
  color: rgb(240, 20, 20);
  font-weight: 700;
  line-height: 24px;
}
.cartcontrol-wrapper {
  position: absolute;
  right: 0;
  bottom: 12px;

}
.foods-wrapper .food-item .content .oldPrice {
  text-decoration: line-through;
  color: rgb(147, 153, 159);
  font-size: 12px;
}

.foods-wrapper .food-item .count {
  /* position: absolute;
  width: 50px;
  height: 24px;
  bottom: 30px;
  right: 30px; */
}

</style>
