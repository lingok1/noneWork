import Mock from 'mockjs'

const Random = Mock.Random

Random.extend({
  userType: ['同事', '老板', '律师', 'HR'],
  emotionType: ['愤怒', '焦虑', '压力', '委屈'],
  prizeType: ['金币', '优惠券', '实物奖品', '虚拟道具'],
  jobType: ['技术', '产品', '运营', '市场', '人事', '财务'],
  companyType: ['互联网', '金融', '教育', '医疗', '制造', '咨询'],
  lawyerType: ['劳动仲裁', '合同纠纷', '知识产权', '公司法务', '婚姻家庭']
})

const mockData = {
  user: {
    id: '1',
    nickname: '职场新人小王',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    signature: '努力工作，快乐生活！',
    gold: 1250,
    prizeCount: 3,
    couponCount: 5,
    checkInDays: 7,
    virtualAvatar: {
      id: '1',
      name: '职场小明',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      outfit: '商务装'
    }
  },

  banners: [
    { id: 1, image: 'https://picsum.photos/750/300?random=1', title: '新人入职指南', link: '/guide' },
    { id: 2, image: 'https://picsum.photos/750/300?random=2', title: '职场权益保障', link: '/rights' },
    { id: 3, image: 'https://picsum.photos/750/300?random=3', title: '辞旧迎新活动', link: '/farewell' }
  ],

  functions: [
    { id: 1, icon: 'Message', title: '社交找搭子', path: '/social', color: '#4A90E2' },
    { id: 2, icon: 'GameController', title: '宣泄情绪', path: '/game/emotion', color: '#FF9500' },
    { id: 3, icon: 'Calendar', title: '辞旧迎新', path: '/farewell', color: '#67C23A' },
    { id: 4, icon: 'User', title: '我的形象', path: '/profile/avatar', color: '#E6A23C' },
    { id: 5, icon: 'Present', title: '签到抽奖', path: '/game/lottery', color: '#F56C6C' },
    { id: 6, icon: 'Briefcase', title: '职业推荐', path: '/farewell/job', color: '#909399' },
    { id: 7, icon: 'Scale', title: '律师事务所', path: '/farewell/lawyer', color: '#5B8DEF' },
    { id: 8, icon: 'Document', title: '信息收集', path: '/social', color: '#B37FEB' }
  ],

  hotTopics: [
    { id: 1, title: '离职前的最后一天', participants: 1234, excerpt: '分享你离职前的最后一天是怎么度过的...' },
    { id: 2, title: 'n+1赔偿谈判技巧', participants: 892, excerpt: '教你如何在离职谈判中争取到更多权益...' },
    { id: 3, title: '职场PUA应对策略', participants: 2341, excerpt: '遇到职场PUA应该怎么办？专家来支招...' },
    { id: 4, title: '简历优化工作坊', participants: 567, excerpt: '专业HR帮你优化简历，提高面试邀约率...' }
  ],

  chatList: [
    {
      id: '1',
      type: 'virtual',
      virtualType: 'colleague',
      name: '虚拟同事小李',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily',
      lastMessage: '今天的任务完成了吗？',
      lastTime: '10:30',
      unread: 2
    },
    {
      id: '2',
      type: 'virtual',
      virtualType: 'boss',
      name: '虚拟老板张总',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      lastMessage: '明天早上9点开会',
      lastTime: '09:15',
      unread: 0
    },
    {
      id: '3',
      type: 'virtual',
      virtualType: 'lawyer',
      name: '虚拟律师王律师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      lastMessage: '关于劳动仲裁的问题...',
      lastTime: '昨天',
      unread: 1
    }
  ],

  virtualAvatars: {
    colleague: [
      { id: 'c1', name: '小李', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily', status: '在线' },
      { id: 'c2', name: '小张', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang', status: '在线' },
      { id: 'c3', name: '小王', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wang', status: '忙碌' }
    ],
    boss: [
      { id: 'b1', name: '张总', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', status: '在线' },
      { id: 'b2', name: '李总', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lee', status: '离线' }
    ],
    lawyer: [
      { id: 'l1', name: '王律师', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', status: '在线', specialty: '劳动仲裁' },
      { id: 'l2', name: '刘律师', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy', status: '在线', specialty: '合同纠纷' }
    ]
  },

  games: [
    {
      id: 1,
      name: '拳击宣泄',
      icon: 'https://api.dicebear.com/7.x/icons/svg?icon=sport',
      description: '通过拳击游戏释放工作压力',
      participants: 5678
    },
    {
      id: 2,
      name: '吐槽大会',
      icon: 'https://api.dicebear.com/7.x/icons/svg?icon=microphone',
      description: '匿名吐槽工作中的不爽',
      participants: 3421
    },
    {
      id: 3,
      name: '职场飞行棋',
      icon: 'https://api.dicebear.com/7.x/icons/svg?icon=gamepad',
      description: '模拟职场晋升之路',
      participants: 1234
    }
  ],

  jobs: [
    {
      id: 1,
      title: '高级前端工程师',
      company: '字节跳动',
      salary: '35-50K',
      location: '北京',
      requirements: ['3-5年经验', '本科及以上', 'Vue/React精通'],
      matchScore: 95
    },
    {
      id: 2,
      title: '产品经理',
      company: '腾讯',
      salary: '30-45K',
      location: '深圳',
      requirements: ['5年以上经验', '本科及以上', '有社交产品经验'],
      matchScore: 88
    },
    {
      id: 3,
      title: 'UI设计师',
      company: '阿里巴巴',
      salary: '25-40K',
      location: '杭州',
      requirements: ['2年以上经验', '本科及以上', '精通Figma'],
      matchScore: 82
    },
    {
      id: 4,
      title: 'Java开发工程师',
      company: '美团',
      salary: '28-42K',
      location: '上海',
      requirements: ['3年以上经验', '本科及以上', '熟悉微服务'],
      matchScore: 78
    }
  ],

  lawyers: [
    {
      id: 1,
      name: '李明律师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lawyer1',
      specialty: '劳动仲裁',
      experience: '10年',
      rating: 4.9,
      cases: 500,
      phone: '400-123-4567'
    },
    {
      id: 2,
      name: '张华律师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lawyer2',
      specialty: '合同纠纷',
      experience: '8年',
      rating: 4.8,
      cases: 320,
      phone: '400-234-5678'
    },
    {
      id: 3,
      name: '王芳律师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lawyer3',
      specialty: '知识产权',
      experience: '12年',
      rating: 4.9,
      cases: 680,
      phone: '400-345-6789'
    }
  ],

  n1Advice: {
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
  },

  prizes: [
    { id: 1, name: '50金币', image: 'https://api.dicebear.com/7.x/identicon/svg?seed=gold', status: '未使用', time: '2026-04-15' },
    { id: 2, name: '新人优惠券', image: 'https://api.dicebear.com/7.x/identicon/svg?seed=coupon', status: '已使用', time: '2026-04-10' },
    { id: 3, name: '神秘礼包', image: 'https://api.dicebear.com/7.x/identicon/svg?seed=gift', status: '未使用', time: '2026-04-18' }
  ]
}

Mock.setup({
  timeout: '200-500'
})

Mock.mock(/\/api\/user/, 'get', mockData.user)
Mock.mock(/\/api\/banners/, 'get', mockData.banners)
Mock.mock(/\/api\/functions/, 'get', mockData.functions)
Mock.mock(/\/api\/hotTopics/, 'get', mockData.hotTopics)
Mock.mock(/\/api\/chatList/, 'get', mockData.chatList)
Mock.mock(/\/api\/virtualAvatars/, 'get', mockData.virtualAvatars)
Mock.mock(/\/api\/games/, 'get', mockData.games)
Mock.mock(/\/api\/jobs/, 'get', mockData.jobs)
Mock.mock(/\/api\/lawyers/, 'get', mockData.lawyers)
Mock.mock(/\/api\/n1Advice/, 'get', mockData.n1Advice)
Mock.mock(/\/api\/prizes/, 'get', mockData.prizes)

export default Mock