<template>
  <el-card class="ocr-box" header="ocr文字识别">
    <div class="box">
      <div class="itemBox">
        <div style="display: flex; flex-direction: row; justify-content: space-between">
          <el-upload
            class="upload-demo"
            ref="upload"
            accept=".png,.jpeg,.gif,.jpg"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :on-change="uploadImg"
            :show-file-list="false"
            :auto-upload="false"
          >
            <el-button>上传图片</el-button>
          </el-upload>
          <el-select
            v-model="lang"
            placeholder="请选择识别语言"
            style="min-width: 100px; margin-left: 20px"
          >
            <el-option
              v-for="item in langSelect"
              :key="item.val"
              :label="item.name"
              :value="item.val"
            />
          </el-select>
          <el-button plain type="text" @click="defaultUSe" style="margin-left: 20px">
            使用默认图片
          </el-button>
        </div>
      </div>
      <div class="itemBox">
        <div style="width: 120px; text-align: left">图片：</div>
        <el-image v-if="urlStr" :src="urlStr" style="width: 800px"></el-image>
      </div>
      <el-divider></el-divider>
      <div class="itemBox">
        <div style="width: 120px; text-align: left">识别结果：</div>
        <div class="resultBox">
          <!-- <pre v-html="ocrStr" class="resultsItem"></pre> -->
          <p ref="resultRef" class="resultsItem">{{ ocrStr }}</p>
        </div>
      </div>
    </div>
  </el-card>
</template>
<!-- ocr文字识别 https://github.com/naptha/tesseract.js -->
<script lang="ts" setup>
import { ElLoading, ElMessage, LoadingOptionsResolved } from "element-plus";
import { ref } from "vue";
import Tesseract from "tesseract.js";
import ocrImg from "./ocrImg.png";

const ocrStr = ref(""); // 识别结果
const urlStr = ref(""); // 图片地址
const lang = ref("chi_sim"); // 语种
const langSelect = ref([
  {
    name: "中文（简体）",
    val: "chi_sim"
  },
  {
    name: "俄文",
    val: "rus"
  },
  {
    name: "英文",
    val: "eng"
  },
  {
    name: "日文",
    val: "jpn"
  }
]);
const resultRef = ref<HTMLElement>();

/**
 * 上传图片
 * @param file
 */
const uploadImg = async (file: any) => {
  urlStr.value = file.raw ? URL.createObjectURL(file.raw) : ocrImg;
  console.log(Tesseract);
  const loading = useLoading({
    target: resultRef.value as HTMLElement,
    // fullscreen: true,
    text: "正在识别图片..."
  });
  try {
    const result = await wordRecognition(urlStr.value, lang.value);
    ocrStr.value = result.data.text;
    console.log(result);
    ElMessage.success("识别完成");
  } catch (error) {
    ElMessage.error("识别失败");
    console.log(error);
  } finally {
    loading.close();
  }
};

/**
 * 使用默认图片
 */
const defaultUSe = () => {
  uploadImg(ocrImg);
};

/**
 * 文字识别
 * @param img
 * @param lang
 * @param option - { logger: (m: any) => console.log(m) }
 */
function wordRecognition(
  img: string,
  lang: string,
  option = {}
): Promise<Tesseract.RecognizeResult> {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(img, lang, option)
      .then((data: Tesseract.RecognizeResult) => {
        resolve(data);
      })
      .catch((err: any) => {
        console.log(err);
        reject(err);
      });
  });
}

/**
 * 使用loading
 * @param option
 */
function useLoading(
  option?: Partial<
    Omit<LoadingOptionsResolved, "target" | "parent"> & {
      target: string | HTMLElement;
      body: boolean;
    }
  >
) {
  const loading = ElLoading.service(option);

  return loading;
}
</script>
<style lang="scss" scoped>
.box {
  margin-top: 30px;
}
.itemBox {
  display: flex;
  flex-direction: row;
  margin: 20px auto;
}
.resultsBox {
  width: 800px;
}
.resultsItem {
  // text-align: left;
  // white-space: pre-wrap;
  // line-height: 30px;
  min-height: 100px;
}
.resultBox {
  width: 800px;
}
</style>
