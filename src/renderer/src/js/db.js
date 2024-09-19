import axios from 'axios'
import userInfoStore from '../store/UserInfoStore'
const store = userInfoStore()

const fetchContactUsers = async () => {
  try {
    const response = await axios.get('api/contact', {
      params: { email: store.userEmail }
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching contact users:', error)
    throw error
  }
}

const getChatList = async () => {
  const response = await axios.get('/api/getChatList', {
    params: {
      senderEmail: store.userEmail
    }
  })
  return response.data.data
}
