<template>
  <el-card class="register-card">
    <h1>创建您的账户</h1>
    <div class="register-tip">
      已经有账户了？
      <router-link to="login" class="underline">立即登录</router-link>
    </div>
    <el-form
      ref="registerForm"
      :model="registerForm"
      label-width="80px"
      :rules="rules"
      hide-required-asterisk
    >
      <el-form-item label="学号" prop="studentID">
        <el-tooltip effect="dark" content="请输入您的学号" placement="right">
          <el-input v-model="registerForm.studentID" placeholder></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-tooltip effect="dark" content="用户名长度不超过20个字符" placement="right">
          <el-input v-model="registerForm.username" placeholder></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-tooltip effect="dark" content="密码长度为6-20个字符" placement="right">
          <el-input v-model="registerForm.password" placeholder show-password></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="确认密码" prop="anotherPassword">
        <el-tooltip effect="dark" content="请再次确认密码" placement="right">
          <el-input v-model="registerForm.anotherPassword" placeholder show-password></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-tooltip effect="dark" content="请输入您的邮箱" placement="right">
          <el-input type="email" v-model="registerForm.email" placeholder show-password></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('registerForm')"
          style="position:center, width: 100%;"
        >注册账户</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        studentID: "",
        username: "",
        password: "",
        email: "",
        anotherPassword: "",
      },
      rules: {
        studentID: [{ required: true, message: "请输入学号", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, trigger: blur },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
            type: "email",
          },
        ],
        anotherPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 6, max: 20, trigger: blur },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("/register", JSON.stringify(this.loginForm))
            .then((response) => {
              if (response.status === 200) {
                this.$message({
                  message: "注册成功",
                  type: "success",
                });
                this.$route.push("/home/login");
              } else {
                this.$message({
                  message: "用户名已存在",
                  type: "error",
                });
              }
            })
            .catch((error) => {
              this.$message({
                message: "注册失败",
                type: "error",
              });
              console.error(error);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.el-form {
  margin: 80px 80px 100px 100px;
}

.el-form .el-input {
  width: 380px;
  margin-left: -100px;
}

.register-card {
  width: 800px;
}

h1 {
  font-size: 25px;
}

.underline {
  text-decoration: none;
}
</style>