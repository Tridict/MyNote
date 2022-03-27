import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/utils/stores'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: {
      order: 0,
      transition: 'fade'
    }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import(/* webpackChunkName: "main" */ '@/views/notes/index.vue'),
    meta: {
      order: 1,
      transition: 'fade',
      // keepAlive: true
    }
  },
  {
    path: '/post',
    name: 'Post',
    component: () =>
      import(/* webpackChunkName: "post" */ '@/views/notes/post.vue'),
    meta: {
      order: 11,
      transition: 'slide-left'
    }
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import(/* webpackChunkName: "main" */ '@/views/tools/index.vue'),
    meta: {
      order: 2,
      transition: 'fade'
    }
  },
  {
    path: '/tool-spy',
    name: 'ToolSpy',
    component: () =>
      import(/* webpackChunkName: "main" */ '@/views/tools/toolSpy.vue'),
    meta: {
      order: 1,
      transition: 'slide-left'
    }
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import(/* webpackChunkName: "main" */ '@/views/me/index.vue'),
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


// 检查是否已登录
router.beforeEach((to, from) => {
  const isAuthenticated = store.get('LcUserInfo')?.sessionToken
  if (to.name !== 'Login' && !isAuthenticated) {
    // 如果未登录，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }
    }
  }
  if (to.path === '/' && isAuthenticated) {
    return {
      path: '/notes'
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
