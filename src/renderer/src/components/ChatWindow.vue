<template>
  <div class="chat-area">
    hhh{{ receiver }}hhh
    <div class="user-info">{{ chatUser }}</div>
    <div class="chat-area-main" @scroll="handleScroll">
      <div
        v-for="(message, index) in messages"
        :key="index"
        ref="child"
        class="chat-msg"
        :class="{ owner: message.senderEmail === store.userEmail }"
      >
        <div class="chat-msg-profile">
          <img class="chat-msg-img" :src="message.profileImage" alt="" />
          <div class="chat-msg-date">{{ message.timestamp }}</div>
        </div>
        <div class="chat-msg-content">
          <div class="chat-msg-text">
            {{ message.content }}
          </div>
        </div>
      </div>
    </div>

    <div class="chat-area-footer">
      <el-input
        v-model="textarea1"
        style="width: 240px"
        autosize
        type="textarea"
        placeholder="Please input"
      />
      <el-button type="primary" @click="sendMessage">发送</el-button>
      <el-button type="primary" @click="ws">ws</el-button>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch, } from 'vue'
import axios from 'axios'
import userInfoStore from '../store/UserInfoStore'
const store = userInfoStore()
const child = ref();
const textarea1 = ref('')
const contact = ref([])
const activeIndex = ref()
const chatUser = ref()
const receiverEmail = ref('')
const emit = defineEmits(['someEvent'])
const props = defineProps({
  receiver: String
  //messages: Array
})
// for (let i = 0; i < 10; i++) {
//   contact.push({
//     profileImage: 'https://q1.qlogo.cn/g?b=qq&nk=2029426587&s=640',
//     username: 'Madison Jones',
//     content: `What time was our meet ${i + 1}`,
//     date: `${20 - i}m`
//   });
// }

const messages = ref([])
// for (let i = 0; i < 20; i++) {
//   messages.push({
//     profileImage: i % 2 === 0 ? 'https://q1.qlogo.cn/g?b=qq&nk=2029426587&s=640' : 'https://q1.qlogo.cn/g?b=qq&nk=1520294039&s=640',
//     date: `Message seen ${1 + Math.floor(Math.random() * 12)}:${Math.floor(Math.random() * 60)}pm`,
//     owner: i % 2 === 1,
//     text: '你好',
//   })
// }
watch(
  () => props.receiver,
  async (newReceiver) => {
    receiverEmail.value = newReceiver
    console.log(newReceiver)
    messages.value = await window.api.getMessageList(store.userEmail, newReceiver)
  }
)
const getChatList = async () => {
  const response = await axios.get('/api/getChatList', {
    params: {
      senderEmail: store.userEmail
    }
  })
  return response.data.data
}

const ws = () => {
  window.api.loginSuccess(store.token)
  getChatList()
  console.log('contact:', contact.value)
  console.log(messages)
}
//监听
watch(
  () => messages.value,
  (newVal) => {
    nextTick(() => {
      child.value[newVal.length - 1].scrollIntoView(); // 关键代码
    });
  },
  {
    deep: true,
  }
)

const sendMessage = async () => {
  const message = {
    senderEmail: store.userEmail,
    receiverEmail: receiverEmail.value,
    content: textarea1.value,
    timestamp: Date.now()
  }
  messages.value.push(message)
  emit('someEvent', receiverEmail.value, textarea1.value)
  //await window.api.sendMessage(message)
  await window.api.upsertChatList('sender', message)
  await window.api.insertMessage([message])

  try {
    const response = await axios.post('/api/sendMessage', message, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 200) {
      // 请求成功
      console.log('Message sent successfully:', response.data)
      // 在这里处理成功的逻辑，例如显示成功消息或更新 UI
    } else {
      // 请求失败
      console.error('Error sending message:', response.data)
      // 在这里处理失败的逻辑，例如显示错误消息
    }
  } catch (error) {
    // 捕获网络错误或其他未预料到的错误
    console.error('Error sending message:', error)
    // 在这里处理错误，例如显示错误消息
  }
}
const getMessages = async () => {
  const response = await axios.get('/api/getMessageList', {
    params: {
      senderEmail: store.userEmail,
      receiverEmail: store.activeReceiver
    }
  })
  console.log(response.data.data)
  return response.data.data
}

window.api.messageReceived((event, message) => {
  if(receiverEmail.value === message.senderEmail) {
    messages.value.push(message)
  }
  console.log(messages.value)
})
onMounted(async () => {
  if (store.activeReceiver) {
    receiverEmail.value = store.activeReceiver
  }
  console.log('你好')
  messages.value = await window.api.getMessageList(store.userEmail, store.activeReceiver)
  console.log(messages.value)
})
</script>
