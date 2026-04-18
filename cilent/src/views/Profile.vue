<template>
  <div class="page profile-page">
    <header class="page-header">
      <div class="header-content">
        <el-button text @click="goBack">
          <el-icon><ArrowLeft /></el-icon>
        </el-button>
        <h1 class="page-title">个人中心</h1>
        <el-button text>
          <el-icon><Setting /></el-icon>
        </el-button>
      </div>
    </header>

    <div class="page-content">
      <div class="profile-header">
        <div class="avatar-section" @click="changeAvatar">
          <el-avatar :size="80" :src="userInfo.avatar" />
          <el-icon class="avatar-edit"><Edit /></el-icon>
        </div>
        <div class="user-info">
          <h2 class="user-name">{{ userInfo.nickname }}</h2>
          <p class="user-id">ID: {{ userInfo.id }}</p>
          <p class="user-signature">{{ userInfo.signature }}</p>
        </div>
      </div>

      <div class="resign-progress-section">
        <div class="resign-progress-header">
          <div class="resign-progress-title">
            <el-icon style="color: #F56C6C;"><Timer /></el-icon>
            <span>辞职进度</span>
          </div>
          <span class="resign-status" :class="resignStatusClass">{{ resignStatusText }}</span>
        </div>
        <div class="resign-progress-bar">
          <el-progress :percentage="resignProgress" :stroke-width="12" :color="resignProgressColor" />
        </div>
        <div class="resign-progress-info">
          <span class="resign-percentage">{{ resignProgress }}%</span>
          <span class="resign-days">已记录 {{ resignDays }} 天</span>
        </div>
      </div>

      <div class="assets-section">
        <div class="asset-item" @click="goToPrizes">
          <span class="asset-value">{{ userInfo.gold }}</span>
          <span class="asset-label">金币</span>
        </div>
        <div class="asset-item" @click="goToPrizes">
          <span class="asset-value">{{ userInfo.prizeCount }}</span>
          <span class="asset-label">奖品</span>
        </div>
        <div class="asset-item" @click="goToCoupons">
          <span class="asset-value">{{ userInfo.couponCount }}</span>
          <span class="asset-label">优惠券</span>
        </div>
      </div>

      <div class="menu-section">
        <div class="menu-group">
          <div class="menu-item" @click="goToAvatar">
            <div class="menu-icon" style="background-color: rgba(74, 144, 226, 0.1);">
              <el-icon style="color: #4A90E2;"><User /></el-icon>
            </div>
            <span class="menu-text">我的形象</span>
            <el-icon class="menu-arrow"><ArrowRight /></el-icon>
          </div>
          <div class="menu-item" @click="goToCheckIn">
            <div class="menu-icon" style="background-color: rgba(103, 194, 58, 0.1);">
              <el-icon style="color: #67C23A;"><Calendar /></el-icon>
            </div>
            <span class="menu-text">我的签到</span>
            <span class="menu-badge">{{ userInfo.checkInDays }}天</span>
            <el-icon class="menu-arrow"><ArrowRight /></el-icon>
          </div>
          <div class="menu-item" @click="goToPrizes">
            <div class="menu-icon" style="background-color: rgba(230, 162, 60, 0.1);">
              <el-icon style="color: #E6A23C;"><Goods /></el-icon>
            </div>
            <span class="menu-text">我的奖品</span>
            <el-icon class="menu-arrow"><ArrowRight /></el-icon>
          </div>
        </div>

        <div class="menu-group">
          <div class="menu-item" @click="goToConsult">
            <div class="menu-icon" style="background-color: rgba(91, 141, 239, 0.1);">
              <el-icon style="color: #5B8DEF;"><ChatDotRound /></el-icon>
            </div>
            <span class="menu-text">我的咨询</span>
            <el-icon class="menu-arrow"><ArrowRight /></el-icon>
          </div>
          <div class="menu-item" @click="goToRecommend">
            <div class="menu-icon" style="background-color: rgba(144, 147, 153, 0.1);">
              <el-icon style="color: #909399;"><Briefcase /></el-icon>
            </div>
            <span class="menu-text">我的推荐</span>
            <el-icon class="menu-arrow"><ArrowRight /></el-icon>
          </div>
          <div class="menu-item" @click="goToReport">
            <div class="menu-icon" style="background-color: rgba(179, 127, 235, 0.1);">
              <el-icon style="color: #B37FEB;"><DataAnalysis /></el-icon>
            </div>
            <span class="menu-text">我的报表</span>
            <el-icon class="menu-arrow"><ArrowRight /></el-icon>
          </div>
        </div>

        <div class="menu-group">
          <div class="menu-item" @click="goToSettings">
            <div class="menu-icon" style="background-color: rgba(245, 108, 108, 0.1);">
              <el-icon style="color: #F56C6C;"><Setting /></el-icon>
            </div>
            <span class="menu-text">设置</span>
            <el-icon class="menu-arrow"><ArrowRight /></el-icon>
          </div>
          <div class="menu-item" @click="goToAbout">
            <div class="menu-icon" style="background-color: rgba(74, 144, 226, 0.1);">
              <el-icon style="color: #4A90E2;"><InfoFilled /></el-icon>
            </div>
            <span class="menu-text">关于我们</span>
            <el-icon class="menu-arrow"><ArrowRight /></el-icon>
          </div>
          <div class="menu-item" @click="goToFeedback">
            <div class="menu-icon" style="background-color: rgba(103, 194, 58, 0.1);">
              <el-icon style="color: #67C23A;"><Message /></el-icon>
            </div>
            <span class="menu-text">意见反馈</span>
            <el-icon class="menu-arrow"><ArrowRight /></el-icon>
          </div>
        </div>

        <div class="logout-section">
          <el-button type="danger" plain size="large" @click="handleLogout">
            退出登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  ArrowLeft,
  Setting,
  Edit,
  User,
  Calendar,
  Goods,
  ChatDotRound,
  Briefcase,
  DataAnalysis,
  InfoFilled,
  Message,
  Timer,
  ArrowRight
} from '@element-plus/icons-vue'
import { userAPI } from '../api'

const router = useRouter()

const userInfo = ref({
  id: '1',
  nickname: '职场新人小王',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  signature: '努力工作，快乐生活！',
  gold: 1250,
  prizeCount: 3,
  couponCount: 5,
  checkInDays: 7,
  resignProgress: 35,
  resignDays: 30
})

const resignProgress = computed(() => userInfo.value.resignProgress || 35)
const resignDays = computed(() => userInfo.value.resignDays || 30)

const resignProgressColor = computed(() => {
  const progress = resignProgress.value
  if (progress < 30) return '#F56C6C'
  if (progress < 70) return '#E6A23C'
  return '#67C23A'
})

const resignStatusClass = computed(() => {
  const progress = resignProgress.value
  if (progress < 30) return 'status-early'
  if (progress < 70) return 'status-middle'
  return 'status-ready'
})

const resignStatusText = computed(() => {
  const progress = resignProgress.value
  if (progress < 30) return '思考中'
  if (progress < 70) return '准备中'
  if (progress < 100) return '即将离职'
  return '已离职'
})

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/home')
  }
}

const changeAvatar = () => {
  router.push('/profile/avatar')
}

const goToAvatar = () => {
  router.push('/profile/avatar')
}

const goToCheckIn = () => {
  router.push('/game/lottery')
}

const goToPrizes = () => {
  router.push('/profile/prizes')
}

const goToCoupons = () => {
  ElMessage.info('优惠券功能开发中')
}

const goToConsult = () => {
  ElMessage.info('我的咨询功能开发中')
}

const goToRecommend = () => {
  router.push('/farewell/job')
}

const goToReport = () => {
  router.push('/social')
}

const goToSettings = () => {
  ElMessage.info('设置功能开发中')
}

const goToAbout = () => {
  ElMessage.info('关于我们功能开发中')
}

const goToFeedback = () => {
  ElMessage.info('意见反馈功能开发中')
}

const handleLogout = () => {
  ElMessage.success('已退出登录')
}

onMounted(async () => {
  try {
    const data = await userAPI.getUserInfo()
    if (data) {
      userInfo.value = { ...userInfo.value, ...data }
    }
  } catch (error) {
    console.error('Failed to fetch user info:', error)
  }
})
</script>

<style scoped>
.profile-page {
  background-color: var(--bg-light-gray);
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

.profile-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background-color: var(--bg-white);
  border-radius: 12px;
  margin-bottom: 12px;
}

.avatar-section {
  position: relative;
  cursor: pointer;
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.user-id {
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 4px;
}

.user-signature {
  font-size: 13px;
  color: var(--text-gray);
}

.resign-progress-section {
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
}

.resign-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.resign-progress-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
}

.resign-status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
}

.resign-status.status-early {
  background-color: rgba(245, 108, 108, 0.1);
  color: #F56C6C;
}

.resign-status.status-middle {
  background-color: rgba(230, 162, 60, 0.1);
  color: #E6A23C;
}

.resign-status.status-ready {
  background-color: rgba(103, 194, 58, 0.1);
  color: #67C23A;
}

.resign-progress-bar {
  margin-bottom: 12px;
}

.resign-progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.resign-percentage {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
}

.resign-days {
  font-size: 12px;
  color: var(--text-gray);
}

.assets-section {
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background-color: var(--bg-white);
  border-radius: 12px;
  margin-bottom: 12px;
}

.asset-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.asset-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 4px;
}

.asset-label {
  font-size: 12px;
  color: var(--text-gray);
}

.menu-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-group {
  background-color: var(--bg-white);
  border-radius: 12px;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.menu-item:not(:last-child) {
  border-bottom: 1px solid var(--border-color);
}

.menu-item:hover {
  background-color: var(--bg-light-gray);
}

.menu-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.menu-text {
  flex: 1;
  font-size: 14px;
  color: var(--text-dark);
}

.menu-badge {
  font-size: 12px;
  color: var(--primary-color);
  margin-right: 8px;
}

.menu-arrow {
  color: var(--text-light);
}

.logout-section {
  margin-top: 12px;
  padding: 16px;
  background-color: var(--bg-white);
  border-radius: 12px;
}

.logout-section .el-button {
  width: 100%;
}
</style>