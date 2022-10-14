import LinkStatus from '~/components/lists/PaymentLink/LinkStatus'
import { createWrapper, textContains } from '~/test/helpers'
import { linkStatusOptions, listState } from '~/test/paymentLink/List/mocks'

describe('Link status chip component', () => {
  let wrapper

  afterEach(() => wrapper.destroy())

  test('It renders the correct type of chip (active, expired, paid or canceled)', () => {
    wrapper = createWrapper(
      LinkStatus,
      {},
      linkStatusOptions(listState.linkList.results[0])
    )
    textContains(wrapper, 'span', 'Vence')
    wrapper.destroy()

    wrapper = createWrapper(
      LinkStatus,
      {},
      linkStatusOptions(listState.linkList.results[1])
    )
    textContains(wrapper, 'span', 'Vencido')
    expect(wrapper.find('span').classes()).toContain('primary')
    // Assert text color too
    expect(wrapper.find('span').element.style.caretColor).toBe('#D92A5F')
    wrapper.destroy()

    wrapper = createWrapper(
      LinkStatus,
      {},
      linkStatusOptions(listState.linkList.results[2])
    )
    textContains(wrapper, 'span', 'Cancelado')
    expect(wrapper.find('span').classes()).toContain('lightGrey')
    // Assert text color too
    expect(wrapper.find('span').element.style.caretColor).toBe('#7B848F')
    wrapper.destroy()

    wrapper = createWrapper(
      LinkStatus,
      {},
      linkStatusOptions(listState.linkList.results[3])
    )
    textContains(wrapper, 'span', 'Pagado')
    expect(wrapper.find('span').classes()).toContain('green')
    // Assert text color too
    expect(wrapper.find('span').element.style.caretColor).toBe('#2DABB4')
    wrapper.destroy()
  })
})
