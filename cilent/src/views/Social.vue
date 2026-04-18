<template>
  <div class="page social-page">
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">社交找搭子</h1>
        <el-button type="primary" size="small" :icon="Plus" circle @click="handleAdd" />
      </div>
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="聊天" name="chat" />
        <el-tab-pane label="虚拟形象" name="virtual" />
        <el-tab-pane label="辞了么报表" name="report" />
      </el-tabs>
    </header>

    <div class="page-content">
      <div v-show="activeTab === 'chat'">
        <div v-if="chatList.length === 0" class="empty-state">
          <el-icon class="empty-state-icon" :size="64"><Message /></el-icon>
          <p class="empty-state-text">暂无聊天记录</p>
        </div>
        <div v-else class="chat-list">
          <div
            v-for="chat in chatList"
            :key="chat.id"
            class="chat-item"
            @click="goToChat(chat)"
          >
            <div class="chat-avatar">
              <el-avatar :size="50" :src="chat.avatar" />
              <span v-if="chat.unread > 0" class="chat-badge">{{ chat.unread }}</span>
            </div>
            <div class="chat-info">
              <div class="chat-header">
                <span class="chat-name">{{ chat.name }}</span>
                <span class="chat-time">{{ chat.lastTime }}</span>
              </div>
              <p class="chat-message">{{ chat.lastMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'virtual'">
        <div class="virtual-section">
          <h3 class="section-subtitle">虚拟同事</h3>
          <div class="virtual-grid">
            <div
              v-for="avatar in virtualAvatars.colleague"
              :key="avatar.id"
              class="virtual-card"
              @click="selectVirtual(avatar)"
            >
              <el-avatar :size="60" :src="avatar.image" />
              <span class="virtual-name">{{ avatar.name }}</span>
              <el-tag size="small" :type="avatar.status === '在线' ? 'success' : 'info'">
                {{ avatar.status }}
              </el-tag>
            </div>
          </div>
        </div>

        <div class="virtual-section">
          <h3 class="section-subtitle">虚拟老板</h3>
          <div class="virtual-grid">
            <div
              v-for="avatar in virtualAvatars.boss"
              :key="avatar.id"
              class="virtual-card"
              @click="selectVirtual(avatar)"
            >
              <el-avatar :size="60" :src="avatar.image" />
              <span class="virtual-name">{{ avatar.name }}</span>
              <el-tag size="small" :type="avatar.status === '在线' ? 'success' : 'info'">
                {{ avatar.status }}
              </el-tag>
            </div>
          </div>
        </div>

        <div class="virtual-section">
          <h3 class="section-subtitle">虚拟律师</h3>
          <div class="virtual-grid">
            <div
              v-for="avatar in virtualAvatars.lawyer"
              :key="avatar.id"
              class="virtual-card"
              @click="selectVirtual(avatar)"
            >
              <el-avatar :size="60" :src="avatar.image" />
              <span class="virtual-name">{{ avatar.name }}</span>
              <el-tag size="small" type="warning">{{ avatar.specialty }}</el-tag>
            </div>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 'report'">
        <div class="report-list">
          <div v-for="i in 3" :key="i" class="report-card">
            <div class="report-header">
              <h4 class="report-title">辞了么报表 {{ i }}</h4>
              <span class="report-time">{{ getReportTime(i) }}</span>
            </div>
            <p class="report-content">您的职场情绪分析报告已生成，包含本周的情绪变化趋势和应对建议。</p>
            <el-button type="primary" size="small">查看详情</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Message } from '@element-plus/icons-vue'
import { socialAPI } from '../api'

const router = useRouter()

const activeTab = ref('chat')
const chatList = ref([])
const virtualAvatars = ref({
  colleague: [],
  boss: [],
  lawyer: []
})

const handleAdd = () => {
  console.log('Add new chat')
}

const handleTabChange = (tab) => {
  console.log('Tab changed:', tab)
}

const goToChat = (chat) => {
  router.push(`/social/chat/${chat.id}`)
}

const selectVirtual = (avatar) => {
  router.push('/social/virtual')
}

const getReportTime = (index) => {
  const dates = ['2026-04-18', '2026-04-11', '2026-04-04']
  return dates[index - 1] || ''
}

onMounted(async () => {
  try {
    const [chatData, avatarData] = await Promise.all([
      socialAPI.getChatList(),
      socialAPI.getVirtualAvatars()
    ])
    chatList.value = chatData
    virtualAvatars.value = avatarData
  } catch (error) {
    console.error('Failed to fetch social data:', error)
  }
})
</script>

<style scoped>
.social-page {
  background-color: var(--bg-light-gray);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-dark);
}

.chat-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: var(--bg-white);
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chat-item:hover {
  background-color: #f8f8f8;
}

.chat-avatar {
  position: relative;
  margin-right: 12px;
}

.chat-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background-color: #F56C6C;
  color: white;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-info {
  flex: 1;
  overflow: hidden;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.chat-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-dark);
}

.chat-time {
  font-size: 12px;
  color: var(--text-light);
}

.chat-message {
  font-size: 13px;
  color: var(--text-gray);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.virtual-section {
  margin-bottom: 20px;
}

.section-subtitle {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.virtual-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.virtual-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  background-color: var(--bg-white);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.virtual-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-medium);
}

.virtual-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-dark);
  margin: 8px 0 4px;
}

.report-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.report-card {
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 16px;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.report-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-dark);
}

.report-time {
  font-size: 12px;
  color: var(--text-light);
}

.report-content {
  font-size: 13px;
  color: var(--text-gray);
  margin-bottom: 12px;
  line-height: 1.5;
}
</style>