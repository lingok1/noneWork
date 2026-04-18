<template>
  <div class="page lawyer-page">
    <header class="page-header">
      <div class="header-content">
        <el-button text :icon="ArrowLeft" @click="goBack" />
        <h1 class="page-title">律师事务所</h1>
        <el-button text :icon="Search" />
      </div>
    </header>

    <div class="page-content">
      <div class="specialty-tags">
        <el-tag
          v-for="tag in specialties"
          :key="tag"
          :type="selectedSpecialty === tag ? 'primary' : 'info'"
          size="large"
          @click="selectSpecialty(tag)"
        >
          {{ tag }}
        </el-tag>
      </div>

      <div class="lawyer-list">
        <div v-for="lawyer in filteredLawyers" :key="lawyer.id" class="lawyer-card">
          <div class="lawyer-header">
            <el-avatar :size="60" :src="lawyer.avatar" />
            <div class="lawyer-info">
              <h3 class="lawyer-name">{{ lawyer.name }}</h3>
              <div class="lawyer-meta">
                <el-tag size="small" type="warning">{{ lawyer.specialty }}</el-tag>
                <span class="lawyer-experience">{{ lawyer.experience }}执业</span>
              </div>
            </div>
          </div>

          <div class="lawyer-stats">
            <div class="stat-item">
              <span class="stat-value">{{ lawyer.rating }}</span>
              <span class="stat-label">评分</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ lawyer.cases }}</span>
              <span class="stat-label">代理案件</span>
            </div>
          </div>

          <div class="lawyer-actions">
            <el-button size="small" @click="onlineConsult(lawyer)">
              <el-icon><ChatDotRound /></el-icon>
              在线咨询
            </el-button>
            <el-button size="small" type="primary" @click="phoneConsult(lawyer)">
              <el-icon><Phone /></el-icon>
              电话咨询
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <el-drawer v-model="showConsult" title="在线咨询" direction="btt" size="80%">
      <div class="consult-form">
        <el-input
          v-model="consultForm.content"
          type="textarea"
          :rows="6"
          placeholder="请详细描述您的问题..."
        />
        <div class="consult-actions">
          <el-button type="primary" size="large" @click="submitConsult">
            提交咨询
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Search, ChatDotRound, Phone } from '@element-plus/icons-vue'
import { lawyerAPI } from '../api'

const router = useRouter()

const lawyers = ref([])
const specialties = ['全部', '劳动仲裁', '合同纠纷', '知识产权', '公司法务', '婚姻家庭']
const selectedSpecialty = ref('全部')
const showConsult = ref(false)
const consultForm = ref({ content: '' })
const currentLawyer = ref(null)

const filteredLawyers = computed(() => {
  if (selectedSpecialty.value === '全部') return lawyers.value
  return lawyers.value.filter(l => l.specialty === selectedSpecialty.value)
})

const goBack = () => {
  router.back()
}

const selectSpecialty = (tag) => {
  selectedSpecialty.value = tag
}

const onlineConsult = (lawyer) => {
  currentLawyer.value = lawyer
  showConsult.value = true
}

const phoneConsult = (lawyer) => {
  ElMessage.success(`正在为您拨打 ${lawyer.name} 的电话...`)
}

const submitConsult = () => {
  if (!consultForm.value.content.trim()) {
    ElMessage.warning('请输入咨询内容')
    return
  }
  ElMessage.success('咨询已提交，律师将尽快回复')
  showConsult.value = false
  consultForm.value.content = ''
}

onMounted(async () => {
  try {
    const data = await lawyerAPI.getLawyers()
    lawyers.value = data
  } catch (error) {
    console.error('Failed to fetch lawyers:', error)
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
.lawyer-page {
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

.specialty-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.specialty-tags .el-tag {
  cursor: pointer;
}

.lawyer-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lawyer-card {
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 16px;
}

.lawyer-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.lawyer-info {
  flex: 1;
}

.lawyer-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.lawyer-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lawyer-experience {
  font-size: 12px;
  color: var(--text-gray);
}

.lawyer-stats {
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 12px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 12px;
  color: var(--text-gray);
}

.lawyer-actions {
  display: flex;
  gap: 12px;
}

.lawyer-actions .el-button {
  flex: 1;
}

.consult-form {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.consult-actions {
  margin-top: 16px;
}

.consult-actions .el-button {
  width: 100%;
}
</style>