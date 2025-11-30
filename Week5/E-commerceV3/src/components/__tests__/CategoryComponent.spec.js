import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// mockPush needs to be defined prior to mocking vue-router
let mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush })
}))
import CategoryComponent from '../CategoryComponent.vue'

describe('CategoryComponent navigation behavior', () => {
  beforeEach(() => {
    mockPush = vi.fn()
  })

  it('navigates when clicked inside .category-wrapper', async () => {
    const wrapper = mount({
      template: '<div class="category-wrapper"><CategoryComponent title="Test" :id="123" image="/test.png" /></div>',
      components: { CategoryComponent }
    })
    await wrapper.findComponent(CategoryComponent).trigger('click')
    expect(mockPush).toHaveBeenCalledOnce()
    expect(mockPush).toHaveBeenCalledWith({ name: 'product', params: { id: '123' } })
  })

  it('does not navigate when clicked inside .category-wrapper_big', async () => {
    const wrapper = mount({
      template: '<div class="category-wrapper_big"><CategoryComponent title="TestBig" :isBig="true" :id="456" image="/test.png" /></div>',
      components: { CategoryComponent }
    })
    await wrapper.findComponent(CategoryComponent).trigger('click')
    expect(mockPush).not.toHaveBeenCalled()
  })
})
