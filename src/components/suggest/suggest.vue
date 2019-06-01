<template>
  <scroll class="suggest"  
    :data="result"
    :pullUp="pullUp"
    @scrollToEnd="searchMore"
    :beforeScroll="beforeScroll"
    @beforeScroll="listScroll"
    ref="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" 
        v-for="item in result"
        :key="item.key"
        @click="selectItem(item)">
          <div class="icon">
            <i :class="getIconCls(item)"></i>
          </div>
          <div class="name">
            <p class="text" v-html="getDisplayName(item)"></p>
          </div>
        </li>
         <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="暂无搜索结果,请尝试其他关键字"></no-result>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/base/scroll'
import NoResult from '@/base/noResult/noResult'
import Loading from '@/base/loading'
import Singer from '@/common/js/singer'

import { mapMutations, mapActions } from 'vuex'
import { createSong } from '@/common/js/song'
import { ERR_OK } from '@/api/config'
import { search } from '@/api/search'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  name: '',
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullUp: true,
      hasMore: true,
      beforeScroll: true
    }
  },
  computed: {

  },
  watch: {
    query(){
      this.search()
    }
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ]),
    listScroll() {
        this.$emit('listScroll')
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    }, 
    getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
    },
    _normalizeSongs(list) {
      debugger
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    _getResult(data){
      debugger
      let ret = []
      
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }

      return ret
    },
    _checkHasMore(data) {
      //判断是否已加载完
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
    },
    search(){
      search(this.query, this.page, this.showSinger, perpage).then((result) => {
        debugger
        if (result.code === ERR_OK) {
          this.result = this._getResult(result.data)
          debugger
           this._checkHasMore(res.data)
        }
        
      }).catch((err) => {
        
      });
    },
    searchMore(){
      if (!this.hasMore) return 
      this.page ++
      search(this.query, this.page, false, perpage).then(res => {
        if (res.code === ERR_OK) {
          // 已加载的歌曲信息+更多
          this.result = this.result.concat(this._getResult(res.data))
          this._checkHasMore(res.data)
        }
      })
    },
    // 点击选择列表的歌曲名
    selectItem(item){
      // 如果是歌手,展示歌手详情
      if(item.type === TYPE_SINGER){
        const  singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
       this.$emit('select')
    }
  },
  beforeCreated() {

  },
  created() {

  },
  mounted() {

  },
  components: {
    Scroll,
    NoResult,
    Loading
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>