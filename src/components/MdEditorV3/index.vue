<template>
  <MdEditor v-model="text" :toolbars="toolbars" />
</template>

<script setup lang="ts">
defineOptions({
  name: "MdEditorV3"
});
import { computed } from "vue";
import { MdEditor, ToolbarNames } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

export interface Props {
  modelValue: string;
  toolbars?: ToolbarNames[];
}

const props = withDefaults(defineProps<Props>(), {
  toolbars: () => {
    return [
      "bold",
      "underline",
      "italic",
      "strikeThrough",
      "-",
      "title",
      "sub",
      "sup",
      "quote",
      "unorderedList",
      "orderedList",
      "task",
      "-",
      "codeRow",
      "code",
      "link",
      "image",
      "table",
      // "mermaid",
      // "katex",
      0,
      1,
      2,
      3,
      "-",
      "revoke",
      "next",
      "save",
      "=",
      "prettier",
      "pageFullscreen",
      "fullscreen",
      "preview",
      "htmlPreview",
      "catalog"
      // "github"
    ];
  }
});
const emits = defineEmits(["update:modelValue"]);

const text = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  }
});
</script>
