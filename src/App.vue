<template>
  <div id="app">
    <i-header></i-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!-- 播放器 -->
    <player></player>
  </div>
</template>

<script>
import iHeader from '@/components/header/Header'
import tab from '@/components/tab'
import Player from '@/components/player/player'
export default {
  name: 'App',
  components: {
    iHeader,
    tab,
    Player
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
