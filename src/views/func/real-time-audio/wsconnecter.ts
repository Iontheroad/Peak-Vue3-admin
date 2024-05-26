import { ElMessage } from "element-plus";

interface Config {
  msgHandler: (event: MessageEvent) => void;
  stateHandler: (state: 0 | 1 | 2 | 3) => void;
  url: string;
}

interface Request {
  chunk_size: number[]; // 这是一个数组，包含了分块大小的值。在这个例子中，分块大小被设置为5, 10, 5。这可能用于指定音频数据分块的大小，用于流式传输。
  wav_name: string; // 这是一个字符串，代表音频文件的名称或标识符。在这里设置为 'h5'。
  is_speaking: boolean; // 用来指示是否正在说话或者是否应该开始处理音频流。
  chunk_interval: number; // 表示分块的时间间隔，单位可能是毫秒。这里设置为10。
  itn: boolean; // 是否关闭: 逆文本标准化(ITN)
  mode: `2pass` | `online` | `offline`; // 选择asr模型模式:
  hotwords: string; // 热词配置，key 为热词，value 为权重 例如：{"阿里巴巴":20,"hello world":40}
  wav_format?: string; // 音频格式
  audio_fs?: number; // 音频采样率
}

enum WebSocketStatus {
  CONNECTING, // CONNECTING：表示WebSocket正在连接中。
  OPEN, // OPEN：表示WebSocket已经连接成功。
  CLOSING, // CLOSING：表示WebSocket正在关闭连接。
  CLOSED // CLOSED：表示WebSocket连接已经关闭。
}

// 0(WebSocket.CONNECTING);
// 正在链接中;

// 1(WebSocket.OPEN);
// 已经链接并且可以通讯;

// 2(WebSocket.CLOSING);
// 连接正在关闭;

// 3(WebSocket.CLOSED);
// 连接已关闭或者没有链接成功;

/**
 * Copyright FunASR (https://github.com/alibaba-damo-academy/FunASR). All Rights
 * Reserved. MIT License  (https://opensource.org/licenses/MIT)
 */
/* 2021-2023 by zhaoming,mali aihealthx.com */
export class WebSocketConnectMethod {
  private speechSocket: WebSocket | null = null;
  private msgHandler: (event: MessageEvent) => void;
  private stateHandler: (state: WebSocketStatus) => void;
  private url: string;

  constructor(config: Config) {
    this.msgHandler = config.msgHandler;
    this.stateHandler = config.stateHandler;
    this.url = config.url;
  }

  wsConnect() {
    if (!this.url.match(/wss:\/\/\S*|ws:\/\/\S*/))
      return ElMessage.warning("请检查wss地址正确性");
    if (!("WebSocket" in window)) return ElMessage.warning("您的浏览器不支持 WebSocket");

    this.speechSocket = new WebSocket(this.url);
    this.stateHandler(WebSocketStatus.OPEN);
    this.speechSocket.onopen = () => {
      const request: Request = {
        chunk_size: [5, 10, 5],
        wav_name: "h5",
        is_speaking: true,
        chunk_interval: 10,
        itn: false,
        mode: "2pass",
        hotwords: '{"阿里巴巴":20,"hello world":40}'
      };

      console.log("发送请求: " + JSON.stringify(request));
      this.speechSocket!.send(JSON.stringify(request));
      ElMessage.success("WebSocket 连接成功");
      this.stateHandler(WebSocketStatus.OPEN);
    };
    this.speechSocket.onclose = () => {
      this.stateHandler(WebSocketStatus.CLOSED);
    };
    this.speechSocket.onmessage = (e: MessageEvent): void => {
      this.msgHandler(e);
    };
    this.speechSocket.onerror = (e: Event) => {
      const errorMessage = (e as ErrorEvent).message || "未知错误";
      ElMessage.error(errorMessage);
      console.log("WebSocket 错误: ", e);
      this.stateHandler(WebSocketStatus.CLOSED);
    };
  }

  wsClose(this: WebSocketConnectMethod): void {
    // console.log("停止 WebSocket 连接");
    ElMessage.info("停止 WebSocket 连接");
    this.speechSocket?.close();
  }

  wsSend(oneData: any): void {
    if (this.speechSocket && this.speechSocket.readyState === WebSocket.OPEN) {
      this.speechSocket.send(oneData);
    }
  }
}
