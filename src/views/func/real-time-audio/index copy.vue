<script lang="ts" setup name="RealTimeAudio">
import { ref } from "vue";
const startButton = ref(null);
const stopButton = ref(null);
let mediaRecorder: MediaRecorder;
let webSocket: WebSocket;

/**
 *
 */
async function connect() {}

async function start() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false }); // 获取麦克风的媒体流

  mediaRecorder = new MediaRecorder(stream); // 创建 MediaRecorder 对象
  // chunks = [];
  // 创建 WebSocket 连接
  webSocket = new WebSocket("wss://www.funasr.com:10096/");
  // webSocket.binaryType = 'arraybuffer'; // 设置binaryType
  webSocket.onopen = () => {
    console.log("WebSocket连接打开");
  };

  webSocket.onclose = () => {
    console.log("WebSocket连接已关闭");
  };

  webSocket.onmessage = function (event) {
    console.log("接收 %d 字节", event.data.byteLength);
    // 在这里处理接收到的二进制数据
  };

  webSocket.onerror = (event) => {
    console.log("WebSocket错误: ", event);
  };

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0 && webSocket.readyState === WebSocket.OPEN) {
      webSocket.send(event.data);
      console.log(event);
    }
  };

  mediaRecorder.start(100); // 每100毫秒发送一次数据
  console.log("Recording started");
}
async function stop() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    console.log("Recording stopped");
  }

  // //  暂停后将切片合并并下载 mp3 格式
  // const blob = new Blob(chunks, { type: 'audio/mp3' });
  // const url = URL.createObjectURL(blob);
  // const link = document.createElement('a');
  // link.href = url;
  // link.download = 'merged.mp3';
  // link.click();
  // URL.revokeObjectURL(url);

  if (webSocket && webSocket.readyState === WebSocket.OPEN) webSocket.close();
}
</script>

<template>
  <div>
    <el-button type="primary" @click="connect">连接</el-button>
    <el-button ref="startButton" @click="start">Start Recording</el-button>
    <el-button ref="stopButton" @click="stop">Stop Recording</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
