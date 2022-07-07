<template>
    <div class="page">
        <div class="cafe">
            <table cellspacing="0" cellpadding="0">
                <thead>
                    <tr class="head">
                        <th class="product-info" colspan="2"><strong>YOUR ORDER</strong></th>
                        <th class="product-total-price">
                            <router-link to="/" style="color: #28a745">Edit</router-link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in cart.items"
                        v-bind:key="item.product.id"
                    >
                        <td style="width: 74px">
                                <img v-bind:src="item.product.image.full_size">
                        </td>
                        <td class="product-item">
                            <strong class="product-name">
                                {{ item.product.name }} <span class="product-quantity">{{ item.quantity }}x</span>
                            </strong>
                            <br>
                            <span class="has-text-grey">
                                {{ item.product.description }}
                            </span>
                        </td>
                        <td class="product-total-price"> 
                            <strong>
                            ${{ getItemTotal(item).toFixed(2) }} 
                            </strong>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="column is-fullwidth">
                <div class="control">
                    <input class="input" type="text" placeholder="Add comment..." v-model="cart.comment">
                </div>
                <p class="is-left has-text-grey mt-2">Any special requests, details, final wishes etc.</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Cart',
    beforeCreate () {
        if (!this.$store.state.cart.items.length) {
            this.$router.push('/')
        }
    },
    data () {
        return {
            cart: {
                items: [],
                comment: ''
            }
        }
    },
    mounted () {
        this.cart = this.$store.state.cart
    },
    methods: {
        getItemTotal (item) {
            return item.product.price * item.quantity
        }
    }
}
</script>

<style scoped>



    ::placeholder { /* Most modern browsers support this now. */
        color: hsl(0, 0%, 48%);
        font-weight: 700;
    }

    .textarea, .input {
        box-shadow: none;
        max-width: 100%;
        width: 100%;
        background-color: var(--tg-theme-gb-color);
        color: var(--tg-theme-text-color);
    }

    textarea:focus, input:focus, .is-focused.textarea, .is-focused.input {
        outline: none;
        border-color:  inherit;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    table {
        border: none;
        width: 100%;
        text-align: left;
    }

    th, td {
        padding: 0.7em 1.3em;
        vertical-align: middle;
    }

    .product-info {
        font-size: 17px;
        color: var(--tg-theme-text-color);
        padding: 0.7em 1em;
    }

    .product-total-price {
        text-align: right;
        padding: 0.7em 1.5em;
    }

    .product-name {
        font-size: 14px;
    }

    .product-item {
        padding: 0.7em 0em;
    }

    .product-quantity {
        color: hsl(56, 79%, 45%);
    }
</style>