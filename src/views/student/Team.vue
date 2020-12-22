<template>
  <div class="team-page">
    <el-card class="team-card" v-for="team in teams" :key="team.teamid">
      <div slot="header" class="clearfix">
        <span>{{ team.teamname }}</span>
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
        <span  v-for="student in team.students" :key="student.sid">
          <el-button type="text" @click="getStudentInfo(student)">{{ student.username }}</el-button>
        </span>
      </p>
      <p>
        <span class="info-title">项目列表：</span>
        <span  v-for="project in team.projects" :key="project.pid">
          <el-button type="text" @click="getProjectInfo(project)">{{ project.projectname }}</el-button>
        </span>
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

    <el-dialog title="学生信息" :visible.sync="stuInfoVisible">
      <p><span class="info-title">ID：</span>{{stuInfo.sid}}</p>
      <p><span class="info-title">用户名：</span>{{stuInfo.username}}</p>
      <p><span class="info-title">性别：</span>{{stuInfo.sex ? "女" : "男"}}</p>
      <p><span class="info-title">院系：</span>{{stuInfo.department}}</p>
      <p><span class="info-title">邮箱：</span>{{stuInfo.email}}</p>
    </el-dialog>

    <el-dialog title="项目信息" :visible.sync="projectInfoVisible">
      <p><span class="info-title">ID：</span>{{proInfo.pid}}</p>
      <p><span class="info-title">名称：</span>{{proInfo.projectname}}</p>
      <p><span class="info-title">类型：</span>{{proInfo.type}}</p>
      <p><span class="info-title">项目进度：</span>{{proInfo.stage}}</p>
      <p><span class="info-title">项目描述：</span>{{proInfo.description}}</p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      renameVisible: false,
      stuInfoVisible: false,
      projectInfoVisible: false,
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
      stuInfo: {
        username: "",
        sid: "",
        sex: "",
        department: "",
        email: ""
      },
      proInfo: {
        projectname: "",
        pid: "",
        description: "",
        type: "",
        stage: ""
      }
    };
  },
  methods: {

    getStudentInfo: function (student) {
      this.stuInfoVisible = true;
      this.stuInfo = student;
    },

    getProjectInfo: function (project) {
      console.log(project);
      this.projectInfoVisible = true;
      this.proInfo = project;
    },

    showTeamMenu: function (e) {
      console.log(e.target.parent);
      // document.querySelectorAll(".team-menu")
      // .style.display = "inline-block";
    },
  },

  created: function () {
    const uid = this.$store.state.userData.uid;
    this.axios
            .get("/student/" + uid)
            .then(res => {
              if (res.status === 200) {
                const student = res.data.stu;
                this.teams = student.teams;
                console.log(student);
                this.teams.forEach((team) => {
                  this.axios
                          .get("/team/" + team.teamid)
                          .then((res) => {
                            console.log(res);
                            if (res.status === 200) {
                              console.log(team);
                              team.students = res.data.team.students;
                              team.projects = res.data.team.projects;
                            }
                          })
                          .catch((err) => {
                            console.error(err);
                          });
                });
              }
            })
            .catch((err) => {
              console.error(err);
            });


  },
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

.el-button {
  padding: 0;
}
/* .team-menu-item {

} */
</style>