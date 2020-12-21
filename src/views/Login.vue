<template>
  <el-card class="login-card">
    <h1>用户登录</h1>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" hide-required-asterisk>
      <el-form-item label>
        <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-s-custom"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-input
          v-model="loginForm.password"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label>
        <div class="password-tool">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <el-link type="primary" :underline="false">忘记密码</el-link>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')" style="width: 100%;">登录</el-button>
      </el-form-item>
      <div class="register-tip">
        没有账号？
        <router-link to="register" class="underline">立即注册</router-link>
      </div>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      routerMap: {
        'ROLE_USER': 'stu',
        'ROLE_TEACHER': 'inst',
        'ROLE_ADMIN': 'admin'
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      checked: true,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("/auth/login", this.loginForm)
            .then((response) => {
              if (response.status === 200) {
                console.log(response.data);
                const userData = {
                  uid: "",
                  username: "",
                  role: "",
                  token: ""
                };
                userData.username = this.loginForm.username;
                userData.role = response.headers["role"];
                userData.token = response.headers["token"];
                userData.uid = response.headers["uid"];

                console.log(userData);
                this.$store.commit("login", userData);

                // 记住密码
                if (this.checked) {
                  const userInfo = {
                    username: this.loginForm.username,
                    password: this.loginForm.password,
                  };
                  localStorage.setItem("userinfo", JSON.stringify(userInfo));
                }

                // 根据角色进行导航
                this.$router.push(`/home/${this.routerMap[userData.role]}`);
                
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
              } else {
                this.$message("用户名或密码错误");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          return false;
        }
      });
    },
    register() {
      this.$route.push("/register");
    },
  },
  created() {
  //   if (this.$store.status.userData !== null) {
  //     this.$route.push("/home");
  //   }
  // 如果本地已经保存了密码，则使用本地密码
    if (localStorage.getItem("userinfo")) {
      const userinfo = JSON.parse(localStorage.getItem("userinfo"));
      this.loginForm.username = userinfo.username;
      this.loginForm.password = userinfo.password;
    }
  },
};
</script>


<style scoped>
/* .login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../assets/images/sky.jpeg');
} */

h1 {
  font-size: 25px;
}

.el-form {
  padding: 0 10px 0 10px;
}

.el-input {
  margin-top: 15px;
  font-size: 16px;
}

.login-card {
  width: 400px;
}

.password-tool {
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px 0px;
  padding: 0 5px 0 5px;
}

.register-tip {
  color: gray;
  font-size: 12px;
  text-decoration: none;
}

.underline {
  text-decoration: none;
}
</style>