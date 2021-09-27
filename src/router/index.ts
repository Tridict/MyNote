import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      order: 0,
      transition: 'fade'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login.vue'),
    meta: {
      order: 0,
      transition: 'fade'
    }
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () =>
      import(/* webpackChunkName: "main" */ '@/components/upload-box.vue'),
    meta: {
      order: 1,
      transition: 'fade'
    }
  },
  {
    path: '/tool-page',
    name: 'ToolPage',
    component: () =>
      import(/* webpackChunkName: "main" */ '@/components/toolpage.vue'),
    meta: {
      order: 1,
      transition: 'slide-left'
    }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import(/* webpackChunkName: "main" */ '@/views/notes.vue'),
    meta: {
      order: 1,
      transition: 'fade'
    }
  },
  // {
  //   path: '/post',
  //   name: 'Post',
  //   component: () => import(/* webpackChunkName: "post" */ '@/views/post.vue'),
  //   meta: {
  //     order: 10
  //   }
  // },
  {
    path: '/post',
    name: 'Post',
    component: () =>
      import(/* webpackChunkName: "post" */ '@/views/editor.vue'),
    meta: {
      order: 11,
      transition: 'slide-left'
    }
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import(/* webpackChunkName: "main" */ '@/views/tools.vue'),
    meta: {
      order: 2,
      transition: 'fade'
    }
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import(/* webpackChunkName: "main" */ '@/views/me.vue'),
    meta: {
      order: 3,
      transition: 'fade'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 暂时当作都已经登录
const isAuthenticated = true

// 检查是否已登录
router.beforeEach((to, from) => {
  if (to.name !== 'Login' && !isAuthenticated) {
    // 如果未登录，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }
    }
  }
})

// 控制路由切换的动画
// router.afterEach((to, from) => {
//   if (!from.meta.order) return
//   const transitionName =
//     from.meta.order < to.meta.order ? 'van-slide-left-left' : 'van-slide-left-right'
//   from.meta.transition = transitionName
//   to.meta.transition = transitionName
// })

export default router
