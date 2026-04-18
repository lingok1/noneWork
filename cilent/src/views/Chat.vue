<template>
  <div class="page chat-page">
    <header class="page-header">
      <div class="header-content">
        <el-button text :icon="ArrowLeft" @click="goBack" />
        <h1 class="page-title">{{ chatName }}</h1>
        <el-button text :icon="More" />
      </div>
    </header>

    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message-item"
        :class="{ 'message-self': message.isSelf }"
      >
        <div v-if="!message.isSelf" class="message-avatar">
          <el-avatar :size="36" :src="message.avatar" />
        </div>
        <div class="message-content">
          <div class="message-bubble">
            <p class="message-text">{{ message.content }}</p>
          </div>
          <span class="message-time">{{ message.time }}</span>
        </div>
      </div>
    </div>

    <div class="chat-input">
      <div class="input-tools">
        <el-icon :size="22" @click="toggleEmoji"><Sunny /></el-icon>
        <el-icon :size="22" @click="toggleMore"><MoreFilled /></el-icon>
      </div>
      <el-input
        v-model="inputText"
        placeholder="输入消息..."
        @keyup.enter="sendMessage"
      />
      <el-button type="primary" :icon="Promotion" @click="sendMessage" />
    </div>

    <div v-if="showEmoji" class="emoji-picker">
      <div class="emoji-grid">
        <span v-for="emoji in emojis" :key="emoji" class="emoji-item" @click="insertEmoji(emoji)">
          {{ emoji }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, More, Sunny, MoreFilled, Promotion } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const chatId = ref(route.params.id)
const chatName = ref('虚拟同事小李')
const inputText = ref('')
const showEmoji = ref(false)

const messages = ref([
  { isSelf: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily', content: '你好，今天的工作还顺利吗？', time: '10:30' },
  { isSelf: true, content: '挺好的，已经完成了大部分任务', time: '10:31' },
  { isSelf: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily', content: '那太好了！下班一起去喝杯咖啡吗？', time: '10:32' },
  { isSelf: true, content: '好啊，正好放松一下', time: '10:33' }
])

const emojis = ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥']

const messagesContainer = ref(null)

const goBack = () => {
  router.back()
}

const sendMessage = () => {
  if (!inputText.value.trim()) return

  messages.value.push({
    isSelf: true,
    content: inputText.value,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  })

  inputText.value = ''

  nextTick(() => {
    scrollToBottom()
  })
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const toggleEmoji = () => {
  showEmoji.value = !showEmoji.value
}

const toggleMore = () => {
  console.log('Show more options')
}

const insertEmoji = (emoji) => {
  inputText.value += emoji
  showEmoji.value = false
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
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

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.message-self {
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
}

.message-content {
  max-width: 70%;
  display: flex;
  flex-direction: column;
}

.message-self .message-content {
  align-items: flex-end;
}

.message-bubble {
  padding: 10px 14px;
  border-radius: 12px;
  background-color: var(--bg-white);
  box-shadow: var(--shadow-light);
}

.message-self .message-bubble {
  background-color: var(--primary-color);
  color: white;
}

.message-text {
  font-size: 14px;
  line-height: 1.5;
  word-break: break-word;
}

.message-time {
  font-size: 11px;
  color: var(--text-light);
  margin-top: 4px;
}

.chat-input {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: var(--bg-white);
  border-top: 1px solid var(--border-color);
}

.input-tools {
  display: flex;
  gap: 8px;
  color: var(--text-gray);
}

.input-tools .el-icon {
  cursor: pointer;
}

.chat-input .el-input {
  flex: 1;
}

.emoji-picker {
  padding: 12px;
  background-color: var(--bg-white);
  border-top: 1px solid var(--border-color);
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
}

.emoji-item {
  font-size: 24px;
  text-align: center;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.emoji-item:hover {
  background-color: var(--bg-light-gray);
}
</style>