import ConfirmDialog from '~/components/UI/Feedback/ConfirmDialog'
import { createWrapper, textContains } from '~/test/helpers'

describe('Confirm dialog modal component', () => {
  let wrapper
  const spyClose = jest.spyOn(ConfirmDialog.methods, 'close')

  beforeEach(() => (wrapper = createWrapper(ConfirmDialog, {}, {})))

  afterEach(() => wrapper.destroy())

  test('It renders the correct passed props on open (buttons, text)', async () => {
    wrapper.vm.open('A title', 'A body', {
      leftBtnText: 'Left button',
      rightBtnText: 'Right button',
    })
    await wrapper.vm.$nextTick()

    textContains(wrapper, '.v-card__title', 'A title')
    textContains(wrapper, '.v-card__text', 'A body')

    const buttons = wrapper.findAll('button')
    expect(buttons.at(0).text()).toBe('Left button')
    expect(buttons.at(1).text()).toBe('Right button')
  })

  test('It handles the correct close param on close', async () => {
    wrapper.vm.open('A title', 'A body')
    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAll('button')
    await buttons.at(1).trigger('click')

    expect(spyClose).toHaveBeenCalledWith(true)
    expect(wrapper.vm.show).toBe(false)

    // Try again clicking the other button
    wrapper.vm.open('A title', 'A body')
    await wrapper.vm.$nextTick()

    await buttons.at(0).trigger('click')

    expect(spyClose).toHaveBeenCalledWith(false)
    expect(wrapper.vm.show).toBe(false)
  })
})
