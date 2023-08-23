<template>
  <div class="drag-task-container">
    <el-card class="card-box" shadow="hover" header="拖动任务">
      <NoticeBar
        text="红色框框为可移动区域❗❗红色框框为可移动区域❗❗"
        leftIcon="iconfont icon-tongzhi2"
        rightIcon="ele-ArrowRight"
        background="#e1faf1"
        color="#78f000"
      />
      <div class="drag-task-box">
        <div
          v-for="(todo, index) in todoList"
          :key="todo.id"
          :class="`todo todo-${index + 1}`"
        >
          <Task :list="todo.list" :group="todo.group" />
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts" name="DragTask">
import { reactive, toRefs } from "vue";
import Task from "./Task.vue";
const data = reactive({
  todoList: [
    {
      id: 1,
      group: "todo",
      list: [
        { name: "Peak", id: 1 },
        { name: "Peak", id: 2 },
        { name: "Peak", id: 3 },
        { name: "Peak", id: 4 },
      ],
    },
    {
      id: 2,
      group: "todo",
      list: [
        { name: "Peak", id: 5 },
        { name: "Peak", id: 6 },
        { name: "Peak", id: 7 },
      ],
    },
    {
      id: 3,
      group: "todo",
      list: [
        { name: "Peak", id: 8 },
        { name: "Peak", id: 9 },
        { name: "Peak", id: 10 },
      ],
    },
  ],
});

let { todoList } = toRefs(data);
</script>
<style lang="scss">
.drag-task-container {
  flex: 1;
  .card-box {
    height: 100%;
  }
  .drag-task-box {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
    .todo {
      width: 300px;
      height: 340px;
      padding: 10px 10px 100px;
      margin: 10px;

    overflow-y: auto;
    background: #f0f0f0;
    border-radius: 3px;
  }
  .todo-1 {
    background: linear-gradient(135deg, #fce38a, #f38181);
  }
  .todo-2 {
    background: linear-gradient(135deg, #17ead9, #6078ea);
  }
  .todo-3 {
    background: linear-gradient(135deg, #42e695, #3bb2b8);
  }
}
</style>
