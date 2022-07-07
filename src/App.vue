<template>
  <router-view v-slot="{ Component, route }">
    <transition
      :enter-active-class="route.meta.enterClass"
      :leave-active-class="route.meta.leaveClass"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      cart: {
        items: [],
        comment: ''
      }
    }
  },
  beforeCreate() {
    const getProducts = () => {
      axios
        .get('products/')
        .then(response => {
          this.$store.state.products = response.data
        })
        .catch(error => {
          console.log(JSON.stringify(error))
        })
    }

    getProducts()
  },
  watch: {
    $route(to, from) {
      const tg = window.Telegram.WebApp
        
      if (to.name === 'home') {
        tg.MainButton.text = "ORDER VIEW"   
      } else {
        tg.MainButton.text = "PAY $" + this.getTotalPrice().toFixed(2)
      }
    }
  },
  mounted () {
    this.cart = this.$store.state.cart

    const tg = window.Telegram.WebApp

    tg.MainButton.color = "#00C851"

    tg.MainButton.onClick(() => {
      if (this.$route.name === 'home') {
        this.$router.push({name: 'cart'})
      } else {
        this.checkOut()
      }
    })

    tg.ready()
  },
  methods: {
    checkOut () {
      const tg = window.Telegram.WebApp

      tg.MainButton.hide()

      if (this.cart.items.length && tg !== undefined) {
        const items = []

        for (let i = 0; i < this.cart.items.length; i++) {
          const item = this.cart.items[i]
          const obj = {
            product: item.product.id,
            price: item.product.price,
            quantity: item.quantity
          }

          items.push(obj)
        }

        const data = {
          items: items,
          comment: this.cart.comment,
          costumer_id: tg.initDataUnsafe.user.id,
          costumer_username: tg.initDataUnsafe.user.username,
          first_name: tg.initDataUnsafe.user.first_name,
          last_name: tg.initDataUnsafe.user.last_name
        }

        axios
          .post('orders/checkout-with-telegram/', data)
          .then(response => {
              this.$store.commit('clearCart')
              tg.close()
          })
          .catch(error => {
              console.log(JSON.stringify(error))
          })
      }
    },
    getTotalPrice () {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.product.price * curVal.quantity
      }, 0)
    },
  }
}
</script>

<style lang="scss">
@import '../node_modules/bulma';

  html {
      background-color: var(--tg-theme-bg-color);
    }

  body {
    background: var(--tg-theme-bg-color);
    font-size: 13px;
    line-height: 16px;
    font-weight: 500;
  }

  strong {
    color: var(--tg-theme-text-color);
  }

  .button {
    border-radius: 10px;
  }

  .page{
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }

  .cafe  {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 480px;
    justify-content: space-around;
    align-content: flex-end;
    background-color: var(--tg-theme-bg-color);
    color: var(--tg-theme-text-color);
  }

  .cafe::-webkit-scrollbar {
    display: none;
  }
</style>