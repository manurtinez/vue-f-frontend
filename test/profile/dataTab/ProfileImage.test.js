import {
  store,
  options,
  validFile,
  tooBigFile,
  invalidFormatFile,
} from './mocks'
import ProfileImage from '~/components/cards/Profile/ProfileImage'
import { createWrapper, textContains } from '~/test/helpers'

describe('Profile image component test', () => {
  let wrapper

  beforeEach(() => (wrapper = createWrapper(ProfileImage, store, options)))
  afterEach(() => wrapper.destroy())

  test('It displays the image that is received by prop', () => {
    const img = wrapper.findComponent({ name: 'v-img' })

    expect(img.props('src')).toBe(options.propsData.imageUrl)
  })

  test('When clicking on upload button, it prompts to upload a file', async () => {
    // Mock the click function of the input ref
    wrapper.vm.$refs.fileUploadField.click = jest.fn()
    const uploadButton = wrapper.findComponent({ name: 'v-btn' })

    await uploadButton.trigger('click')

    // Expect the file input to have opened
    expect(wrapper.vm.$refs.fileUploadField.click).toHaveBeenCalled()
  })

  test('A message is shown if upload is successful', async () => {
    // Mock store action call
    wrapper.vm.uploadImage = jest.fn(() => Promise.resolve({ status: 200 }))

    // Call submit function manually with valid image
    await wrapper.vm.submitImage(validFile)

    const snackBar = wrapper.find('.v-snack')
    textContains(snackBar, '.v-snack__content', 'éxito')
  })

  test('If the image is too large / not in correct format, an error is shown', async () => {
    // Call submit function manually with image larger than allowed
    await wrapper.vm.submitImage(tooBigFile)

    let snackBar = wrapper.find('.v-snack')
    textContains(snackBar, '.v-snack__content', 'La imagen debe ser')

    // Call again, this time image has valid size but invalid format
    await wrapper.vm.submitImage(invalidFormatFile)

    snackBar = wrapper.find('.v-snack')
    textContains(snackBar, '.v-snack__content', 'formato')
  })

  test('If the image is valid but request fails, it shows the error message', async () => {
    // Mock FAILED store action call
    wrapper.vm.uploadImage = jest.fn(() => Promise.resolve({ status: 400 }))

    // Call submit function manually with valid image
    await wrapper.vm.submitImage(validFile)

    const snackBar = wrapper.find('.v-snack')
    textContains(snackBar, '.v-snack__content', 'error')
  })

  test('If the image is successfully uploaded, the image in the template updates too', async () => {
    // This component doesn't detect the store change directly, since it receives image from prop.
    // In this case, the test should assert that if the prop changes, the image does too.
    const img = wrapper.findComponent({ name: 'v-img' })

    // Initial image
    expect(img.props('src')).toBe(options.propsData.imageUrl)

    // Change prop and expect change in template
    wrapper.setProps({ imageUrl: 'a/new/image/url' })
    await wrapper.vm.$nextTick()
    expect(img.props('src')).toBe('a/new/image/url')
  })

  test("If the input window is closed without selecting image, the function doesn't try to upload", async () => {
    const spyUpload = jest.spyOn(ProfileImage.methods, 'uploadImage')

    // Call submit manually without any files
    await wrapper.vm.submitImage({
      target: {
        files: [],
      },
    })
    expect(spyUpload).not.toHaveBeenCalled()
  })

  test("In case the user doesn't have picture, the placeholder is shown", async () => {
    // Component doesn't receive any image
    wrapper.setProps({
      imageUrl: '',
    })
    await wrapper.vm.$nextTick()

    // Expect image to be placeholder
    const img = wrapper.findComponent({ name: 'v-img' })
    expect(img.props('src')).toBe('test-file-stub')
  })
})
