import dayjs from 'dayjs'
import { createWrapper, mocki18n } from '../../helpers'
import ExpireButton from '~/components/cards/PaymentLinkCard/ExpireButton'

describe('Expire date button', () => {
  let wrapper
  const todayDate = dayjs()

  beforeEach(() => {
    wrapper = createWrapper(
      ExpireButton,
      {},
      {
        propsData: {
          id: 1,
          title: 'A title',
          date: todayDate,
          isSelected: false,
        },
      }
    )
  })

  afterEach(() => wrapper.destroy())

  test('It renders the correct information passed', () => {
    const paragraphs = wrapper.findAll('p')
    expect(paragraphs.at(0).text()).toBe('A title')
    expect(paragraphs.at(1).text()).toBe(mocki18n.d(todayDate))
  })

  test('It differentiates between selected and NOT selected', async () => {
    // Test colors with button not selected
    let btn = wrapper.find('.outer-button')
    expect(btn.classes()).toContain('white')
    let text = wrapper.find('p')
    expect(text.classes()).toContain('secondary--text')

    // Select button and test again
    await wrapper.setProps({ isSelected: true })
    btn = wrapper.find('.outer-button')
    expect(btn.classes()).toContain('secondary')
    text = wrapper.find('p')
    expect(text.classes()).toContain('white--text')
  })
})
