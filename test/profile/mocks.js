import Vuex from 'vuex'

export const mockTabList = [
  {
    title: 'Tab1',
    component: {
      name: 'Tab1',
      template: '<div></div>',
    },
  },
  {
    title: 'Tab2',
    component: {
      name: 'Tab2',
      template: '<div></div>',
    },
  },
]

export const mockUser = {
  fullname: 'Cool User',
  email: 'cool@user.com',
  first_name: 'Cool',
  last_name: 'User',
  profile_image_url: '',
  id: 5,
  username: 'CoolUser321',
  is_active: true,
  address: 'Cool Street',
  dni: '11001100',
  phone: '22112211',
  gender: 'Masculino',
  birth_date: '1930-12-20',
  nationality_display: 'Argentina',
  is_profile_completed: true,
  balance: '29.50',
}

const state = {
  loggedUser: mockUser,
}

export const store = new Vuex.Store({
  modules: {
    userStore: {
      nameSpaced: true,
      state,
    },
  },
})

export const options = {
  data() {
    return {
      currentTab: null,
      tabList: mockTabList,
    }
  },
  stubs: {
    i18n: {
      template: '<div></div>',
    },
  },
}
