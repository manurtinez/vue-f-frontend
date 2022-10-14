import Vuex from 'vuex'

export const validFile = {
  target: {
    files: [
      {
        name: 'aCoolImage.png',
        size: 1000000, // 1 MB
        type: 'image/png',
      },
    ],
  },
}

export const tooBigFile = {
  target: {
    files: [
      {
        name: 'aCoolImage.png',
        size: 5000000, // 5 MB
        type: 'image/png',
      },
    ],
  },
}

export const invalidFormatFile = {
  target: {
    files: [
      {
        name: 'aCoolImage.png',
        size: 1000000, // 1 MB
        type: 'image/gif',
      },
    ],
  },
}

const actions = {
  uploadImage: jest.fn(),
}

export const store = new Vuex.Store({
  modules: {
    userStore: {
      namespaced: true,
      actions,
    },
  },
})

export const options = {
  propsData: {
    imageUrl: 'url/to/image',
  },
  mocks: {
    $refs: {
      fileUploadField: {
        click: jest.fn(),
      },
    },
  },
}
