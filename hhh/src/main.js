// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import goods from './components/goods/goods.vue'
import retings from './components/retings/retings.vue'
import seller from './components/seller/seller.vue'
import VueResource from "vue-resource";

Vue.use(VueRouter);
Vue.use(VueResource);
//var goods = '<p>hhh</p>';

const routes =
	[
		{
			path:'/goods',
		    component:goods
		},
		{
			path:'/retings',
			component:retings
		},
		{
			path:'/seller',
			component:seller
		}
	]
const router = new VueRouter({
	linkActiveClass: 'active',
	routes
});
//require('./assets/css/base.css');
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
