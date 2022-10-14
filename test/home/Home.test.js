import { options } from './mocks'
import index from '~/pages'
import { createWrapperShallow } from '~/test/helpers'

describe('Home page test', () => {
  let wrapper

  beforeEach(() => (wrapper = createWrapperShallow(index, {}, options)))

  afterEach(() => wrapper.destroy())

  test('All the homepage elements are rendered', () => {
    const balanceSummary = wrapper.findComponent({ name: 'BalanceSummary' })
    const USDCtooltip = wrapper.findComponent({ name: 'Tooltip' })
    const movementsSummary = wrapper.findComponent({ name: 'MovementsSummary' })

    expect(balanceSummary.exists()).toBeTruthy()
    expect(USDCtooltip.exists()).toBeTruthy()
    expect(movementsSummary.exists()).toBeTruthy()
  })
})
