export const createOptions = {
  computed: {
    finalAmount() {
      return 121
    },
  },
  mocks: {
    $urls: {
      SUBMIT_USER: '/finishregister',
      SUBMIT_USER_LOGIN: '/login',
    },
    $router: {
      push: jest.fn(),
    },
    $route: {
      params: {
        originalLink: {},
      },
    },
    $config: {
      pageDomain: '',
    },
  },
  stubs: {
    PaymentLinkCard: {
      template: '<div></div>',
    },
    ComissionMessage: {
      template: '<span>message</span>',
    },
    ExpireButton: {
      template: '<button>Expire</button>',
    },
  },
}

export const exampleCreatedLink = {
  title: 'A title',
  amount: 120,
  finalAmount: 110,
  link: 'example.com/link',
  invoice_number: '123',
}

export const createdLinkCardOptions = {
  propsData: {
    createdLink: exampleCreatedLink,
  },
  stubs: {
    ShareLinkNav: {
      template: '<div></div>',
    },
  },
  mocks: {
    $config: {
      pageDomain: 'pageDomain/',
    },
    // Mock copy to clipboard function
    navigator: {
      clipboard: {
        writeText: jest.fn(),
      },
    },
  },
}
