<template>
  <div class="page job-page">
    <header class="page-header">
      <div class="header-content">
        <el-button text :icon="ArrowLeft" @click="goBack" />
        <h1 class="page-title">职业推荐</h1>
        <el-button text :icon="Filter" @click="showFilter = true" />
      </div>
    </header>

    <div class="page-content">
      <div class="filter-tags">
        <el-tag
          v-for="tag in activeFilters"
          :key="tag"
          closable
          size="small"
          @close="removeFilter(tag)"
        >
          {{ tag }}
        </el-tag>
      </div>

      <div class="job-list">
        <div v-for="job in filteredJobs" :key="job.id" class="job-card" @click="viewJobDetail(job)">
          <div class="job-header">
            <h3 class="job-title">{{ job.title }}</h3>
            <span class="job-salary">{{ job.salary }}</span>
          </div>
          <div class="job-company">
            <el-icon :size="16"><OfficeBuilding /></el-icon>
            <span>{{ job.company }}</span>
          </div>
          <div class="job-location">
            <el-icon :size="16"><Place /></el-icon>
            <span>{{ job.location }}</span>
          </div>
          <div class="job-requirements">
            <el-tag v-for="req in job.requirements" :key="req" size="small" type="info">
              {{ req }}
            </el-tag>
          </div>
          <div class="job-footer">
            <div class="match-score">
              <span class="score-label">匹配度</span>
              <el-progress
                :percentage="job.matchScore"
                :stroke-width="6"
                :color="getMatchColor(job.matchScore)"
                :show-text="false"
                style="width: 60px;"
              />
              <span class="score-value">{{ job.matchScore }}%</span>
            </div>
            <el-button type="primary" size="small" @click.stop="applyJob(job)">
              申请
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <el-drawer v-model="showFilter" title="筛选条件" direction="rtl" size="80%">
      <div class="filter-section">
        <h4 class="filter-title">行业</h4>
        <el-checkbox-group v-model="selectedIndustries">
          <el-checkbox label="互联网" />
          <el-checkbox label="金融" />
          <el-checkbox label="教育" />
          <el-checkbox label="医疗" />
        </el-checkbox-group>
      </div>
      <div class="filter-section">
        <h4 class="filter-title">薪资范围</h4>
        <el-radio-group v-model="selectedSalary">
          <el-radio label="all">不限</el-radio>
          <el-radio label="10k-20k">10k-20k</el-radio>
          <el-radio label="20k-40k">20k-40k</el-radio>
          <el-radio label="40k+">40k以上</el-radio>
        </el-radio-group>
      </div>
      <div class="filter-section">
        <h4 class="filter-title">工作经验</h4>
        <el-radio-group v-model="selectedExperience">
          <el-radio label="all">不限</el-radio>
          <el-radio label="1-3年">1-3年</el-radio>
          <el-radio label="3-5年">3-5年</el-radio>
          <el-radio label="5年+">5年以上</el-radio>
        </el-radio-group>
      </div>
      <div class="filter-actions">
        <el-button @click="resetFilters">重置</el-button>
        <el-button type="primary" @click="applyFilters">确定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft, Filter, OfficeBuilding, Place } from '@element-plus/icons-vue'
import { jobAPI } from '../api'

const router = useRouter()

const jobs = ref([])
const showFilter = ref(false)
const selectedIndustries = ref([])
const selectedSalary = ref('all')
const selectedExperience = ref('all')

const activeFilters = computed(() => {
  const filters = []
  if (selectedSalary.value !== 'all') filters.push(selectedSalary.value)
  if (selectedExperience.value !== 'all') filters.push(selectedExperience.value)
  selectedIndustries.value.forEach(ind => filters.push(ind))
  return filters
})

const filteredJobs = computed(() => {
  return jobs.value
})

const getMatchColor = (score) => {
  if (score >= 90) return '#67C23A'
  if (score >= 70) return '#E6A23C'
  return '#909399'
}

const goBack = () => {
  router.back()
}

const viewJobDetail = (job) => {
  console.log('View job detail:', job)
}

const applyJob = (job) => {
  ElMessage.success(`已申请 ${job.title} 职位！`)
}

const removeFilter = (filter) => {
  if (selectedSalary.value === filter) selectedSalary.value = 'all'
  if (selectedExperience.value === filter) selectedExperience.value = 'all'
  const index = selectedIndustries.value.indexOf(filter)
  if (index > -1) selectedIndustries.value.splice(index, 1)
}

const resetFilters = () => {
  selectedIndustries.value = []
  selectedSalary.value = 'all'
  selectedExperience.value = 'all'
}

const applyFilters = () => {
  showFilter.value = false
  ElMessage.success('筛选条件已应用')
}

onMounted(async () => {
  try {
    const data = await jobAPI.getJobs()
    jobs.value = data
  } catch (error) {
    console.error('Failed to fetch jobs:', error)
  }
})
</script>

<style scoped>
.job-page {
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

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.job-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.job-card {
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.job-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
}

.job-salary {
  font-size: 16px;
  font-weight: 700;
  color: var(--secondary-color);
}

.job-company,
.job-location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-gray);
  margin-bottom: 8px;
}

.job-requirements {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.match-score {
  display: flex;
  align-items: center;
  gap: 8px;
}

.score-label {
  font-size: 12px;
  color: var(--text-gray);
}

.score-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-color);
}

.filter-section {
  margin-bottom: 24px;
}

.filter-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.filter-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
}
</style>