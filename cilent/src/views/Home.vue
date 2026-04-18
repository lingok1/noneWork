<template>
  <div class="page home-page">
    <header class="home-header">
      <div class="header-left">
        <h1 class="app-title">辞了么<span class="subtitle">noneWork</span></h1>
      </div>
      <div class="header-right">
        <el-badge :value="3" :max="99" class="message-badge">
          <el-icon :size="24"><Message /></el-icon>
        </el-badge>
      </div>
    </header>

    <section class="banner-section">
      <el-carousel height="200px" :interval="3000" indicator-position="outside">
        <el-carousel-item v-for="banner in banners" :key="banner.id">
          <div class="banner-item" :style="{ backgroundImage: `url(${banner.image})` }">
            <div class="banner-overlay">
              <span class="banner-title">{{ banner.title }}</span>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>

    <section class="functions-section">
      <div class="functions-grid">
        <div
          v-for="func in functions"
          :key="func.id"
          class="function-item"
          @click="handleFunctionClick(func)"
        >
          <div class="function-icon" :style="{ backgroundColor: func.color + '15' }">
            <el-icon :size="28" :style="{ color: func.color }">
              <component :is="getIcon(func.icon)" />
            </el-icon>
          </div>
          <span class="function-title">{{ func.title }}</span>
        </div>
      </div>
    </section>

    <section class="hot-topics-section">
      <div class="section-header">
        <h2 class="section-title">热门话题</h2>
        <span class="section-more">查看更多</span>
      </div>
      <div class="topics-list">
        <div
          v-for="topic in hotTopics"
          :key="topic.id"
          class="topic-card"
          @click="handleTopicClick(topic)"
        >
          <div class="topic-content">
            <h3 class="topic-title">{{ topic.title }}</h3>
            <p class="topic-excerpt">{{ topic.excerpt }}</p>
            <div class="topic-meta">
              <span class="topic-participants">
                <el-icon><User /></el-icon>
                {{ topic.participants }}人参与
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 覆盖层 -->
    <div class="overlay" v-if="showOverlay">
      <div class="overlay-content">
        <div class="overlay-header">
          <el-button class="close-btn" @click="closeOverlay">
            <el-icon><Close /></el-icon>
          </el-button>
        </div>

        <div class="cileme-content">
          <h2 class="cileme-title">辞 了 么</h2>
          <p class="cileme-subtitle">你的专属职场焦虑粉碎机</p>

          <div class="progress-section">
            <el-progress :percentage="progress" :stroke-width="15" :color="progressColor" />
            <p class="progress-text">当前离职冲动：{{ progress }}%</p>
          </div>

          <p class="message-label">{{ message }}</p>

          <el-button
            class="click-button"
            :disabled="progress >= 100"
            @click="onClick"
            :style="{
              backgroundColor: progress >= 100 ? '#32CD32' : '#4A90E2',
              cursor: progress >= 100 ? 'default' : 'pointer'
            }"
          >
            {{ buttonText }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Message, User, VideoPlay, Calendar, Briefcase, Trophy, Present, Document, Close, Phone, VideoCamera } from '@element-plus/icons-vue'
import { bannerAPI, functionAPI } from '../api'

const router = useRouter()

const banners = ref([])
const functions = ref([])
const hotTopics = ref([])

// 覆盖层相关状态
const showOverlay = ref(true)
const progress = ref(0)
const message = ref('深呼吸，想发泄就点下面的按钮...')
const buttonText = ref('释放焦虑 👊')
const triggeredEvents = ref({
  30: false,
  50: false,
  80: false,
  90: false,
  100: false
})

const progressColor = computed(() => {
  if (progress.value >= 50) return '#FF4500'
  if (progress.value >= 100) return '#32CD32'
  return '#00FA9A'
})

const iconMap = {
  Message: Message,
  GameController: VideoPlay,
  Calendar: Calendar,
  User: User,
  Present: Present,
  Briefcase: Briefcase,
  Scale: Trophy,
  Document: Document
}

const getIcon = (iconName) => {
  return iconMap[iconName] || User
}

const handleFunctionClick = (func) => {
  router.push(func.path)
}

const handleTopicClick = (topic) => {
  console.log('Topic clicked:', topic)
}

// 覆盖层方法
const closeOverlay = () => {
  showOverlay.value = false
}

const onClick = () => {
  if (progress.value < 100) {
    progress.value += 5
    progress.value = Math.min(progress.value, 100)
    
    checkMilestones(progress.value)
    
    if (progress.value >= 100) {
      buttonText.value = '恭喜你，重获自由！'
    }
  }
}

const checkMilestones = (percent) => {
  if (percent >= 30 && !triggeredEvents.value[30]) {
    triggerEvent(30, '有点焦虑哦，你该试试我们的游戏 🎮')
  } else if (percent >= 50 && !triggeredEvents.value[50]) {
    triggerEvent(50, '来线下吧，需要找个搭子聊一聊嘛 ☕')
  } else if (percent >= 80 && !triggeredEvents.value[80]) {
    triggerEvent(80, '太暴躁了，想找律师聊一聊嘛 ⚖️')
  } else if (percent >= 90 && !triggeredEvents.value[90]) {
    triggerEvent(90, '小辞为你争取最佳离职权益，来了解一下法条 📜')
  } else if (percent >= 100 && !triggeredEvents.value[100]) {
    triggerEvent(100, '辞了！🎉', true)
  }
}

const triggerEvent = (threshold, msg, final = false) => {
  triggeredEvents.value[threshold] = true
  message.value = msg
  
  // 弹窗提示
  alert(msg)
}

onMounted(async () => {
  try {
    const [bannersData, functionsData, topicsData] = await Promise.all([
      bannerAPI.getBanners(),
      functionAPI.getFunctions(),
      Promise.resolve([
        { id: 1, title: '离职前的最后一天', participants: 1234, excerpt: '分享你离职前的最后一天是怎么度过的...' },
        { id: 2, title: 'n+1赔偿谈判技巧', participants: 892, excerpt: '教你如何在离职谈判中争取到更多权益...' },
        { id: 3, title: '职场PUA应对策略', participants: 2341, excerpt: '遇到职场PUA应该怎么办？专家来支招...' },
        { id: 4, title: '简历优化工作坊', participants: 567, excerpt: '专业HR帮你优化简历，提高面试邀约率...' }
      ])
    ])
    banners.value = bannersData
    functions.value = functionsData
    hotTopics.value = topicsData
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
})
</script>

<style scoped>
.home-page {
  background-color: var(--bg-light-gray);
  position: relative;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--bg-white);
  z-index: 1;
}

.app-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-color);
}

.subtitle {
  font-size: 14px;
  font-weight: 400;
  color: var(--secondary-color);
  margin-left: 4px;
}

.header-right {
  position: relative;
}

.message-badge {
  cursor: pointer;
}

.banner-section {
  padding: 12px 16px;
  z-index: 1;
}

.banner-item {
  width: 100%;
  height: 200px;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.banner-overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.8), rgba(255, 149, 0, 0.6));
  display: flex;
  align-items: flex-end;
  padding: 20px;
}

.banner-title {
  color: white;
  font-size: 18px;
  font-weight: 600;
}

.functions-section {
  padding: 16px;
  z-index: 1;
}

.functions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 8px;
  background-color: var(--bg-white);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.function-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-medium);
}

.function-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.function-title {
  font-size: 12px;
  color: var(--text-dark);
  text-align: center;
}

.hot-topics-section {
  padding: 0 16px 16px;
  z-index: 1;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
}

.section-more {
  font-size: 13px;
  color: var(--primary-color);
  cursor: pointer;
}

.topics-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.topic-card {
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.topic-card:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-light);
}

.topic-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.topic-excerpt {
  font-size: 13px;
  color: var(--text-gray);
  margin-bottom: 12px;
  line-height: 1.5;
}

.topic-meta {
  display: flex;
  align-items: center;
}

.topic-participants {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-light);
}

/* 覆盖层样式 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.overlay-content {
  background-color: var(--bg-white);
  border-radius: 20px;
  padding: 30px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.overlay-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.close-btn {
  font-size: 20px;
}

/* 辞了么内容样式 */
.cileme-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.cileme-title {
  font-size: 32px;
  font-weight: bold;
  color: #1E90FF;
  margin: 0;
}

.cileme-subtitle {
  font-size: 14px;
  color: gray;
  margin: 0;
}

.progress-section {
  width: 100%;
  margin: 20px 0;
}

.progress-text {
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
}

.message-label {
  font-size: 14px;
  color: #FFD700;
  margin: 20px 0;
  text-align: center;
  line-height: 1.5;
}

.click-button {
  width: 200px;
  height: 60px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 30px;
  margin-top: 30px;
  transition: all 0.3s ease;
}

.click-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.5);
}
</style>