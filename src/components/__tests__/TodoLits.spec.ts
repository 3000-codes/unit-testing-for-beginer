import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TodoList from '../TodoList.vue'

describe('TodoList', () => {
  it('renders properly', () => {
    const wrapper = mount(TodoList)
    const todo = wrapper.get('[data-test="todo"]')
    expect(todo.text()).toBe('Learn Vue.js 3')
  })

    it('adds a new todo', async () => {
        const wrapper = mount(TodoList)
        expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(1)
        wrapper.get('[data-test="new-todo"]').setValue('New todo')
        wrapper.get('[data-test="form"]').trigger('submit')
        await wrapper.vm.$nextTick() // wait for the next tick
        expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(2)
    })

    it("completes a todo", async () => {
        const wrapper = mount(TodoList)
        await wrapper.get('[data-test="todo-checkbox"]').setValue(true)
        expect(wrapper.get('[data-test="todo"]').classes()).toContain('completed')
    })

    it("test trigger events", async () => {
        const wrapper = mount(TodoList)
        
        // 测试点击事件
        await wrapper.get('[data-test="todo-delete"]').trigger('click')
        expect(wrapper.findAll('[data-test="todo"]')).toHaveLength(0)

        // 测试自定义事件（emitted）
        const emitted = wrapper.emitted("increament")
        expect(emitted).toHaveLength(1)
        expect(emitted).toHaveLength(0)

        // 测试自定义事件（trigger）
        
    })
})


