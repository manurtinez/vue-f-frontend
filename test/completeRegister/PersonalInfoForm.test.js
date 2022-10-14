import PersonalInfoForm from '@/components/forms/register/PersonalInfoForm'
import { createWrapper } from '../helpers'

const exampleEmptyData = {
  first_name: '',
  last_name: '',
  nationality: '',
  dni: '',
  gender: '',
  birth_date: '',
}

const exampleData = {
  first_name: 'User',
  last_name: 'Example',
  nationality: 'Argentina',
  dni: '12345',
  gender: 'F',
  birth_date: '1980-12-12',
}

describe('PersonalDataForm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapper(PersonalInfoForm)
  })

  afterEach(() => wrapper.destroy())

  test('It renders the form', () => {
    wrapper = createWrapper(PersonalInfoForm)
    const form = wrapper.findComponent({ name: 'v-form' })

    expect(form.exists()).toBe(true)
  })

  test('The submit button is disabled if form is invalid or empty', async () => {
    // Assert with empty data
    await wrapper.setData({
      personalInfo: exampleEmptyData,
    })
    await wrapper.vm.$nextTick()
    const btn = wrapper.getComponent({ name: 'v-btn' })

    expect(btn.attributes('disabled')).toBeTruthy()
  })

  test('The submit button is enabled if form is valid and filled', async () => {
    // Assert with empty data
    await wrapper.setData({
      personalInfo: exampleData,
    })
    // I had to force the select change for some reason...
    const select = wrapper.getComponent({ name: 'v-select' })
    await select.trigger('change')

    const btn = wrapper.getComponent({ name: 'v-btn' })
    expect(btn.attributes('disabled')).toBeFalsy()
    wrapper.destroy()
  })

  test('The form is submitted with clicking the button', async () => {
    await wrapper.setData({
      personalInfo: exampleData,
    })
    // I had to force the select change for some reason...
    const select = wrapper.getComponent({ name: 'v-select' })
    await select.trigger('change')

    const btn = wrapper.getComponent({ name: 'v-btn' })
    btn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('submitPersonalInfo')).toBeTruthy()
    expect(wrapper.emitted().submitPersonalInfo[0]).toEqual([exampleData])
  })

  // TODO when full country list is added, add a test for it here. For now, as it's only one country
  // TODO and it's hardcoded, it's redundant.
})
