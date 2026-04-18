<template>
  <div class="page emotion-page">
    <header class="page-header">
      <div class="header-content">
        <el-button text :icon="ArrowLeft" @click="goBack" />
        <h1 class="page-title">宣泄情绪</h1>
        <el-button text :icon="Setting" />
      </div>
    </header>

    <div class="page-content">
      <div class="character-select">
        <span class="select-label">选择对象：</span>
        <el-select v-model="selectedCharacter" placeholder="请选择" size="small">
          <el-option label="虚拟同事" value="colleague" />
          <el-option label="虚拟老板" value="boss" />
        </el-select>
      </div>

      <div class="game-area">
        <div class="score-board">
          <div class="score-item">
            <span class="score-label">得分</span>
            <span class="score-value">{{ score }}</span>
          </div>
          <div class="score-item">
            <span class="score-label">时间</span>
            <span class="score-value">{{ timeLeft }}s</span>
          </div>
        </div>

        <div class="character-display">
          <div class="target-character">
            <el-avatar :size="120" :src="currentTarget.image" />
            <div class="target-name">{{ currentTarget.name }}</div>
            <div class="target-hp">
              <el-progress :percentage="hp" :stroke-width="8" :color="hpColor" />
              <span class="hp-text">HP: {{ hp }}%</span>
            </div>
          </div>
        </div>

        <div class="game-controls">
          <div class="direction-buttons">
            <el-button :icon="Top" size="large" circle @click="attack('up')" />
            <div class="horizontal-buttons">
              <el-button :icon="Back" size="large" circle @click="attack('left')" />
              <el-button :icon="Right" size="large" circle @click="attack('right')" />
            </div>
            <el-button :icon="Bottom" size="large" circle @click="attack('down')" />
          </div>
          <div class="attack-buttons">
            <el-button type="danger" size="large" @click="performAttack">
              攻击
            </el-button>
          </div>
        </div>
      </div>

      <div class="game-result" v-if="gameOver">
        <div class="result-content">
          <h2 class="result-title">{{ score >= 100 ? '太棒了！' : '继续加油！' }}</h2>
          <p class="result-score">最终得分：{{ score }}</p>
          <div class="result-actions">
            <el-button type="primary" @click="restartGame">重新开始</el-button>
            <el-button @click="goBack">返回</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Setting, Top, Back, Right, Bottom } from '@element-plus/icons-vue'

const router = useRouter()

const selectedCharacter = ref('colleague')
const score = ref(0)
const timeLeft = ref(60)
const hp = ref(100)
const gameOver = ref(false)
const timer = ref(null)

const targets = {
  colleague: [
    { id: 'c1', name: '小李', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily' },
    { id: 'c2', name: '小张', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang' },
    { id: 'c3', name: '小王', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wang' }
  ],
  boss: [
    { id: 'b1', name: '张总', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    { id: 'b2', name: '李总', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lee' }
  ]
}

const currentTarget = computed(() => {
  const list = targets[selectedCharacter.value] || targets.colleague
  return list[Math.floor(Math.random() * list.length)]
})

const hpColor = computed(() => {
  if (hp.value > 60) return '#67C23A'
  if (hp.value > 30) return '#E6A23C'
  return '#F56C6C'
})

const goBack = () => {
  router.back()
}

const attack = (direction) => {
  if (gameOver.value) return
  console.log('Move:', direction)
  score.value += 5
}

const performAttack = () => {
  if (gameOver.value) return

  const damage = Math.floor(Math.random() * 20) + 10
  hp.value = Math.max(0, hp.value - damage)
  score.value += 20

  if (hp.value <= 0) {
    score.value += 50
    hp.value = 100
    ElMessage.success('击败目标！获得50分奖励！')
  }
}

const restartGame = () => {
  score.value = 0
  hp.value = 100
  timeLeft.value = 60
  gameOver.value = false
  startTimer()
}

const startTimer = () => {
  timer.value = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      gameOver.value = true
      clearInterval(timer.value)
    }
  }, 1000)
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
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
.emotion-page {
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

.character-select {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.select-label {
  font-size: 14px;
  color: var(--text-dark);
}

.game-area {
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 20px;
}

.score-board {
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
}

.score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-label {
  font-size: 13px;
  color: var(--text-gray);
  margin-bottom: 4px;
}

.score-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
}

.character-display {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.target-character {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.target-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin: 12px 0 8px;
}

.target-hp {
  width: 150px;
  text-align: center;
}

.hp-text {
  font-size: 12px;
  color: var(--text-gray);
  margin-top: 4px;
}

.game-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.direction-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.horizontal-buttons {
  display: flex;
  gap: 60px;
}

.attack-buttons {
  width: 100%;
}

.attack-buttons .el-button {
  width: 100%;
  height: 50px;
  font-size: 18px;
}

.game-result {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.result-content {
  background-color: var(--bg-white);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
}

.result-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 16px;
}

.result-score {
  font-size: 18px;
  color: var(--text-dark);
  margin-bottom: 24px;
}

.result-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}
</style>