<script lang="ts" setup name="RealTimeAudio">
import Recorder from "recorder-core";
import "recorder-core/src/engine/wav";
import "recorder-core/src/engine/pcm";
import { WebSocketConnectMethod } from "./wsconnecter";
import { ref } from "vue";

const socketState = ref(3); // 连接状态
const audioText = ref(""); //
let rec_text = ""; // 在线查询查询结果
let offline_text = ""; // 对于离线查询结果
const socket = new WebSocketConnectMethod({
  url: "wss://www.funasr.com:10096/",
  stateHandler: (state) => {
    socketState.value = state;
  },
  msgHandler: (msg) => {
    console.log("我是接收到的信息", msg);

    let text = "" + JSON.parse(msg.data)["text"];
    let mode = JSON.parse(msg.data)["mode"]; //
    let is_final = JSON.parse(msg.data)["is_final"];
    let timestamp = JSON.parse(msg.data)["timestamp"];
    if (mode == "2pass-offline" || mode == "offline") {
      offline_text = `<p>${offline_text + handleWithTimestamp(text, timestamp)}</p>`; //text; //.replace(/ +/g,"");
      rec_text = offline_text;
    } else {
      rec_text = rec_text + `<p>${text}</p>`; //.replace(/ +/g,"");
    }
    // let varArea = document.getElementById("varArea");
    // console.log(text, mode, is_final, timestamp, rec_text, offline_text);

    audioText.value = rec_text;
  }
});

function handleWithTimestamp(tmptext: string, tmptime: string | null) {
  console.log("tmptext: " + tmptext);
  console.log("tmptime: " + tmptime);
  if (tmptime == null || tmptime == "undefined" || tmptext.length <= 0) {
    return tmptext;
  }
  tmptext = tmptext.replace(/。|？|，|、|\?|\.|\ /g, ","); // in case there are a lot of "。"
  let words = tmptext.split(","); // split to chinese sentence or english words
  let jsontime = JSON.parse(tmptime); //JSON.parse(tmptime.replace(/\]\]\[\[/g, "],[")); // in case there are a lot segments by VAD
  let char_index = 0; // index for timestamp
  let text_withtime = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i] == "undefined" || words[i].length <= 0) {
      continue;
    }
    console.log("words===", words[i]);
    console.log("words: " + words[i] + ",time=" + jsontime[char_index][0] / 1000);
    if (/^[a-zA-Z]+$/.test(words[i])) {
      // if it is english
      text_withtime =
        text_withtime + jsontime[char_index][0] / 1000 + ":" + words[i] + "\n";
      char_index = char_index + 1; //for english, timestamp unit is about a word
    } else {
      // if it is chinese
      text_withtime =
        text_withtime + jsontime[char_index][0] / 1000 + ":" + words[i] + "\n";
      char_index = char_index + words[i].length; //for chinese, timestamp unit is about a char
    }
  }
  return text_withtime;
}

/**
 * 连接
 */
async function connect() {
  socket.wsConnect();
  isRec = true;
}

const rec = Recorder({
  type: "pcm",
  bitRate: 16,
  sampleRate: 16000,
  onProcess: recProcess // 录音
});

let sampleBuf = new Int16Array();
function recProcess(
  buffer: string | any[],
  powerLevel: any,
  bufferDuration: number,
  bufferSampleRate: any,
  newBufferIdx: any,
  asyncEnd: any
) {
  // console.log(powerLevel, bufferDuration, bufferSampleRate, newBufferIdx, "进度");

  if (isRec === true) {
    let data_48k = buffer[buffer.length - 1];

    let array_48k = new Array(data_48k);
    let data_16k = Recorder.SampleData(array_48k, bufferSampleRate, 16000).data;

    sampleBuf = Int16Array.from([...sampleBuf, ...data_16k]);
    let chunk_size = 960; // for asr chunk_size [5, 10, 5]
    console.log("" + bufferDuration / 1000 + "s");

    // info_div.innerHTML = "" + bufferDuration / 1000 + "s";
    while (sampleBuf.length >= chunk_size) {
      const sendBuf = sampleBuf.slice(0, chunk_size);
      sampleBuf = sampleBuf.slice(chunk_size, sampleBuf.length);
      socket.wsSend(sendBuf);
    }
  }
}

let isRecording = ref<boolean>(false); // 是否已经在录制
let isRec = false;
/**
 * 开始录制
 */
async function start() {
  rec.open(function () {
    rec.start();
    isRecording.value = true;
  });
}

const audioSrc = ref("");
/**
 * 停止
 */
async function stop() {
  let chunk_size = [5, 10, 5];
  let request = {
    chunk_size: chunk_size,
    wav_name: "h5",
    is_speaking: false,
    chunk_interval: 10,
    mode: "2pass"
  };
  // console.log(request);
  if (sampleBuf.length > 0) {
    socket.wsSend(sampleBuf);
    console.log("sampleBuf.length" + sampleBuf.length);
    sampleBuf = new Int16Array();
  }
  socket.wsSend(JSON.stringify(request));
  isRecording.value = false;
  socket.wsClose();
  if (true) {
    //wait 3s for asr result
    setTimeout(function () {
      socket.wsClose();
      console.log("关闭 websocket!");
    }, 3000);

    rec.stop(
      function (blob: Blob, duration: number) {
        console.log(blob, duration);
        const data = { sampleRate: 16000, bitRate: 16, blob: blob };
        // 将PCM格式的录音数据转换为WAV格式。
        Recorder.pcm2wav(
          data,
          function (theblob: Blob | MediaSource, duration: number) {
            console.log(theblob);
            audioSrc.value = (window.URL || webkitURL).createObjectURL(theblob);
            rec.close(); //释放录音资源
          },
          function (msg: any) {
            console.log(msg);
          }
        );
      },
      function (errMsg: string) {
        console.log("录音失败: " + errMsg);
      }
    );
  }
}
</script>

<template>
  <div>
    <el-alert
      type="success"
      title="基于WebSocket的实时音频识别 : FunASR"
      description=" https://github.com/alibaba-damo-academy/FunASR/blob/main/runtime/docs/SDK_advanced_guide_online_zh.md"
    ></el-alert>
    <el-divider></el-divider>
    <el-button type="success" :disabled="!(socketState === 3)" @click="connect">
      连接
    </el-button>
    <!-- Recording -->
    <el-button type="primary" :disabled="socketState === 3 || isRecording" @click="start">
      开始录制
    </el-button>
    <el-button type="danger" :disabled="socketState === 3 || !isRecording" @click="stop">
      关闭录制
    </el-button>

    <div class="audio-box">
      <audio :src="audioSrc" controls></audio>
      <el-card>
        <template #header>实时音频识别</template>
        <div id="audio-text" v-html="audioText"></div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.audio-box {
  width: 100%;
  height: 100px;

  // background-color: #bbbbbb;
}
</style>
