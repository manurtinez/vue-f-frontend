import PasswordRules from '~/components/UI/Feedback/PasswordRules'
import { createWrapper } from '~/test/helpers'

describe('Password rules component test', () => {
  let wrapper
  let icon
  let text
  let rules

  function getRules(wrapper) {
    const newRules = wrapper.findAll('.row').wrappers
    return newRules.slice(1, newRules.length)
  }

  afterEach(() => wrapper.destroy())

  test('With none of the rules passing', () => {
    // The password should not pass ANY of the rules
    wrapper = createWrapper(
      PasswordRules,
      {},
      {
        propsData: {
          pass: 'test',
        },
      }
    )

    // All rules should be errored (strip first row as it's the title)
    rules = getRules(wrapper)
    expect(rules.length).toBe(4)

    for (const rule of rules) {
      icon = rule.findComponent({ name: 'v-icon' })
      text = rule.find('p')
      expect(icon.classes()).toContain('mdi-close')
      expect(icon.classes()).toContain('primary--text')
      expect(text.classes()).toContain('primary--text')
    }
  })
  test('Just passing the uppercase rule', () => {
    // Now, add an uppercase to the prop and check that first rule changes,
    // But the others remain errored
    wrapper = createWrapper(
      PasswordRules,
      {},
      {
        propsData: {
          pass: 'Test',
        },
      }
    )
    rules = getRules(wrapper)

    expect(rules[0].findComponent({ name: 'v-icon' }).classes()).toContain(
      'mdi-check'
    )
    expect(rules[0].findComponent({ name: 'v-icon' }).classes()).toContain(
      'green--text'
    )
    expect(rules[0].find('p').classes()).toContain('green--text')

    // The rest didn't change
    expect(rules[1].findComponent({ name: 'v-icon' }).classes()).toContain(
      'mdi-close'
    )
    expect(rules[1].findComponent({ name: 'v-icon' }).classes()).toContain(
      'primary--text'
    )
    expect(rules[2].findComponent({ name: 'v-icon' }).classes()).toContain(
      'mdi-close'
    )
    expect(rules[3].findComponent({ name: 'v-icon' }).classes()).toContain(
      'mdi-close'
    )
  })
  test('Passing number AND uppercase rules', () => {
    // Test adding a number
    wrapper = createWrapper(
      PasswordRules,
      {},
      {
        propsData: {
          pass: 'Test1',
        },
      }
    )
    rules = getRules(wrapper)

    // At this point we can asume that if the icon changes, the text color does too and omit that check
    expect(rules[1].findComponent({ name: 'v-icon' }).classes()).toContain(
      'mdi-check'
    )
    expect(rules[1].find('p').classes()).toContain('green--text')

    // First one remains green, the rest do not
    expect(rules[0].findComponent({ name: 'v-icon' }).classes()).toContain(
      'green--text'
    )
    expect(rules[2].findComponent({ name: 'v-icon' }).classes()).toContain(
      'primary--text'
    )
    expect(rules[3].findComponent({ name: 'v-icon' }).classes()).toContain(
      'primary--text'
    )
  })

  test('Passing all rules except length', () => {
    // Now, add a special char
    wrapper = createWrapper(
      PasswordRules,
      {},
      {
        propsData: {
          pass: 'Test1!',
        },
      }
    )
    rules = getRules(wrapper)

    // Now the special char rule is also checked
    expect(rules[2].findComponent({ name: 'v-icon' }).classes()).toContain(
      'mdi-check'
    )

    // Previous rules remain checked and only length is errored now
    expect(rules[3].findComponent({ name: 'v-icon' }).classes()).toContain(
      'mdi-close'
    )
    expect(rules[0].findComponent({ name: 'v-icon' }).classes()).toContain(
      'mdi-check'
    )
    expect(rules[1].findComponent({ name: 'v-icon' }).classes()).toContain(
      'mdi-check'
    )
  })

  test('Passing all the rules', () => {
    // Now finally check all conditions
    wrapper = createWrapper(
      PasswordRules,
      {},
      {
        propsData: {
          pass: 'Test1!!!',
        },
      }
    )
    rules = getRules(wrapper)

    for (const rule of rules) {
      icon = rule.findComponent({ name: 'v-icon' })
      text = rule.find('p')
      expect(icon.classes()).toContain('mdi-check')
      expect(icon.classes()).toContain('green--text')
      expect(text.classes()).toContain('green--text')
    }
  })
})
