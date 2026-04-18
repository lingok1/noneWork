import axios from 'axios'
import Mock from '../mock'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data
    // 处理 mock 数据（直接返回数据）和真实 API（返回 {code, message, data}）
    if (res.code !== undefined) {
      if (res.code !== 200) {
        console.error('API Error:', res.message)
        return Promise.reject(new Error(res.message || 'Error'))
      }
      return res.data
    }
    // 直接返回 mock 数据
    return res
  },
  error => {
    console.error('Request Error:', error.message)
    return Promise.reject(error)
  }
)

export const userAPI = {
  getUserInfo: () => request.get('/user'),
  updateUserInfo: (data) => request.post('/user/update', data)
}

export const bannerAPI = {
  getBanners: () => request.get('/banners')
}

export const functionAPI = {
  getFunctions: () => request.get('/functions')
}

export const socialAPI = {
  getChatList: () => request.get('/chatList'),
  getVirtualAvatars: () => request.get('/virtualAvatars')
}

export const gameAPI = {
  getGames: () => request.get('/games'),
  submitScore: (data) => request.post('/game/score', data)
}

export const jobAPI = {
  getJobs: () => request.get('/jobs'),
  getJobDetail: (id) => request.get(`/jobs/${id}`)
}

export const lawyerAPI = {
  getLawyers: () => request.get('/lawyers'),
  getLawyerDetail: (id) => request.get(`/lawyers/${id}`)
}

export const farewellAPI = {
  getN1Advice: () => request.get('/n1Advice')
}

export const prizeAPI = {
  getPrizes: () => request.get('/prizes'),
  exchangePrize: (id) => request.post('/prizes/exchange', { id })
}

export default request