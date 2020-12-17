<template>
  <div class="side-bar">
    <div class="logo-box">
      <i class="el-icon-user"></i>
    </div>
    <el-menu default-active="team" :collapse="isFolded" router>
      <el-menu-item index="team">
        <i class="el-icon-ship"></i>
        <span slot="title">我的团队</span>
      </el-menu-item>
      <el-menu-item index="project">
        <i class="el-icon-document-add"></i>
        <span slot="title">我的项目</span>
      </el-menu-item>
      <el-menu-item index="stu-info">
        <i class="el-icon-postcard"></i>
        <span slot="title">我的信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  computed: {
    isFolded() {
      return this.$store.state.isFolded;
    }
  },
};
</script>

<style scoped>
.logo-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  font-size: 1.5rem;
}

.el-menu {
  border: none;
  transition: width 0s ease;
}
</style>