<template>
  <div class="page game-page">
    <header class="page-header">
      <div class="header-content">
        <el-button text :icon="ArrowLeft" @click="goBack" />
        <h1 class="page-title">游戏中心</h1>
        <el-button text :icon="DataBoard" />
      </div>
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="宣泄情绪" name="emotion" />
        <el-tab-pane label="签到抽奖" name="lottery" />
      </el-tabs>
    </header>

    <div class="page-content">
      <div v-show="activeTab === 'emotion'" class="game-list">
        <div
          v-for="game in games"
          :key="game.id"
          class="game-card"
          @click="playGame(game)"
        >
          <div class="game-icon">
            <el-icon :size="40" :style="{ color: game.color }">
              <component :is="getGameIcon(game.type)" />
            </el-icon>
          </div>
          <div class="game-info">
            <h3 class="game-name">{{ game.name }}</h3>
            <p class="game-desc">{{ game.description }}</p>
            <div class="game-meta">
              <span class="game-participants">
                <el-icon><User /></el-icon>
                {{ game.participants }}人在玩
              </span>
            </div>
          </div>
          <el-button type="primary" size="small">开始</el-button>
        </div>
      </div>

      <div v-show="activeTab === 'lottery'" class="lottery-section">
        <div class="checkin-card">
          <div class="checkin-header">
            <h3 class="checkin-title">每日签到</h3>
            <span class="checkin-days">连续签到 <span class="days-num">{{ checkInDays }}</span> 天</span>
          </div>
          <div class="checkin-btn-wrapper">
            <el-button
              type="primary"
              size="large"
              :disabled="hasCheckedIn"
              @click="handleCheckIn"
            >
              {{ hasCheckedIn ? '已签到' : '立即签到' }}
            </el-button>
          </div>
        </div>

        <div class="lottery-card">
          <h3 class="lottery-title">幸运抽奖</h3>
          <div class="lottery-info">
            <span class="lottery-chance">剩余 <span class="chance-num">{{ lotteryChance }}</span> 次</span>
          </div>
          <div class="lottery-btn-wrapper">
            <el-button type="warning" size="large" :disabled="lotteryChance <= 0" @click="handleLottery">
              立即抽奖
            </el-button>
          </div>
        </div>

        <div class="prizes-card">
          <div class="prizes-header">
            <h3 class="prizes-title">我的奖品</h3>
            <span class="prizes-more">查看全部</span>
          </div>
          <div class="prizes-list">
            <div v-for="prize in prizes" :key="prize.id" class="prize-item">
              <el-avatar :size="40" :src="prize.image" />
              <div class="prize-info">
                <span class="prize-name">{{ prize.name }}</span>
                <el-tag :type="prize.status === '未使用' ? 'success' : 'info'" size="small">
                  {{ prize.status }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, DataBoard, User, Trophy, MagicStick, Star } from '@element-plus/icons-vue'
import { gameAPI } from '../api'

const router = useRouter()

const activeTab = ref('emotion')
const games = ref([])
const checkInDays = ref(7)
const hasCheckedIn = ref(false)
const lotteryChance = ref(3)
const prizes = ref([])

const getGameIcon = (type) => {
  const icons = {
    boxing: Trophy,
   吐槽: MagicStick,
    飞行棋: Star
  }
  return icons[type] || Star
}

const goBack = () => {
  router.back()
}

const handleTabChange = (tab) => {
  console.log('Tab changed to:', tab)
}

const playGame = (game) => {
  router.push('/game/emotion')
}

const handleCheckIn = () => {
  hasCheckedIn.value = true
  checkInDays.value++
  ElMessage.success('签到成功！')
}

const handleLottery = () => {
  lotteryChance.value--
  ElMessage.success('恭喜获得50金币！')
}

onMounted(async () => {
  try {
    const data = await gameAPI.getGames()
    games.value = data
    prizes.value = [
      { id: 1, name: '50金币', image: 'https://api.dicebear.com/7.x/identicon/svg?seed=gold', status: '未使用' },
      { id: 2, name: '新人优惠券', image: 'https://api.dicebear.com/7.x/identicon/svg?seed=coupon', status: '已使用' },
      { id: 3, name: '神秘礼包', image: 'https://api.dicebear.com/7.x/identicon/svg?seed=gift', status: '未使用' }
    ]
  } catch (error) {
    console.error('Failed to fetch games:', error)
  }
})
</script>

<script>
import { ElMessage } from 'element-plus'
export default {
  components: { ElMessage }
}
</script>

<style scoped>
.game-page {
  background-color: var(--bg-light-gray);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.page-title {
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-dark);
  text-align: center;
}

.game-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.game-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: var(--bg-white);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.game-card:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-light);
}

.game-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: var(--bg-light-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.game-info {
  flex: 1;
}

.game-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.game-desc {
  font-size: 13px;
  color: var(--text-gray);
  margin-bottom: 8px;
}

.game-meta {
  display: flex;
  align-items: center;
}

.game-participants {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-light);
}

.lottery-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.checkin-card,
.lottery-card,
.prizes-card {
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 20px;
}

.checkin-header,
.lottery-info,
.prizes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.checkin-title,
.lottery-title,
.prizes-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
}

.checkin-days,
.lottery-chance {
  font-size: 14px;
  color: var(--text-gray);
}

.days-num,
.chance-num {
  color: var(--secondary-color);
  font-weight: 600;
  font-size: 18px;
}

.checkin-btn-wrapper,
.lottery-btn-wrapper {
  display: flex;
  justify-content: center;
}

.prizes-more {
  font-size: 13px;
  color: var(--primary-color);
  cursor: pointer;
}

.prizes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.prize-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background-color: var(--bg-light-gray);
  border-radius: 8px;
}

.prize-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prize-name {
  font-size: 14px;
  color: var(--text-dark);
}
</style>