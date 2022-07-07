<template>
  <div class="page">
    <div class="cafe">
      <ProductBox
        v-for="product in $store.state.products"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </div>
    <div class="is-hidden">
      {{ mainButtonStatus }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ProductBox from '@/components/ProductBox'

export default {
  name: 'HomeView',
  data () {
    return {
    }
  },
  components: {
    ProductBox
  },
  computed: {
    mainButtonStatus () {
      const tg = window.Telegram.WebApp

      if (this.$store.state.cart.items.length) {
        if (!tg.MainButton.isVisible) {
          tg.MainButton.show()
        }
      } else {
        tg.MainButton.hide()
      }
    }
  }
}
</script>