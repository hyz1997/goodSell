
<template>
  <div id="app">    
    <v-header :seller="seller"></v-header>
    <!-- 找到seller把它传到header.vue里面去 -->
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods"><a>商品</a></router-link>
      </div>
      <div class="tab-item">
        <router-link to="/retings"><a>评论</a></router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller"><a>商家</a></router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>   
    
  </div>
</template>

<script>
import header from './components/header/header.vue';
//import shopcart from './components/shopcart/shopcart.vue';
const ERR_OK = 0;
export default {
	data() {
		return {
			seller: {},
		};
	},
	created() {
		this.$http.get('/api/seller').then((response) => {
			response = response.body;
			if(response.errno === ERR_OK) {
				this.seller = response.data;
				//console.log(this.seller);
			}
		});
	},
  components:{
  	'v-header':header
    //'shopcart':shopcart

  }
}

</script>

<style>
body,html {
  line-height: 1;
  font-weight: 200;
  font-family: 'PingFang SC','STHeitiSC-Light','Helvetica-Light',arial,sans-serif;
  padding: 0;
  margin: 0;
}
.clearfix {
  display: inline-block;
}
.clearfix:after {
  display: block;
  content: ".";
  height: 0;
  line-height: 0;
  clear: both;
  visibility: hidden;
}
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.tab-item {
  flex:1;
  text-align: center;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.tab-item a {
  display: block;
  font-size: 14px;
  color: rgb(77,85,93);
}
.active a{
  color: rgb(240, 20, 20) !important;
} 

</style>
