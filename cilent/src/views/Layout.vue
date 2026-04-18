<template>
  <div class="layout">
    <div class="layout-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <nav class="bottom-nav">
      <div
        v-for="item in navItems"
        :key="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
        @click="goTo(item.path)"
      >
        <div class="nav-icon">
          <el-icon :size="22">
            <component :is="item.icon" />
          </el-icon>
          <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
        </div>
        <span class="nav-text">{{ item.text }}</span>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { HomeFilled, Message, VideoPlay, Calendar, User } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const navItems = ref([
  { path: '/home', text: '首页', icon: HomeFilled },
  { path: '/social', text: '社交', icon: Message },
  { path: '/game', text: '游戏', icon: VideoPlay },
  { path: '/farewell', text: '辞旧', icon: Calendar },
  { path: '/profile', text: '我的', icon: User, badge: 0 }
])

const isActive = (path) => {
  return route.path.startsWith(path)
}

const goTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-content {
  flex: 1;
  padding-bottom: 60px;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: var(--bg-white);
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
  z-index: 1000;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-light);
  transition: all 0.3s ease;
}

.nav-item.active {
  color: var(--primary-color);
}

.nav-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.nav-badge {
  position: absolute;
  top: -4px;
  right: -8px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background-color: #F56C6C;
  color: white;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  font-size: 11px;
  margin-top: 2px;
}

.nav-item.active .nav-icon {
  transform: scale(1.1);
}
</style>