<template>
  <transition name="slide">
    <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
  </transition>
</template>

<script>
import { getSingerDetail } from "@/api/singer";
import { mapGetters } from "vuex";
import { ERR_OK } from "@/api/config";
import { createSong } from "@/common/js/song";
import MusicList from "@/components/musicList/musicList";
export default {
  name: "details",
  props: {},
  data() {
    return {
      songs: []
    };
  },
  computed: {
    ...mapGetters(["singer"]),
    bgImage(){
      return this.singer.avatar
    },
    title(){
      return this.singer.name
    }
  },
  watch: {},
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push("/singer");
      }
      getSingerDetail(this.singer.id).then(res => {
        debugger
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list);
            debugger
          }
        }).catch(err => {});
    },
    // 处理服务返回的数据
    _normalizeSongs(data) {
      let ret = [];
      data.forEach((item, index) => {
        let { musicData } = item;
        if (musicData.songid && musicData.albummid) {
          console.log(createSong(musicData))
          ret.push(createSong(musicData));
        }
      })
      debugger
      return ret;
    }
  },
  beforeCreated() {},
  created() {
    this._getDetail();
  },
  mounted() {},
  components: {
    MusicList
  }
};
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
