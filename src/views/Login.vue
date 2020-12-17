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
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      checked: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("/login", JSON.stringify(this.loginForm))
            .then((response) => {
              if (response.status === 200) {
                console.log(response.data);
                let userData = {
                  username: "",
                  password: "",
                };
                userData.username = response.data.username;
                userData.password = response.data.password;
                this.$store.commit("login", userData);
                if (this.checked) {
                  let userInfo = {
                    username: this.loginForm.username,
                    password: this.loginForm.password,
                  };
                  localStorage.setItem("userinfo", JSON.stringify(userInfo));
                }
                this.$route.push("/home");
                this.$message({
                  message: "登陆成功",
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
    if (this.$store.status.userData !== null) {
      this.$route.push("/home");
    }
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