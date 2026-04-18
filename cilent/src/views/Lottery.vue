<template>
  <div class="page lottery-page">
    <header class="page-header">
      <div class="header-content">
        <el-button text :icon="ArrowLeft" @click="goBack" />
        <h1 class="page-title">签到抽奖</h1>
        <el-button text :icon="Goods" />
      </div>
    </header>

    <div class="page-content">
      <div class="checkin-section">
        <div class="checkin-calendar">
          <h3 class="section-title">本月签到</h3>
          <div class="calendar-grid">
            <div v-for="day in 28" :key="day" class="calendar-day" :class="{ checked: day <= checkInDays }">
              {{ day }}
            </div>
          </div>
        </div>

        <div class="checkin-status">
          <div class="status-info">
            <span class="status-label">连续签到</span>
            <span class="status-value">{{ checkInDays }} 天</span>
          </div>
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

      <div class="lottery-section">
        <div class="lottery-wheel">
          <div class="wheel-container" :style="{ transform: `rotate(${wheelRotate}deg)` }">
            <div class="wheel-segment" v-for="(prize, index) in prizes" :key="index" :style="{ transform: `rotate(${index * 45}deg)` }">
              <span class="prize-name">{{ prize.name }}</span>
            </div>
          </div>
          <div class="wheel-pointer" @click="spinLottery">
            <span>抽奖</span>
          </div>
        </div>

        <div class="lottery-info">
          <span class="lottery-chance">剩余抽奖次数：<span class="chance-num">{{ lotteryChance }}</span></span>
        </div>

        <div class="prize-rules">
          <h3 class="rules-title">抽奖规则</h3>
          <ul class="rules-list">
            <li>每日签到可获得1次抽奖机会</li>
            <li>每次抽奖消耗1次机会</li>
            <li>奖品包括金币、优惠券、实物奖品等</li>
            <li>实物奖品需要填写收货地址</li>
          </ul>
        </div>
      </div>

      <div class="prizes-history">
        <h3 class="section-title">中奖记录</h3>
        <div class="history-list">
          <div v-for="record in history" :key="record.id" class="history-item">
            <el-avatar :size="40" :src="record.prize.image" />
            <div class="history-info">
              <span class="history-name">{{ record.prize.name }}</span>
              <span class="history-time">{{ record.time }}</span>
            </div>
            <el-tag :type="record.status === '未领取' ? 'success' : 'info'" size="small">
              {{ record.status }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Goods } from '@element-plus/icons-vue'

const router = useRouter()

const checkInDays = ref(7)
const hasCheckedIn = ref(false)
const lotteryChance = ref(3)
const wheelRotate = ref(0)
const isSpinning = ref(false)

const prizes = ref([
  { id: 1, name: '50金币' },
  { id: 2, name: '100金币' },
  { id: 3, name: '优惠券' },
  { id: 4, name: '神秘礼包' },
  { id: 5, name: '再来一次' },
  { id: 6, name: '20金币' },
  { id: 7, name: '谢谢参与' },
  { id: 8, name: '神秘大奖' }
])

const history = ref([
  { id: 1, prize: { name: '50金币', image: 'https://api.dicebear.com/7.x/identicon/svg?seed=gold' }, time: '2026-04-18', status: '已领取' },
  { id: 2, prize: { name: '新人优惠券', image: 'https://api.dicebear.com/7.x/identicon/svg?seed=coupon' }, time: '2026-04-15', status: '已使用' },
  { id: 3, prize: { name: '神秘礼包', image: 'https://api.dicebear.com/7.x/identicon/svg?seed=gift' }, time: '2026-04-10', status: '未领取' }
])

const goBack = () => {
  router.back()
}

const handleCheckIn = () => {
  hasCheckedIn.value = true
  checkInDays.value++
  lotteryChance.value++
  ElMessage.success('签到成功！获得1次抽奖机会！')
}

const spinLottery = () => {
  if (isSpinning.value || lotteryChance.value <= 0) return

  isSpinning.value = true
  lotteryChance.value--

  const rotateAngle = Math.floor(Math.random() * 360) + 720
  wheelRotate.value += rotateAngle

  setTimeout(() => {
    isSpinning.value = false
    const prizeIndex = Math.floor((rotateAngle % 360) / 45)
    const wonPrize = prizes.value[prizeIndex]

    if (wonPrize.name === '谢谢参与' || wonPrize.name === '再来一次') {
      ElMessage.info(`很遗憾，未中奖`)
    } else {
      ElMessage.success(`恭喜获得 ${wonPrize.name}！`)
      history.value.unshift({
        id: Date.now(),
        prize: { name: wonPrize.name, image: `https://api.dicebear.com/7.x/identicon/svg?seed=${Date.now()}` },
        time: new Date().toLocaleDateString(),
        status: '未领取'
      })
    }
  }, 2000)
}
</script>

<script>
import { ElMessage } from 'element-plus'
export default {
  components: { ElMessage }
}
</script>

<style scoped>
.lottery-page {
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

.checkin-section {
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.calendar-day {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 13px;
  color: var(--text-gray);
  background-color: var(--bg-light-gray);
}

.calendar-day.checked {
  background-color: var(--primary-color);
  color: white;
}

.checkin-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-info {
  display: flex;
  flex-direction: column;
}

.status-label {
  font-size: 13px;
  color: var(--text-gray);
}

.status-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--secondary-color);
}

.lottery-section {
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}

.lottery-wheel {
  position: relative;
  width: 250px;
  height: 250px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  overflow: hidden;
}

.wheel-container {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    #fff 0deg 45deg,
    #f0f0f0 45deg 90deg,
    #fff 90deg 135deg,
    #f0f0f0 135deg 180deg,
    #fff 180deg 225deg,
    #f0f0f0 225deg 270deg,
    #fff 270deg 315deg,
    #f0f0f0 315deg 360deg
  );
  transition: transform 2s ease-out;
}

.wheel-segment {
  position: absolute;
  width: 50%;
  height: 50%;
  left: 50%;
  top: 0;
  transform-origin: 0% 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}

.prize-name {
  font-size: 11px;
  color: var(--text-dark);
  transform: rotate(22.5deg);
}

.wheel-pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.lottery-info {
  text-align: center;
  margin-bottom: 16px;
}

.lottery-chance {
  font-size: 14px;
  color: var(--text-gray);
}

.chance-num {
  color: var(--secondary-color);
  font-weight: 700;
  font-size: 18px;
}

.prize-rules {
  background-color: var(--bg-light-gray);
  border-radius: 8px;
  padding: 12px;
}

.rules-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.rules-list {
  font-size: 12px;
  color: var(--text-gray);
  padding-left: 16px;
  margin: 0;
}

.rules-list li {
  margin-bottom: 4px;
}

.prizes-history {
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 20px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  background-color: var(--bg-light-gray);
  border-radius: 8px;
}

.history-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.history-name {
  font-size: 14px;
  color: var(--text-dark);
}

.history-time {
  font-size: 12px;
  color: var(--text-light);
}
</style>