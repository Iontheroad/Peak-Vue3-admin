<script setup lang="ts" name="Language">
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useGlobalStore } from "@/store";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const globalStore = useGlobalStore();
const i18n = useI18n();

const languageList = [
  { label: "简体中文", value: "zh" },
  { label: "English", value: "en" }
];
const language = computed(() => globalStore.language);
function handleSetLanguage(lang: "zh" | "en") {
  i18n.locale.value = lang;
  globalStore.changeLanguage(lang);
}
</script>

<template>
  <div class="language">
    <el-dropdown trigger="click" @command="handleSetLanguage">
      <SvgIcon class="icon" icon-name="header-language" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in languageList"
            :key="item.value"
            :command="item.value"
            :disabled="language === item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.language {
  // margin-right: 20px;
  .icon {
    font-size: 26px;
    cursor: pointer;
    outline: none;
  }
}
</style>
