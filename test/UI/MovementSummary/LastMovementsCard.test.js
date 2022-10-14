import { createStore, mockMovementList } from './mocks'
import LastMovementsCard from '~/components/cards/Home/LastMovementsCard'
import { createWrapper, mocki18n, textContains } from '~/test/helpers'
import { getLocalizedDate } from '~/utils/misc-funcs'

describe('Movement Summary component test', () => {
  let wrapper

  afterEach(() => wrapper.destroy())

  test('It renders ONLY the last 3 movements if they exist', () => {
    wrapper = createWrapper(LastMovementsCard, createStore(false), {})
    let tableRows = wrapper.findAll('tr').wrappers

    // Even though there are 5 movements, only 3 are rendered
    expect(tableRows.length).toBe(3)

    wrapper.destroy()

    // Test that if there are for example, only 2 movements, it still renders fine
    wrapper = createWrapper(LastMovementsCard, createStore(false, 2), {})
    tableRows = wrapper.findAll('tr').wrappers
    expect(tableRows.length).toBe(2)
  })

  test('If there are no movements, it renders a message', () => {
    wrapper = createWrapper(LastMovementsCard, createStore(true), {})

    // Expect the table to not exist
    expect(wrapper.find('table').exists()).toBeFalsy()

    // Expect a paragraph with a message to DO exist
    expect(wrapper.find('p').exists()).toBeTruthy()
  })

  test('Each row renders the correct information', () => {
    wrapper = createWrapper(LastMovementsCard, createStore(false), {})

    // Get all rows
    const tableRows = wrapper.findAll('tr').wrappers

    // Assert that they are the first three and not ANY three, and the info matches
    let i = 0
    for (const row of tableRows) {
      if (mockMovementList[i].type === 'cashout') {
        textContains(
          row,
          '.truncated-title',
          wrapper.vm.$t('home.movementsSummary.lastMovementsCard.cashoutTitle')
        )
      } else {
        textContains(row, '.truncated-title', mockMovementList[i].title)
      }
      textContains(
        row,
        '.text-capitalize',
        getLocalizedDate(mockMovementList[i].date, mocki18n.locale)
      )
      const amountField = row.find('#movement-amount')
      expect(amountField.html()).toContain(mockMovementList[i].amount)
      expect(amountField.html()).toContain(mockMovementList[i].currency)
      i++
    }
  })

  test('It renders the correct icon according to movement type', () => {
    wrapper = createWrapper(LastMovementsCard, createStore(false), {})

    // Get icons from rows
    const icons = wrapper.findAllComponents({ name: 'v-icon' }).wrappers

    let i = 0
    let classes
    // Assert that each icon is correct according to the movement type
    // 1st and 3rd are 'cashout', 2nd is 'payment'
    for (const icon of icons) {
      classes = icon.classes()
      if (mockMovementList[i].type === 'cashout') {
        expect(classes).toContain('mdi-arrow-top-right')
        expect(classes).toContain('primary--text')
      } else {
        expect(classes).toContain('mdi-arrow-bottom-left')
        expect(classes).toContain('green--text')
      }
      i++
    }
  })
})
