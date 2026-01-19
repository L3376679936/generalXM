const socket = {
  connectURL: "", websocket: null, // 开启标识
  socket_open: false, // 心跳 timer
  hearbeat_timer: null, // 心跳发送频率
  hearbeat_interval: 45000, // 是否自动重连
  is_reonnect: true, // 重连次数
  reconnect_count: 5, // 已发起重连次数
  reconnect_current: 1, // 网络错误提示此时
  ronnect_number: 0, // 重连 timer
  reconnect_timer: null, // 重连频率
  reconnect_interval: 5000, // 事件消息
  selfMessage: null,
  init: (connectURL, receiveMessage,audioRef) => {
    console.log("socket进来了===");
    if (!("WebSocket" in window)) {
      return null;
    }
    socket.connectURL = connectURL;
    socket.websocket = new WebSocket(connectURL);
    socket.websocket.onmessage = (e) => {
      if (receiveMessage) {
        socket.selfMessage =receiveMessage
        receiveMessage(e,audioRef);
      }
    };
    socket.websocket.onclose = (e) => {
      clearInterval(socket.hearbeat_interval);
      socket.socket_open = false;
// 需要重新连接
      if (socket.is_reonnect) {socket.reconnect_timer = setTimeout(() => {
// 超过重连次数
        if (socket.reconnect_current > socket.reconnect_count) {
          clearTimeout(socket.reconnect_timer);
          socket.is_reonnect = false;
          return;
        }
// 记录重连次数
        socket.reconnect_current++;
        console.log(socket.reconnect_current);
        socket.reconnect(connectURL, receiveMessage,audioRef);
      }, socket.reconnect_interval);
      }
    };
// 连接成功
    socket.websocket.onopen = function () {
      socket.socket_open = true;
      socket.is_reonnect = true;
// 开启心跳
// socket.heartbeat()
    };
// 连接发生错误
    socket.websocket.onerror = function () { };
  },send: (data, callback = null) => {
// 开启状态直接发送
    if (socket.websocket.readyState === socket.websocket.OPEN) {
      socket.websocket.send(JSON.stringify(data));
      if (callback) {
        callback();
      }
// 正在开启状态，则等待 1s 后重新调用
    } else {
      clearInterval(socket.hearbeat_timer);
      if (socket.ronnect_number < 1) {
      }
      socket.ronnect_number++;
    }
  },receive: (message) => {
    return message;
  },heartbeat: () => {
    if (socket.hearbeat_timer) {
      clearInterval(socket.hearbeat_timer);
    }
    socket.hearbeat_timer = setInterval(() => {
      let data = {
        content: "ping", };
      var sendDara = {
        data: JSON.stringify(data), };
      socket.send(sendDara);
    }, socket.hearbeat_interval);
  },close: () => {
    clearInterval(socket.hearbeat_interval);
    socket.is_reonnect = false;
    socket.websocket.close();
  },/**
   * 重新连接
   */
    // 发送UTF-8字符串
    sendUTF: (data, callback = null) => {
      if (socket.websocket.readyState === socket.websocket.OPEN) {
        // 如果WebSocket连接已打开，直接发送UTF字符串
        socket.websocket.send(data);
        console.log("发送UTF数据:", data);
        if (callback) {
          callback();
        }
      } else {
        // 如果WebSocket连接未打开，1秒后重试
        setTimeout(() => {
          socket.sendUTF(data, callback);
        }, 1000);
      }
    },
  
    // 发送二进制数据（如ArrayBuffer）
    sendBytes: (data, callback = null) => {
      if (socket.websocket.readyState === socket.websocket.OPEN) {
        // 如果WebSocket连接已打开，直接发送二进制数据
        if (data instanceof ArrayBuffer || data instanceof Blob) {
          socket.websocket.send(data);
          console.log("发送二进制数据:", data);
        } else {
          console.error("数据类型不支持，必须是ArrayBuffer或Blob");
        }
        if (callback) {
          callback();
        }
      } else {
        // 如果WebSocket连接未打开，1秒后重试
        setTimeout(() => {
          socket.sendBytes(data, callback);
        }, 1000);
      }
    },
  reconnect: (connectURL, receiveMessage,audioRef) => {
    if (socket.websocket && !socket.is_reonnect) {
      socket.close();
    }
    socket.init (connectURL, receiveMessage,audioRef)
    // const num = new Date().getTime() + "123";
    // socket.init(`ws://49.74.127.23/websocket/${num}`, socket.selfMessage);
    // socket.init(`wss://jsgsn.cevmp.cn/websocket/${num}`, socket.selfMessage);
// socket.init(`wss://10.130.24.13/websocket/${num}`, socket.selfMessage);
// socket.init(`wss://avatar.cn-huadong-1.xf-yun.com/v1/interact`, socket.selfMessage);
  }, };
export default socket;
