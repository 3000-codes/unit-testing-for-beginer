<template>
  <div>
    <div
      v-for="todo in todos"
      :key="todo.id"
      data-test="todo"
      :class="[todo.completed ? 'completed' : '']"
    >
      {{ todo.text }}
      <input type="checkbox" v-model="todo.completed" data-test="todo-checkbox" />
    </div>

    <form data-test="form" @submit.prevent="createTodo">
      <input data-test="new-todo" v-model="newTodo" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Todo = {
  id: number
  text: string
  completed: boolean
}

defineOptions({
  name: 'TodoList'
})
const emits = defineEmits(['increment'])

const todos = ref<Todo[]>([
  {
    id: 1,
    text: 'Learn Vue.js 3',
    completed: false
  }
])
const newTodo = ref<string>('')
const createTodo = () => {
  todos.value.push({
    id: todos.value.length + 1,
    text: newTodo.value,
    completed: false
  })
  newTodo.value = ''
  emits('increment', todos.value.length)
}
</script>
