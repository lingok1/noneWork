<template>
  <div class="page virtual-page">
    <header class="page-header">
      <div class="header-content">
        <el-button text :icon="ArrowLeft" @click="goBack" />
        <h1 class="page-title">虚拟形象</h1>
        <el-button text :icon="Setting" />
      </div>
    </header>

    <div class="page-content">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="虚拟同事" name="colleague">
          <div class="avatar-grid">
            <div
              v-for="avatar in avatars.colleague"
              :key="avatar.id"
              class="avatar-card"
              @click="selectAvatar(avatar)"
            >
              <div class="avatar-image">
                <el-avatar :size="80" :src="avatar.image" />
              </div>
              <span class="avatar-name">{{ avatar.name }}</span>
              <el-tag :type="avatar.status === '在线' ? 'success' : 'info'" size="small">
                {{ avatar.status }}
              </el-tag>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="虚拟老板" name="boss">
          <div class="avatar-grid">
            <div
              v-for="avatar in avatars.boss"
              :key="avatar.id"
              class="avatar-card"
              @click="selectAvatar(avatar)"
            >
              <div class="avatar-image">
                <el-avatar :size="80" :src="avatar.image" />
              </div>
              <span class="avatar-name">{{ avatar.name }}</span>
              <el-tag :type="avatar.status === '在线' ? 'success' : 'info'" size="small">
                {{ avatar.status }}
              </el-tag>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="虚拟律师" name="lawyer">
          <div class="avatar-grid">
            <div
              v-for="avatar in avatars.lawyer"
              :key="avatar.id"
              class="avatar-card"
              @click="selectAvatar(avatar)"
            >
              <div class="avatar-image">
                <el-avatar :size="80" :src="avatar.image" />
              </div>
              <span class="avatar-name">{{ avatar.name }}</span>
              <el-tag type="warning" size="small">{{ avatar.specialty }}</el-tag>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="avatar-detail" v-if="selectedAvatar">
      <div class="detail-header">
        <el-avatar :size="100" :src="selectedAvatar.image" />
        <h2 class="detail-name">{{ selectedAvatar.name }}</h2>
      </div>
      <div class="detail-actions">
        <el-button type="primary" @click="startChat">
          <el-icon><ChatDotRound /></el-icon>
          文字聊天
        </el-button>
        <el-button type="success" @click="startVoice">
          <el-icon><Phone /></el-icon>
          语音通话
        </el-button>
        <el-button type="warning" @click="startVideo">
          <el-icon><VideoCamera /></el-icon>
          视频通话
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Setting, ChatDotRound, Phone, VideoCamera } from '@element-plus/icons-vue'
import { socialAPI } from '../api'

const router = useRouter()

const activeTab = ref('colleague')
const avatars = ref({
  colleague: [],
  boss: [],
  lawyer: []
})
const selectedAvatar = ref(null)

const goBack = () => {
  router.back()
}

const selectAvatar = (avatar) => {
  selectedAvatar.value = avatar
}

const startChat = () => {
  router.push('/social')
}

const startVoice = () => {
  console.log('Start voice call')
}

const startVideo = () => {
  console.log('Start video call')
}

onMounted(async () => {
  try {
    const data = await socialAPI.getVirtualAvatars()
    avatars.value = data
  } catch (error) {
    console.error('Failed to fetch avatars:', error)
  }
})
</script>

<style scoped>
.virtual-page {
  background-color: var(--bg-light-gray);
  padding-bottom: 200px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-title {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  text-align: center;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px 0;
}

.avatar-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  background-color: var(--bg-white);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-medium);
}

.avatar-image {
  margin-bottom: 8px;
}

.avatar-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.avatar-detail {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--bg-white);
  border-radius: 20px 20px 0 0;
  padding: 24px 16px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

.detail-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.detail-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
  margin-top: 8px;
}

.detail-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.detail-actions .el-button {
  flex: 1;
}
</style>