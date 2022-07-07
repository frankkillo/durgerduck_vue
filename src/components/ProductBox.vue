<template>
    <div class="cafe-item">
        <span 
            class="cafe-item-counter"
            v-if="cart.items.filter(i => i.product.id === product.id).length"
        >
            {{ itemQuantity }}
        </span>
        <div class="cafe-item-photo">
            <picture class="cafe-item-lottie">
                <img v-bind:src="product.image.full_size">
            </picture>
        </div>
        <div class="cafe-item-label">
            <span class="cafe-item-title">
                {{ product.name }} 
            </span>
            <span class="cafe-item-price">
                ${{ product.price }}
            </span>
        </div>
        <div class="control mt-2">
            <template v-if="cart.items.filter(i => i.product.id === product.id).length">
                <div class="buttons is-centered">
                    <button @click="decrementFromCart" class="button is-danger"><strong>-</strong></button>
                    <button @click="addToCart" class="button is-warning"><strong>+</strong></button>
                </div>
            </template>
            <template v-else>
                <button @click="addToCart" class="button is-warning is-fullwidth"><strong>ADD</strong></button>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: ['product'],
    data () {
        return {
            quantity: 1,
            cart: {
                items: []
            }
        }
    },
    mounted () {
        this.cart = this.$store.state.cart
    },
    methods: {
        addToCart() {
            const item = {
                product: this.product,
                quantity: this.quantity
            }
            this.$store.commit('addToCart', item)
        },
        decrementFromCart() {
            const item = {
                product: this.product,
                quantity: this.quantity
            }
            this.$store.commit('decrementFromCart', item)
        }
    },
    computed: {
        itemQuantity () {
            return this.cart.items.filter(i => i.product.id === this.product.id)[0].quantity
        },
    }
}
</script>

<style scoped>
    .cafe-item {
        position: relative;
        width: 120px;
        height: 144px;
        padding: 4px 5px 6px;
        margin-bottom: 15px;
        box-sizing: border-box;
        text-align: center;
    }
    .cafe-item-counter {
        position: absolute;
        right: 0;
        top: 0;
        min-width: 22px;
        height: 22px;
        padding: 3px 1px;
        margin: 4px 6px;
        border-radius: 50%;
        background-color: hsl(48, 100%, 67%);
        animation: 0.15s ease both;
        pointer-events: none;
        z-index: 3;
        font-weight: bold;
        text-align: center;
        color: rgba(0, 0, 0, 0.7);
    }

    .cafe-item-lottie {
        display: inline-block;
        vertical-align: top;
        position: relative;
        margin: 0 auto;
    }

    .cafe-item-photo .cafe-item-lottie {
        width: 74px;
    }

    .cafe-item-label {
        display: flex;
        justify-content: center;
    }

    .cafe-item-title{
        margin-right: 2px;
    }

    .cafe-item-price {
        font-weight: 700;
        white-space: nowrap;
    }

    .cafe-item-price::before {
        display: inline-block;
        vertical-align: top;
        content: '';
        width: 2px;
        height: 2px;
        border-radius: 2px;
        background-color: currentColor;
        margin: 7px 4px;
    }
</style>