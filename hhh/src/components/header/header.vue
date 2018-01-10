<template>
    <header class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" width="64" height="64">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="support">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDetail">
          <span class="count">{{seller.supports.length}}</span>
          &nbsp;&nbsp;&nbsp;
          <span class="count" style="margin-left:5px;">></span>
        </div>
      </div>
      <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
      </div>
      <div class="background">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
      <div v-show="detailShow" class="detail" transition="fade">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="detail-title">
              <p>{{seller.name}}</p>
              <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
            </div>
            <div class="title-hr">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item">
                <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                <span class="text">{{seller.supports[0].description}}</span>
              </li>
              <li class="support-item">
                <span class="icon" :class="classMap[seller.supports[1].type]"></span>
                <span class="text">{{seller.supports[1].description}}</span>
              </li>
              <li class="support-item">
                <span class="icon" :class="classMap[seller.supports[2].type]"></span>
                <span class="text">{{seller.supports[2].description}}</span>
              </li>
              <li class="support-item">
                <span class="icon" :class="classMap[seller.supports[3].type]"></span>
                <span class="text">{{seller.supports[3].description}}</span>
              </li>
            </ul>
            <div class="title-hr">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="detail-text">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close">X</i>
        </div>
      </div>
    </header>
</template>

<script>
  import star from '../star/star'
  export default {
  	props: {
      seller: {
        type:Object
      }
      /*接收seller的数据*/
    },
    components:{
      star:star
    },
    data() {
      return {
        detailShow:false
      };
    },
    created() {
      this.classMap = ['decrease','discount','special','invoice'];
    },
    methods:{
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    }
    

  }
</script>

<style>
.header {
  color: #fff;
  background-color: rgba(7,17,27,0.2);
  position: relative;
  overflow: hidden;
}  
.content-wrapper {
  padding: 24px 12px 18px 24px;
  font-size: 0;
  position: relative;
}      
.content-wrapper .avatar {
  display: inline-block;
  vertical-align: top;
}
.content-wrapper .avatar img {
  border-radius: 2px;
}
.content-wrapper .content {
  display: inline-block;
  font-size: 14px;
  /*把父元素的font-size设为0可以减小字间距*/
  margin-left: 16px;
} 
.content-wrapper .content .title {
  margin:2px 0 8px 0;
 
}
.content-wrapper .content .title .brand {
  display: inline-block;
  width: 30px;
  height: 18px;
  background: url(brand@2x.png);
  background-size:30px 18px; 
  vertical-align: top;
}
.content-wrapper .content .title .name {
  margin-left: 6px;
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
}
.content-wrapper .content .description {
  margin-bottom: 10px;
  line-height: 12px;
  font-size: 12px;
}
/* .support {
  vertical-align: top;
} */
.content-wrapper .content .support .icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
  vertical-align: top;
}
.decrease{
  background-image: url(decrease_1@2x.png);
} 
.discount {
  background-image: url(discount_1@2x.png);
}
.invoice {
  background-image: url(invoice_1@2x.png);
}
.special {
  background-image: url(special_1@2x.png);
}

.support .text {
  font-size: 10px;
  line-height: 12px;
}
.support-count {
  position: absolute;
  right: 12px;
  bottom: 14px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  border-radius: 14px;
  background: rgba(0,0,0,0.2);
  text-align: center;
}
.support-count .count {
  font-size: 10px;
}
.bulletin-wrapper {
  height: 28px;
  line-height: 28px;
  padding: 0 22px 0 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
  font-size: 10px;
  background-color: rgba(7,17,27,0.2);

}
.bulletin-wrapper .bulletin-title{
  display: inline-block;
  width: 22px;
  height: 12px;
  background: url(bulletin@2x.png);
  background-size:22px 12px;
}
.background {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  filter: blur(10px);
}
.detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(7,17,27,0.8);
  transition: all 10s;
  backdrop-filter: blur(10px);
}
.detail .fade-transition {
  opacity: 1;
  background: rgba(7, 17, 27, 0.8);
}
.detail .fade-enter,.detail .fade-leave {
  opacity: 0;
  background: rgba(7, 17, 27, 0);
}
.detail-wrapper {
  min-height: 100%;
  width: 100%;

}
.detail-main {
  margin-top: 64px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 64px;
  position: relative;
  
}
.detail-close {
  position: relative;
  width: 32px;
  height: 32px;
  margin: -64px auto 0 auto;
  text-align: center;
  clear: both;
}
.detail-title {
  font-size: 16px;
  font-weight: 700 !important;
  color: rgb(255,255,255);
  line-height: 16px;
  text-align: center;
}
.star-wrapper {
  margin-bottom: 28px;
  margin-top: 16px;
}
.title-hr {
  width: 80%;
  display:  flex;
  margin: 0 auto 24px auto;
}
.line {
  flex: 1;
  position: relative;
  top: -6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.title-hr .text {
  padding: 0 12px;
  font-size: 14px;
  font-weight: 700;
}
.supports {
  margin-bottom: 28px;
}
.support-item {
  width: 80%;
  margin: 0 auto 12px auto;
}
.support-item  .icon {
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
  display: inline-block;
  margin-left: 12px;
  vertical-align: top;
}
.support-item .text {
  font-size: 12px;
  font-weight: 200;
  color: rgb(255, 255, 255);
  line-height: 12px;
  position: relative;
}
.detail-text {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  font-size: 12px;
  font-weight: 200;
  color: rgb(255, 255, 255);
}
.detail-text p {
  margin-left: 12px;
  line-height: 24px;
}
</style>
