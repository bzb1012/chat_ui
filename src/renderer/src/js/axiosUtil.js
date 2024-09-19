import axios from 'axios'
import userInfoStore from '../store/UserInfoStore'
const store = userInfoStore()
const sendMessage = async () => {
  const message = {
    senderEmail: store.userEmail,
    receiverEmail: receiverEmail.value,
    content: textarea1.value,
    timestamp: Date.now(),
  }
  messages.value.push(message)
  const messageData = new URLSearchParams()

  try {
    const response = await axios.post('/api/sendMessage', messageData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
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
  const response = await axios.get('/api/getMessageList', {params:{
      senderEmail: store.userEmail,
      receiverEmail: receiverEmail.value,
    }})
  messages.value=response.data.data
}
