import Vue from 'vue'
import VueRouter from 'vue-router'

import Pages from '../components/Pages.vue'
import ProductList from '../components/ProductList.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import Checkout from '../components/Checkout.vue'
import Thanks from '../components/Thanks.vue'
import Login from '../components/admin/Login.vue'

import Admin from '../components/admin/Admin.vue'
import AdminPages from '../components/admin/Pages.vue'
import PageEditor from '../components/admin/PageEditor.vue'
import Products from '../components/admin/Products.vue'
import ProductEditor from '../components/admin/ProductEditor.vue'
import Orders from '../components/admin/Orders.vue'


import dataStore from '../store'

Vue.use(VueRouter)

const routes =
    [
        { path: "/cart/", component: ShoppingCart },
        { path: "/thanks/", component: Thanks },
        { path: "/checkout", component: Checkout },
        { path: "/categories/:category", component: ProductList },
        { path: "/login", component: Login },
        {
            path: "/admin", component: Admin,
            beforeEnter(to, from, next) {
                if (dataStore.state.auth.authenticated) {
                    next();
                } else {
                    next("/login");
                }
            },
            children: [
                { path: "pages", component: AdminPages },
                { path: "pages/:op(add|edit)/:id?", component: PageEditor },
                { path: "products", component: Products },
                { path: "products/:op(add|edit)/:id?", component: ProductEditor },
                { path: "orders", component: Orders },
                { path: "*", riderect: "/admin/products" },
            ]
        },
        { path: "/:slug?", component: Pages },
        { path: "*", riderect: "/" }
    ]

export default new VueRouter({
    mode: "history",
    routes



})