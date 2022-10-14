import CompleteRegister from '@/pages/CompleteRegister.vue'
import PersonalInfoForm from '@/components/forms/register/PersonalInfoForm.vue'
import { createWrapperShallow } from '../helpers'
import { options, store } from './mocks'

describe('Complete register page', () => {
  let wrapper

  beforeEach(() => {
    wrapper = createWrapperShallow(CompleteRegister, store, options)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  // ! This test must change if the initial form is changed in the future
  test('It renders the personal info form initially', () => {
    expect(wrapper.vm.currentFormComponent.name).toEqual('PersonalInfoForm')
    const personalForm = wrapper.findComponent(PersonalInfoForm)
    expect(personalForm.exists()).toBe(true)
  })

  test('It sends finish register request when personal data is submitted', async () => {
    const exampleData = {
      first_name: 'User',
      last_name: 'Example',
      nationality: 'Argentina',
      dni: '12345',
      gender: 'Female',
      birth_date: '1980-12-12',
    }
    await wrapper.vm.submitPersonalInfo(exampleData)
    expect(wrapper.vm.$axios.patch).toBeCalledWith(
      `${wrapper.vm.$urls.SUBMIT_USER}2/`,
      exampleData
    )
  })

  test('It redirects to login page if successful in submit', async () => {
    await wrapper.vm.submitPersonalInfo()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ path: '/' })
  })
})
