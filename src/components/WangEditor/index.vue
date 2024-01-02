<template>
  <div style="border: 1px solid #cccccc">
    <Toolbar
      style="border-bottom: 1px solid #cccccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
      @on-change="onChange"
    />
  </div>
</template>
<script setup lang="ts">
defineOptions({
  name: "WangEditor"
});
import { onBeforeUnmount, computed, shallowRef, onMounted } from "vue";
import { IToolbarConfig, IEditorConfig } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

export interface RichEditorProps {
  modelValue: string; // 富文本值
  mode?: "default" | "simple"; // 富文本模式 ==> 或 'simple'（默认为 default）
  toolbarConfig?: Partial<IToolbarConfig>; // 工具栏配置
  editorConfig?: Partial<IEditorConfig>; // 编辑器配置
}
const props = withDefaults(defineProps<RichEditorProps>(), {
  mode: "default",
  toolbarConfig: () => {
    return {};
  },
  editorConfig: () => {
    return {
      placeholder: "请输入内容..."
    };
  }
});
const emits = defineEmits<{
  "update:modelValue": [value: string];
}>();

const editorRef = shallowRef(); // 富文本 DOM 元素
const handleCreated = (editor: any) => {
  editorRef.value = editor;
};
const onChange = (editor: any) => {
  // emits("update:modelValue",);
  console.log(editor.getHtml());
  console.log(editor.getText());
};

// 内容 HTML
const valueHtml = computed({
  get() {
    return props.modelValue;
  },
  set(val: string) {
    console.log(val, editorRef.value, editorRef.value.isEmpty());

    if (editorRef.value.isEmpty()) val = "";
    emits("update:modelValue", val);
  }
});

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    // valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
    emits("update:modelValue", "<p>模拟 Ajax 异步设置内容</p>");
  }, 1500);
});

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  editor && editor.destroy();
});
</script>
