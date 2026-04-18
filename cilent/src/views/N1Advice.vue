<template>
  <div class="page n1-advice-page">
    <header class="page-header">
      <div class="header-content">
        <el-button text :icon="ArrowLeft" @click="goBack" />
        <h1 class="page-title">n+1争取建议</h1>
        <el-button text :icon="Share" />
      </div>
    </header>

    <div class="page-content">
      <div class="advice-header">
        <h2 class="advice-title">n+1补偿金争取指南</h2>
        <p class="advice-intro">为您提供专业的离职补偿争取建议，帮助您维护合法权益</p>
      </div>

      <div class="advice-sections">
        <div v-for="(section, index) in adviceData.sections" :key="index" class="advice-section">
          <div class="section-header">
            <span class="section-number">{{ index + 1 }}</span>
            <h3 class="section-title">{{ section.title }}</h3>
          </div>
          <div class="section-content">
            <p v-for="(line, lineIndex) in section.content.split('\n')" :key="lineIndex">{{ line }}</p>
          </div>
        </div>
      </div>

      <div class="calculator-card">
        <h3 class="card-title">n+1计算器</h3>
        <div class="calculator-form">
          <div class="form-item">
            <label class="form-label">工作年限（月）</label>
            <el-input-number v-model="workMonths" :min="1" :max="240" size="default" />
          </div>
          <div class="form-item">
            <label class="form-label">月平均工资（元）</label>
            <el-input-number v-model="monthlySalary" :min="1000" :max="100000" :step="1000" size="default" />
          </div>
          <div class="form-result">
            <span class="result-label">预估补偿金：</span>
            <span class="result-value">{{ calculateN1 }} 元</span>
          </div>
        </div>
      </div>

      <div class="templates-card">
        <h3 class="card-title">常用模板</h3>
        <div class="templates-list">
          <div class="template-item" @click="downloadTemplate('resignation')">
            <el-icon :size="24"><Document /></el-icon>
            <span class="template-name">辞职信模板</span>
            <el-icon :size="16"><Download /></el-icon>
          </div>
          <div class="template-item" @click="downloadTemplate('negotiation')">
            <el-icon :size="24"><ChatDotRound /></el-icon>
            <span class="template-name">谈判话术模板</span>
            <el-icon :size="16"><Download /></el-icon>
          </div>
        </div>
      </div>

      <div class="expert-card">
        <h3 class="card-title">在线咨询</h3>
        <div class="experts-list">
          <div v-for="expert in experts" :key="expert.id" class="expert-item">
            <el-avatar :size="48" :src="expert.avatar" />
            <div class="expert-info">
              <span class="expert-name">{{ expert.name }}</span>
              <span class="expert-title">{{ expert.title }}</span>
            </div>
            <el-button type="primary" size="small" @click="consultExpert(expert)">
              咨询
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Share, Document, Download, ChatDotRound } from '@element-plus/icons-vue'

const router = useRouter()

const workMonths = ref(24)
const monthlySalary = ref(15000)

const adviceData = {
  title: 'n+1补偿金争取指南',
  sections: [
    {
      title: '什么是n+1',
      content: 'n+1是指用人单位在解除劳动合同后，向劳动者支付的经济补偿。n代表在用人单位工作的年限，1代表代通知金。'
    },
    {
      title: '计算方式',
      content: '经济补偿按劳动者在本单位工作的年限，每满一年支付一个月工资的标准向劳动者支付。六个月以上不满一年的，按一年计算；不满六个月的，向劳动者支付半个月工资的经济补偿。'
    },
    {
      title: '谈判技巧',
      content: '1. 了解公司实际情况\n2. 准备好自己的诉求清单\n3. 保持冷静，理性沟通\n4. 适当让步，达成双赢'
    },
    {
      title: '注意事项',
      content: '1. 注意时效，及时主张\n2. 保存好相关证据\n3. 必要时寻求法律援助'
    }
  ]
}

const experts = ref([
  { id: 1, name: '李律师', title: '劳动仲裁专家', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lawyer1' },
  { id: 2, name: '王律师', title: '劳动纠纷资深律师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lawyer2' }
])

const calculateN1 = computed(() => {
  const years = Math.floor(workMonths.value / 12)
  const extraMonth = workMonths.value % 12 >= 6 ? 1 : 0.5
  const totalMonths = years + extraMonth
  return Math.round(totalMonths * monthlySalary.value)
})

const goBack = () => {
  router.back()
}

const downloadTemplate = (type) => {
  ElMessage.success('模板下载成功！')
}

const consultExpert = (expert) => {
  ElMessage.success(`正在连接 ${expert.name}...`)
}
</script>

<script>
import { ElMessage } from 'element-plus'
export default {
  components: { ElMessage }
}
</script>

<style scoped>
.n1-advice-page {
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

.advice-header {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  color: white;
}

.advice-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.advice-intro {
  font-size: 14px;
  opacity: 0.9;
}

.advice-sections {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.advice-section {
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 16px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.section-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
}

.section-content {
  padding-left: 40px;
  font-size: 14px;
  color: var(--text-gray);
  line-height: 1.8;
}

.calculator-card,
.templates-card,
.expert-card {
  background-color: var(--bg-white);
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 12px;
}

.calculator-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-label {
  font-size: 14px;
  color: var(--text-dark);
}

.form-result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: var(--bg-light-gray);
  border-radius: 8px;
}

.result-label {
  font-size: 14px;
  color: var(--text-gray);
}

.result-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--secondary-color);
}

.templates-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.template-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--bg-light-gray);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.template-item:hover {
  background-color: #e8e8e8;
}

.template-name {
  flex: 1;
  font-size: 14px;
  color: var(--text-dark);
}

.experts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.expert-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
}

.expert-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.expert-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-dark);
}

.expert-title {
  font-size: 12px;
  color: var(--text-gray);
}
</style>