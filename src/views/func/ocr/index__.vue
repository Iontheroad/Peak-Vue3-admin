<template>
  <div>
    <h1>OCR文字</h1>
    <div class="box">
      <img :src="imgRef" />
      <p>{{ ocrStr }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup name="OcrWord">
import { ref } from "vue";

import Tesseract from "tesseract.js";

// 图片
let eng_bw = "https://tesseract.projectnaptha.com/img/eng_bw.png";
let imgRef = ref(eng_bw);

let ocrStr = ref("");

// recognize 第一个参数：图像，第二个：语种
Tesseract.recognize(eng_bw, "eng", { logger: (m) => console.log(m) }).then((d) => {
  console.log(d.data.text);
  ocrStr.value = d.data.text;
});
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
