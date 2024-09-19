<template>
  <Layout>
    <template #left-container>
      <div class="contact-list">
        <template v-for="item in partLists">
          <div class="part-title">{{ item.partName }}</div>
          <div v-for="sub in item.children" class="part-list">
            <div class="part-box">
              <div class="avatar">
                <img :src="sub.avatarUrl" alt="" />
              </div>
              {{ sub.remark }}
            </div>
          </div>
        </template>
      </div>
    </template>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import userInfoStore from '../store/UserInfoStore'
const friendsData = ref([])
const store = userInfoStore()
const partLists = ref([
  {
    partName: '新的朋友',
    children: [
      {
        name: '新的朋友',
        icon: '',
        path: ''
      }
    ]
  },
  {
    partName: '群聊',
    children: [
      {
        name: '一家亲',
        icon: '',
        path: ''
      }
    ]
  },
  {
    partName: '朋友',
    children: friendsData
  }
])

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
const test = () => {
  const t = window.api.test()
  console.log(t)
}
onMounted(async () => {
  friendsData.value = await window.api.getContactList(store.userEmail)
  console.log(friendsData.value)
})
</script>

<style>
.avatar {
  img {
    width: 40px;
    height: 40px;
    margin: 10px;
  }
}
.part-box {
  display: flex;
}
.contact-list{
  height: 100%;
  overflow: auto;
}
</style>
