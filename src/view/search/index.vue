<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
  <scroll  class="shortcut" :data="shortCut" ref="shortcut"  :refreshDelay="refreshDelay">
      <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" 
              v-for="item in hotkey" 
              :key="item.key"
              @click="addQuery(item.k)"
            >
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
        <!--搜索历史部分(待完善)-->


  </scroll>
  </div>
  <div class="search-result" v-show="query" ref="searchResult">
    <suggest :query="query" @listScroll="blurInput" @select="saveSearch"  ref="suggest"></suggest>
  </div>
  <router-view></router-view>

  </div>
</template>

<script>
import SearchBox from '@/base/searchBox/searchBox'
import Suggest from '@/components/suggest/suggest'
import Scroll from '@/base/scroll'
import { getHotKey } from '@/api/search'
import { ERR_OK } from '@/api/config'
 import { playListMixin, searchMixin } from '@/common/js/mixin'

export default {
  name: 'search',
  mixins: [playListMixin, searchMixin],
  props: {},
  data() {
    return {
      query: '',
      hotkey: [], //热门搜索
      refreshDelay: 100
    }
  },
  computed: {
     shortCut() {
        //return this.hotkey.concat(this.searchHistory)
        return this.hotkey
      }
  },
  watch: {

  },
  methods: {
    onQueryChange(query) {
      this.query = query
    },
    _getHotKey(){
      getHotKey().then((result) => {
        if(result.code === ERR_OK){
          this.hotkey = result.data.hotkey
        }
      }).catch((err) => {
        
      });
    },
    addQuery(){

    }
  },
  beforeCreated() {

  },
  created() {
    debugger
    this._getHotKey()
  },
  mounted() {

  },
  components: {
    SearchBox,
    Scroll,
    Suggest
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>