<template>
  <div class="container">
  <el-container>
  <el-header>
    <div class="logoIcon"><img style="width:60px;height:60px" src="../assets/dog.jpg"></div>
    <div class="nav"><el-input v-model="input" placeholder="请输入内容"></el-input></div>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
    export default {
        name: 'Demo',
        data() {
            return {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container {
        width: 1140px;
        padding: 0;
        margin: 0 auto;
    }
    
    .logoIcon {
        margin: 0;
        float: left;
        font-size: 32px;
        font-weight: 400;
        vertical-align: sub;
    }
    
    .el-header {
        height: 100%;
        padding: 0 0px;
    }
    
    .nav {
        float: right;
        height: 100%;
        line-height: 80px;
        background: transparent;
        padding: 0;
        margin: 0;
    }
    
    .el-header,
    .el-footer {
        text-align: center;
        line-height: 100px;
    }
    
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    
    body>.el-container {
        margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>