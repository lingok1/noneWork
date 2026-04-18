import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: { title: '首页' }
      },
      {
        path: '/social',
        name: 'Social',
        component: () => import('../views/Social.vue'),
        meta: { title: '社交找搭子' }
      },
      {
        path: '/social/chat/:id',
        name: 'Chat',
        component: () => import('../views/Chat.vue'),
        meta: { title: '聊天' }
      },
      {
        path: '/social/virtual',
        name: 'Virtual',
        component: () => import('../views/Virtual.vue'),
        meta: { title: '虚拟形象' }
      },
      {
        path: '/game',
        name: 'Game',
        component: () => import('../views/Game.vue'),
        meta: { title: '游戏中心' }
      },
      {
        path: '/game/emotion',
        name: 'Emotion',
        component: () => import('../views/Emotion.vue'),
        meta: { title: '宣泄情绪' }
      },
      {
        path: '/game/lottery',
        name: 'Lottery',
        component: () => import('../views/Lottery.vue'),
        meta: { title: '签到抽奖' }
      },
      {
        path: '/farewell',
        name: 'Farewell',
        component: () => import('../views/Farewell.vue'),
        meta: { title: '辞旧迎新' }
      },
      {
        path: '/farewell/n1',
        name: 'N1Advice',
        component: () => import('../views/N1Advice.vue'),
        meta: { title: 'n+1争取建议' }
      },
      {
        path: '/farewell/job',
        name: 'JobRecommend',
        component: () => import('../views/JobRecommend.vue'),
        meta: { title: '职业推荐' }
      },
      {
        path: '/farewell/lawyer',
        name: 'Lawyer',
        component: () => import('../views/Lawyer.vue'),
        meta: { title: '律师事务所' }
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: { title: '个人中心' }
      },
      {
        path: '/profile/avatar',
        name: 'Avatar',
        component: () => import('../views/Avatar.vue'),
        meta: { title: '形象装扮' }
      },
      {
        path: '/profile/prizes',
        name: 'Prizes',
        component: () => import('../views/Prizes.vue'),
        meta: { title: '我的奖品' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - 辞了么noneWork` : '辞了么noneWork'
  next()
})

export default router