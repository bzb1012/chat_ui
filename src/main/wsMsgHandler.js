import { createWindow } from './notify'
const sound = require('sound-play')
import { sendMessageToRenderer } from './index'
import {insertContact,upsertChatList,insertMessage} from './datebase/db'
const wsMsgHandler = (wsMsg) => {
  switch (wsMsg.messageType) {
    case 'message':
     // console.log('Handling messageType1')
      sound.play('D:\\audio.mp3')

      upsertChatList('receiver',wsMsg.messageData)

      insertMessage([wsMsg.messageData])
      //向渲染进程发送信息
      sendMessageToRenderer('message-received', wsMsg.messageData)

      break
    case 'Heartbeat':
      // 处理消息类型2
      console.log('Heartbeat')
      break
    // 其他消息类型
    default:
      console.warn(`Unknown message type: ${wsMsg.messageType}`)
  }
}
export { wsMsgHandler }
