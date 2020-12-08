<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <i class="el-icon-s-unfold fold-icon" @click="toggleFold" :style="foldIconStyle"></i>
    </div>
    <div class="top-bar-right">
      <span class="current-user">当前用户：{{ currentUser }}</span>
      <i class="el-icon-switch-button fold-icon" title="退出登录"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: "班庆贺",
    }
  },
  computed: {
    isFolded() {
      return this.$store.state.isFolded;
    },
    foldIconStyle() {
      return {
        transform: this.isFolded ? "rotate(180deg)" : ""
      }
    }
  },
  methods: {
    toggleFold() {
      this.$store.commit("toggleFold");
    }
  }
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid #efefef;
}

.top-bar-left {
  padding-left: 20px;
}

.top-bar-right {
  display: flex;
  align-items: center;
  height: 100%;
}

.current-user {
  font-size: .9rem;
  margin-right: 25px;
}

.fold-icon {
  font-size: 1.4rem;
  transition: transform .5s ease;
}

.fold-icon:hover {
  cursor: pointer;
}

.fold-icon.fold {
  transform: rotate(180deg);
  transition: transform .5s ease;
}

.el-icon-switch-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 60px;
}

.el-icon-switch-button:hover {
  background: aliceblue;
}
</style>