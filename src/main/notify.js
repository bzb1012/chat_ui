//通知
const { BrowserWindow, screen } = require('electron')
const createWindow =()=> {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    y: 0,
    x: 0,
    frame: false, // 无边框
    skipTaskbar: true, // 使窗口不显示在任务栏中
    movable: false,  // 禁止窗口被用户移动
    resizable: false, // 禁止窗口手动调整窗口大小
    fullscreenable: false, // 禁止窗口可以进入全屏状态
    alwaysOnTop: true, // 窗口是否永远在别的窗口的上面
  })
  win.loadFile('./src/main/html/customNotification.html')
// 定位到桌面右上角
  const sizeObj = screen.getPrimaryDisplay().workAreaSize;
  const { width, height } = sizeObj;
  const [cwidth, cheight] = win.getContentSize();
  const left = parseInt(width - (cwidth || 0) - 5);
  const top = 10;
  win.setPosition(left, top);

  win.showInactive(); // 显示但不聚焦于窗口（建议做延时处理）
win.show()
}
export { createWindow }
