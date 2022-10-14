import BalanceCard from '~/components/cards/Home/BalanceCard'
import { createWrapper } from '~/test/helpers'
import { createStore, options } from '~/test/UI/BalanceCard/mocks'

describe('User balance card', () => {
  let wrapper

  afterEach(() => wrapper.destroy())

  test("It renders logged user's correct balance from store getters", () => {
    wrapper = createWrapper(BalanceCard, createStore('12.50'), options)
    let textSpans = wrapper.findAll('span')

    expect(wrapper.vm.currentBalance).toBe('12.50')

    // It has to check both parts of the balance (int and decimal)
    expect(textSpans.at(0).text()).toContain('12')
    expect(textSpans.at(1).text()).toContain(',50')

    wrapper.destroy()

    // Now change the balance and expect the getters to return it correctly again
    wrapper = createWrapper(BalanceCard, createStore('54321.12345'), options)
    textSpans = wrapper.findAll('span')

    expect(textSpans.at(0).text()).toContain('54321')
    expect(textSpans.at(1).text()).toContain(',12345')
  })
})
