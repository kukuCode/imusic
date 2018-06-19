<template>
  <div class="container">
    Count is:{{$store.state.count}}
    <br>
    <el-button type="primary" plain @click="increment1">+</el-button>
    <el-button type="primary" plain @click="decrement1">-</el-button>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
    export default {
        name: 'vuexTest',
        data() {
            return {

            }
        },
        computed:mapGetters([]),
       // methods:mapActions(['increment', 'decrement'])
       methods:{
           increment1(){
               this.$store.commit('increment')
           },
            decrement1(){
               this.$store.commit('decrement')
           }
       }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>