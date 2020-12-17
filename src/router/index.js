import Vue from 'vue'
import VueRouter from 'vue-router'

// 登录页
import LoginPage from '@/views/LoginPage'
import Login from '@/views/Login'
import Register from '@/views/Register'

import Home from '../views/Home.vue'

import StuHome from '@/views/student/StuHome'
import StuSidebar from '@/views/student/StuSideBar'
import Team from '@/views/student/Team'
import Project from '@/views/student/Project'
import StuInfo from '@/views/student/StuInfo'

import InstHome from '@/views/instructor/InstHome'

import AdminHome from '@/views/admin/AdminHome'

Vue.use(VueRouter)

const routes =[
  {
    path: '/',
    redirect: '/login-page'
  },
  {
    path: '/login-page',
    name: 'LoginPage',
    component: LoginPage,
    redirect: '/login-page/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'stu',
        name: 'StuHome',
        components: {
          default: StuHome,
          sidebar: StuSidebar
        },
        redirect: 'stu/team',
        children: [
          {
            path: 'team',
            name: 'Team',
            component: Team,
          },
          {
            path: 'project',
            name: 'Project',
            component: Project,
          },
          {
            path: 'stu-info',
            name: 'StuInfo',
            component: StuInfo,
          },
        ]
      },
      {
        path: 'inst',
        name: 'InstHome',
        component: InstHome,
      },
      {
        path: 'admin',
        name: 'AdminHome',
        component: AdminHome,
      },
    ]
  }
];

const router = new VueRouter({
  routes
})

export default router