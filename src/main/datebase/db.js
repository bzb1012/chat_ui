import { initDatabase, insertData, deleteData, getData, updateData,db } from './sqliteUtil'

const getContactList = async (userEmail) => {
  return await getData('contact', `where email="${userEmail}"`)
}
const insertContact = (datas) => {
  datas.forEach((data) => {
    insertData('contact', data).then(r => console.log(r))
    console.log(data)
    console.log(1)
  })
}
const insertMessage = (datas) => {
  console.log('insertMessage')
  console.log(datas)

  datas.forEach((data) => {
    insertData('message', data).then(r => console.log(r))
    //console.log(data)
  })
}
const getMessageList = async (userEmail, receiverEmail) => {
  return await getData(
    'message',
    `where sender_email="${userEmail}" and receiver_email="${receiverEmail}" ` +
      `or sender_email="${receiverEmail}" and receiver_email="${userEmail}"`
  )
}
const getChatList = async (userEmail) => {
  return await getData('chat_list', `where sender_email="${userEmail}"`)
}

const upsertChatList = async (sor, datas) => {
  let chatLiatData
  if(sor==='sender'){
    chatLiatData= {
      senderEmail: datas.senderEmail,
      receiverEmail: datas.receiverEmail,
      last_msg: datas.content,
      timestamp: datas.timestamp,
    }
  }
  if (sor === 'receiver') {
    chatLiatData= {
      senderEmail: datas.receiverEmail,
      receiverEmail: datas.senderEmail,
      last_msg: datas.content,
      timestamp: datas.timestamp,
    }
  }


  const count = await getData(
    'chat_list',
    `where sender_email="${chatLiatData.senderEmail}" and receiver_email="${chatLiatData.receiverEmail}"`
  )
  console.log('count:'+count)
  if (count.length > 0) {
    console.log('update聊天列表')
    console.log('count.length')
    await updateData(
      'chat_list',
      chatLiatData,
      {sender_email: chatLiatData.senderEmail,receiver_email: chatLiatData.receiverEmail},
    )
  } else {
    await insertData('chat_list', chatLiatData)
  }
}
const getToken = async (userEmail) => {
  return await getData('token', `where user_email="${userEmail}"`)
}

export { getContactList, insertContact, insertMessage, getMessageList, getToken, upsertChatList,getChatList }
