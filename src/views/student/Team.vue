<template>
  <div class="team-page">
    <el-card class="team-card" v-for="team in teams" :key="team.name">
      <div slot="header" class="clearfix">
        <span>{{ team.name }}</span>
        <el-dropdown class="team-menu">
          <el-button class="setting-button" type="text">
            <i class="el-icon-setting"></i>
          </el-button>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="renameVisible = true">重命名</el-dropdown-item>
            <el-dropdown-item>退出队伍</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <p>
        <span class="info-title">小队成员：</span>
        {{ team.members }}
      </p>
      <p>
        <span class="info-title">项目列表：</span>
        {{ team.projects }}
      </p>
    </el-card>

    <el-dialog title="队伍重命名" :visible.sync="renameVisible">
      <el-form :model="renameForm">
        <el-form-item label="新的团队名称">
          <el-input v-model="renameForm.newName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="renameVisible = false">取 消</el-button>
        <el-button type="primary" @click="renameVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      renameVisible: false,
      renameForm: {
        newName: "",
      },
      teams: [
        {
          teamid: "",
          teamname: "",
          students: [],
          projects: [],
        },
      ],
    };
  },
  methods: {
    showTeamMenu: function (e) {
      console.log(e.target.parent);
      // document.querySelectorAll(".team-menu")
      // .style.display = "inline-block";
    },
  },

  // created: function () {
  //   this.axios
  //     .get("/stu/team")
  //     .then((res) => {
  //       if (res.status === 200) {
  //         this.teams = res.data;
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // },
};
</script>

<style scoped>
.team-page {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}

.team-card {
  text-align: start;
  flex: 1 1 400px;
  min-width: 300px;
  max-width: 434px;
  height: 210px;
  margin: 15px 30px;
  box-sizing: border-box;
  border-radius: 10px;
}

.team-card:hover {
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.25);
}

.info-title {
  font-weight: bold;
}

.clearfix {
  display: flex;
  justify-content: space-between;
}

.setting-button {
  padding: 3px 0;
  font-size: 1.2rem;
  cursor: pointer;
}

/* .team-menu-item {

} */
</style>