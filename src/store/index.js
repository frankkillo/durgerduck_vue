import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
      items: [],
      comment: ''
    },
    products: []
  },
  getters: {
  },
  mutations: {
    initializeStore (state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    addToCart (state, item) {
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)

      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }
    },
    decrementFromCart(state, item) {
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)

      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) - parseInt(item.quantity)

        if (exists[0].quantity === 0) {
          state.cart.items = state.cart.items.filter(i => i.product.id !== item.product.id)
        }
      }
    },
    clearCart (state) {
      state.cart.items = []
      state.cart.comment = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
