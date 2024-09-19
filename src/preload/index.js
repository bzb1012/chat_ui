import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  loginSuccess: (userToken) => ipcRenderer.send('login-success', userToken),
  getContactList: (userEmail) => ipcRenderer.invoke('get-contact-list', userEmail),
  insertContact: (data) => ipcRenderer.invoke('insert-contact', data),
  insertMessage: (data) => ipcRenderer.invoke('insert-message', data),
  getChatList: (userEmail) => ipcRenderer.invoke('get-chat-list', userEmail),
  getMessageList: (senderEmail, receiverEmail) =>
    ipcRenderer.invoke('get-message-list', senderEmail, receiverEmail),
  messageReceived: (messageData) => ipcRenderer.on('message-received', messageData),
  upsertChatList: (sor, data) => ipcRenderer.invoke('upsert-chat-list', sor, data),
  sendMessage: (messageData) => ipcRenderer.invoke('send-message', messageData),
  test: () => ipcRenderer.invoke('test-t')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

// contextBridge.exposeInMainWorld('electronAPI', {
//   'login-success': () => ipcRenderer.send(login-success)
// })
