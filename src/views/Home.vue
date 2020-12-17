<template>
  <el-container class="home-page">
    <!-- 侧边栏 -->
    <el-aside :width="sideWidth">
      <router-view name="sidebar"></router-view>
    </el-aside>
    <el-container>
      <!-- 顶栏 -->
      <el-header>
        <top-bar></top-bar>
      </el-header>
      <!-- 主页面 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TopBar from '@/components/TopBar';

export default {
  name: 'Home',
  components: {
    TopBar
  },
  data() {
    return {}
  },
  computed: {
    sideWidth() {
      return this.$store.state.isFolded ? '64px' : '200px';
    }
  },
}
</script>

<style scoped>
.home-page {
  margin: 0;
  padding: 0;
}

.el-aside {
  min-height: 100vh;
  border-right: 1px solid #e6e6e6;
  box-shadow: 0 0 3px #eee;
  transition: width .3s ease;
}

.el-header {
  padding: 0;
  box-shadow: 3px 0 5px #CCCCCC;
}

.el-main {
  margin: 10px 0 10px 10px;
  box-shadow: 0 0 3px #CCCCCC;
}
</style>
