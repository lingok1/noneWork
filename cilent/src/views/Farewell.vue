<template>
  <div class="page farewell-page">
    <header class="page-header">
      <div class="header-content">
        <el-button text :icon="ArrowLeft" @click="goBack" />
        <h1 class="page-title">辞旧迎新</h1>
        <el-button text :icon="More" />
      </div>
    </header>

    <div class="page-content">
      <div class="farewell-cards">
        <div class="farewell-card" @click="goToN1">
          <div class="card-icon" style="background-color: rgba(74, 144, 226, 0.1);">
            <el-icon :size="32" style="color: #4A90E2;">
              <Document />
            </el-icon>
          </div>
          <div class="card-info">
            <h3 class="card-title">n+1争取建议</h3>
            <p class="card-desc">了解如何争取合理的离职补偿</p>
          </div>
          <el-icon :size="20" class="card-arrow"><ArrowRight /></el-icon>
        </div>

        <div class="farewell-card" @click="goToJob">
          <div class="card-icon" style="background-color: rgba(103, 194, 58, 0.1);">
            <el-icon :size="32" style="color: #67C23A;">
              <Briefcase />
            </el-icon>
          </div>
          <div class="card-info">
            <h3 class="card-title">职业推荐</h3>
            <p class="card-desc">找到最适合你的下一份工作</p>
          </div>
          <el-icon :size="20" class="card-arrow"><ArrowRight /></el-icon>
        </div>

        <div class="farewell-card" @click="goToLawyer">
          <div class="card-icon" style="background-color: rgba(230, 162, 60, 0.1);">
            <el-icon :size="32" style="color: #E6A23C;">
              <Trophy />
            </el-icon>
          </div>
          <div class="card-info">
            <h3 class="card-title">律师事务所</h3>
            <p class="card-desc">专业律师为你保驾护航</p>
          </div>
          <el-icon :size="20" class="card-arrow"><ArrowRight /></el-icon>
        </div>
      </div>

      <div class="quick-tips">
        <h3 class="tips-title">小贴士</h3>
        <div class="tips-list">
          <div class="tip-item">
            <el-icon :size="20" color="#4A90E2"><Clock /></el-icon>
            <div class="tip-content">
              <span class="tip-title">注意时效</span>
              <span class="tip-desc">劳动仲裁有效期为1年</span>
            </div>
          </div>
          <div class="tip-item">
            <el-icon :size="20" color="#67C23A"><Document /></el-icon>
            <div class="tip-content">
              <span class="tip-title">保存证据</span>
              <span class="tip-desc">保留好劳动合同、工资条等</span>
            </div>
          </div>
          <div class="tip-item">
            <el-icon :size="20" color="#E6A23C"><ChatDotRound /></el-icon>
            <div class="tip-content">
              <span class="tip-title">理性沟通</span>
              <span class="tip-desc">保持冷静，合理表达诉求</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeft, More, ArrowRight, Document, Briefcase, Trophy, Clock, ChatDotRound } from '@element-plus/icons-vue'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goToN1 = () => {
  router.push('/farewell/n1')
}

const goToJob = () => {
  router.push('/farewell/job')
}

const goToLawyer = () => {
  router.push('/farewell/lawyer')
}
</script>

<style scoped>
.farewell-page {
  background-color: var(--bg-light-gray);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-title {
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-dark);
  text-align: center;
}

.farewell-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.farewell-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: var(--bg-white);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.farewell-card:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-light);
}

.card-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.card-desc {
  font-size: 13px;
  color: var(--text-gray);
}

.card-arrow {
  color: var(--text-light);
}

.quick-tips {
  margin-top: 24px;
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 16px;
}

.tips-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tip-content {
  display: flex;
  flex-direction: column;
}

.tip-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-dark);
}

.tip-desc {
  font-size: 12px;
  color: var(--text-gray);
}
</style>