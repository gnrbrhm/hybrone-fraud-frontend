import { shallowMount } from '@vue/test-utils'
import { createLocalVue, mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import api from '@/middleware'

const localVue = createLocalVue()
localVue.use(api)
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})

test('increments counter value on click', async () => {
  const wrapper = mount(HelloWorld)
  const text = wrapper.find('h1')

  expect(text.text()).toContain('')

  await text.trigger('click')

  expect(text.text()).toContain('Merhaba Dünya')
})
