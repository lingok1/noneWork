<template>
  <div class="page avatar-page">
    <header class="page-header">
      <div class="header-content">
        <el-button text :icon="ArrowLeft" @click="goBack" />
        <h1 class="page-title">形象装扮</h1>
        <el-button text @click="saveAvatar">保存</el-button>
      </div>
    </header>

    <div class="page-content">
      <div class="avatar-preview">
        <el-avatar :size="150" :src="currentAvatar.image" />
        <p class="avatar-name">{{ currentAvatar.name }}</p>
        <p class="avatar-outfit">{{ currentAvatar.outfit }}</p>
      </div>

      <el-tabs v-model="activeTab">
        <el-tab-pane label="头部" name="head">
          <div class="items-grid">
            <div
              v-for="item in headItems"
              :key="item.id"
              class="item-card"
              :class="{ selected: selectedItems.head === item.id }"
              @click="selectItem('head', item)"
            >
              <el-avatar :size="50" :src="item.image" />
              <span class="item-name">{{ item.name }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="身体" name="body">
          <div class="items-grid">
            <div
              v-for="item in bodyItems"
              :key="item.id"
              class="item-card"
              :class="{ selected: selectedItems.body === item.id }"
              @click="selectItem('body', item)"
            >
              <el-avatar :size="50" :src="item.image" />
              <span class="item-name">{{ item.name }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="服装" name="clothing">
          <div class="items-grid">
            <div
              v-for="item in clothingItems"
              :key="item.id"
              class="item-card"
              :class="{ selected: selectedItems.clothing === item.id }"
              @click="selectItem('clothing', item)"
            >
              <el-avatar :size="50" :src="item.image" />
              <span class="item-name">{{ item.name }}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配饰" name="accessory">
          <div class="items-grid">
            <div
              v-for="item in accessoryItems"
              :key="item.id"
              class="item-card"
              :class="{ selected: selectedItems.accessory === item.id }"
              @click="selectItem('accessory', item)"
            >
              <el-avatar :size="50" :src="item.image" />
              <span class="item-name">{{ item.name }}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="action-buttons">
        <el-button type="primary" size="large" @click="shareAvatar">
          分享形象
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()

const activeTab = ref('head')
const currentAvatar = ref({
  id: '1',
  name: '职场小明',
  image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  outfit: '商务装'
})

const selectedItems = ref({
  head: null,
  body: null,
  clothing: null,
  accessory: null
})

const headItems = ref([
  { id: 'h1', name: '短发', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1' },
  { id: 'h2', name: '长发', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2' },
  { id: 'h3', name: '卷发', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3' }
])

const bodyItems = ref([
  { id: 'b1', name: '标准', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4' },
  { id: 'b2', name: '健壮', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5' }
])

const clothingItems = ref([
  { id: 'c1', name: '商务装', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=6' },
  { id: 'c2', name: '休闲装', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=7' },
  { id: 'c3', name: '运动装', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=8' }
])

const accessoryItems = ref([
  { id: 'a1', name: '眼镜', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=9' },
  { id: 'a2', name: '手表', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=10' }
])

const goBack = () => {
  router.back()
}

const selectItem = (category, item) => {
  selectedItems.value[category] = item.id
}

const saveAvatar = () => {
  ElMessage.success('形象保存成功！')
  router.back()
}

const shareAvatar = () => {
  ElMessage.success('分享链接已复制到剪贴板！')
}
</script>

<script>
import { ElMessage } from 'element-plus'
export default {
  components: { ElMessage }
}
</script>

<style scoped>
.avatar-page {
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

.avatar-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-color: var(--bg-white);
  border-radius: 12px;
  margin-bottom: 16px;
}

.avatar-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-dark);
  margin-top: 12px;
}

.avatar-outfit {
  font-size: 14px;
  color: var(--text-gray);
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 12px 0;
}

.item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  background-color: var(--bg-white);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.item-card:hover {
  transform: scale(1.05);
}

.item-card.selected {
  border-color: var(--primary-color);
  background-color: rgba(74, 144, 226, 0.05);
}

.item-name {
  font-size: 12px;
  color: var(--text-dark);
  margin-top: 8px;
  text-align: center;
}

.action-buttons {
  margin-top: 20px;
}

.action-buttons .el-button {
  width: 100%;
}
</style>