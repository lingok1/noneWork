<template>
  <div class="page prizes-page">
    <header class="page-header">
      <div class="header-content">
        <el-button text :icon="ArrowLeft" @click="goBack" />
        <h1 class="page-title">我的奖品</h1>
        <el-button text :icon="List" @click="showRecords = true" />
      </div>
    </header>

    <div class="page-content">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="未使用" name="unused">
          <div class="prizes-list">
            <div v-for="prize in unusedPrizes" :key="prize.id" class="prize-card">
              <div class="prize-image">
                <el-avatar :size="60" :src="prize.image" />
              </div>
              <div class="prize-info">
                <h3 class="prize-name">{{ prize.name }}</h3>
                <p class="prize-time">获得时间：{{ prize.time }}</p>
              </div>
              <el-button type="primary" size="small" @click="exchangePrize(prize)">
                领取
              </el-button>
            </div>
          </div>
          <div v-if="unusedPrizes.length === 0" class="empty-state">
            <el-icon class="empty-state-icon" :size="64"><Goods /></el-icon>
            <p class="empty-state-text">暂无未使用的奖品</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已使用" name="used">
          <div class="prizes-list">
            <div v-for="prize in usedPrizes" :key="prize.id" class="prize-card">
              <div class="prize-image">
                <el-avatar :size="60" :src="prize.image" />
              </div>
              <div class="prize-info">
                <h3 class="prize-name">{{ prize.name }}</h3>
                <p class="prize-time">使用时间：{{ prize.usedTime }}</p>
              </div>
              <el-tag type="info" size="small">已使用</el-tag>
            </div>
          </div>
          <div v-if="usedPrizes.length === 0" class="empty-state">
            <el-icon class="empty-state-icon" :size="64"><Goods /></el-icon>
            <p class="empty-state-text">暂无已使用的奖品</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已过期" name="expired">
          <div class="prizes-list">
            <div v-for="prize in expiredPrizes" :key="prize.id" class="prize-card">
              <div class="prize-image">
                <el-avatar :size="60" :src="prize.image" />
              </div>
              <div class="prize-info">
                <h3 class="prize-name">{{ prize.name }}</h3>
                <p class="prize-time">过期时间：{{ prize.expireTime }}</p>
              </div>
              <el-tag type="danger" size="small">已过期</el-tag>
            </div>
          </div>
          <div v-if="expiredPrizes.length === 0" class="empty-state">
            <el-icon class="empty-state-icon" :size="64"><Goods /></el-icon>
            <p class="empty-state-text">暂无已过期的奖品</p>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="exchange-rules">
        <h3 class="rules-title">兑换说明</h3>
        <ul class="rules-list">
          <li>实物奖品需填写收货地址后兑换</li>
          <li>虚拟奖品兑换后立即到账</li>
          <li>奖品有效期为30天，请及时兑换</li>
          <li>如有疑问请联系客服</li>
        </ul>
      </div>
    </div>

    <el-drawer v-model="showRecords" title="兑换记录" direction="rtl" size="80%">
      <div class="records-list">
        <div v-for="record in exchangeRecords" :key="record.id" class="record-item">
          <div class="record-info">
            <span class="record-name">{{ record.name }}</span>
            <span class="record-time">{{ record.time }}</span>
          </div>
          <el-tag :type="record.status === '成功' ? 'success' : 'info'" size="small">
            {{ record.status }}
          </el-tag>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft, List, Goods } from '@element-plus/icons-vue'
import { prizeAPI } from '../api'

const router = useRouter()

const activeTab = ref('unused')
const showRecords = ref(false)

const unusedPrizes = ref([])
const usedPrizes = ref([
  { id: 2, name: '新人优惠券', image: 'https://api.dicebear.com/7.x/identicon/svg?seed=coupon', usedTime: '2026-04-10' }
])
const expiredPrizes = ref([])

const exchangeRecords = ref([
  { id: 1, name: '50金币', time: '2026-04-18 10:30', status: '成功' },
  { id: 2, name: '新人优惠券', time: '2026-04-15 14:20', status: '成功' }
])

const goBack = () => {
  router.back()
}

const exchangePrize = (prize) => {
  ElMessage.success(`正在兑换 ${prize.name}...`)
}

onMounted(async () => {
  try {
    const data = await prizeAPI.getPrizes()
    unusedPrizes.value = data.filter(p => p.status === '未使用')
  } catch (error) {
    console.error('Failed to fetch prizes:', error)
  }
})
</script>

<style scoped>
.prizes-page {
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

.prizes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.prize-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: var(--bg-white);
  border-radius: 12px;
}

.prize-image {
  margin-right: 12px;
}

.prize-info {
  flex: 1;
}

.prize-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.prize-time {
  font-size: 12px;
  color: var(--text-gray);
}

.exchange-rules {
  margin-top: 24px;
  padding: 16px;
  background-color: var(--bg-white);
  border-radius: 12px;
}

.rules-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.rules-list {
  font-size: 12px;
  color: var(--text-gray);
  padding-left: 16px;
  margin: 0;
}

.rules-list li {
  margin-bottom: 6px;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.record-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: var(--bg-light-gray);
  border-radius: 8px;
}

.record-info {
  display: flex;
  flex-direction: column;
}

.record-name {
  font-size: 14px;
  color: var(--text-dark);
}

.record-time {
  font-size: 12px;
  color: var(--text-light);
}
</style>