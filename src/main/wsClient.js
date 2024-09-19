import { app, shell, BrowserWindow, ipcMain, Notification, screen } from 'electron'
import { sendMessageToRenderer } from './index'
import WebSocket from 'ws'
import { wsMsgHandler } from './wsMsgHandler'
//import { getToken } from "./database/db";
import { createWindow } from './notify'
let token = '' // 初始化 token
const wsUrl = 'ws://localhost:9100/ws' // WebSocket 服务器 URL
let ws
let reconnectTimeout
const reconnectInterval = 5000 // 5 秒重连间隔
let heartbeatInterval
const heartbeatTimeout = 30000 // 30 秒心跳间隔

// 启动心跳检测
const startHeartbeat = () => {
  if (!ws) return // 确保 ws 已初始化
  if (heartbeatInterval) clearInterval(heartbeatInterval)

  heartbeatInterval = setInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'heartbeat' }))
      console.log('Heartbeat sent')
    }
  }, heartbeatTimeout)
}

// 停止心跳检测
const stopHeartbeat = () => {
  if (heartbeatInterval) clearInterval(heartbeatInterval)
}

// 尝试重连
const attemptReconnect = () => {
  if (reconnectTimeout) clearTimeout(reconnectTimeout)
  reconnectTimeout = setTimeout(() => {
    console.log('Attempting to reconnect...')
    connectWebSocket(token) // 传递当前 token 进行重连
  }, reconnectInterval)
}

// 处理 WebSocket 错误
const handleError = (error) => {
  console.error(`WebSocket error: ${error.message}`)

  // 根据错误类型采取不同的操作
  if (error.code === 'ECONNREFUSED') {
    console.error('Connection refused. The server might be down or the URL is incorrect.')
    attemptReconnect()
  } else if (error.code === 'EHOSTDOWN') {
    console.error('The server is down. Please check the server status.')
    // 这里可以发送通知或执行其他操作
  } else {
    console.error('An unexpected error occurred:', error)
    // 记录日志或采取其他必要的措施
  }
}

// 连接 WebSocket
const connectWebSocket = (userToken) => {
  token = userToken
  if (ws && ws.readyState !== WebSocket.CLOSED) {
    console.log('WebSocket connection already exists')
    return
  }

  ws = new WebSocket(wsUrl, {
    headers: {
      token: token // 设置请求头
    }
  })

  ws.onopen = () => {
    console.log('Connected to WebSocket server')
    startHeartbeat()
  }

  ws.onmessage = (event) => {
    try {
      const wsMsg = JSON.parse(event.data)
//      console.log(`Received: ${event.data}`)
      // 根据消息类型处理服务器发来的消息
      wsMsgHandler(wsMsg)

    } catch (e) {
      console.log(`Received: ${event.data}`)

      console.log('Failed to process message:', e)
      // 记录错误日志或通知开发人员
    }
  }

  ws.onclose = (event) => {
    console.log('Disconnected from WebSocket server')
    stopHeartbeat()
    if (event.code !== 1000) {
      // 1000 表示正常关闭
      console.log(`Connection closed with code ${event.code}: ${event.reason}`)
    }
    attemptReconnect()
  }

  ws.onerror = handleError
}

// 导出 WebSocket 客户端相关函数
export { connectWebSocket }
