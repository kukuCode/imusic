   <!--  <template>
<div>
  <div class="slider-wrapper" v-if="recommendList.length">
    <slider>
      <div v-for="item in recommendList" :key="item.key">
          <img @load="loadImage" class="needsclick" :src="item.picUrl"/>
      </div>
    </slider>
  </div>
</div>
</template>-->

<template>
  <div class="recommend" ref="recommend">
   <!--  <Scroll class="recommend-content" :data="discList" ref="scroll"> -->
      <div class="recommend-content" >
      <div>
        <div class="slider-wrapper" v-if="recommendList.length">
          <slider>
            <!--slot-->
            <div v-for="item in recommendList" :key="item.key">
              <a :href="item.linkUrl">
                <img @load="loadImage" class="needsclick" :src="item.picUrl"/>
              </a>
            </div>
          </slider>
        </div>
       <!--  <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item" :key="item.key" @click="selectItem(item)">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60" alt="">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div> -->
      </div>
      <!-- <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div> -->
   </div> 
   <!-- </Scroll> -->
    <router-view></router-view>
  </div>
</template>
<script>
import { getRecommend, getDiscList } from '@/api/recommend'
import Slider from '@/base/slider'
export default {
  data(){
    return {
      recommendList: []
    }
  },
  created(){
    this._getRecommend()
  },
  components:{
    Slider
  },
  methods:{
    _getRecommend(){
      debugger
      let me = this
      getRecommend().then(res => {
        if(res.code === 0){
          this.recommendList = res.data.slider
        }
      })
    },
    loadImage(){
      
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>