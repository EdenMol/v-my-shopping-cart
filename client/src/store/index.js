import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import CartModule from './cart'
import OrdersModule from './orders'
import AuthModule from './auth'

Vue.use(Vuex)

const baseUrl = 'http://localhost:3000'
const pagesUrl = `${baseUrl}/pages`
const categoriesUrl = `${baseUrl}/categories`
const productsUrl = `${baseUrl}/products`
const productImagesUrl = `${baseUrl}/media/products/`

export default new Vuex.Store({
    strict: true,
    modules: {
        cart: CartModule,
        orders: OrdersModule,
        auth: AuthModule
    },
    state: {
        pages: [],
        categories: [],
        products: [],
        productImages: productImagesUrl,
        currentPage: 1,
        pageCount: 0,
        pageSize: 4,
        currentCategory: "all"
    },
    mutations: {
        setPages(state, pages) {
            state.pages = pages
        },
        setCategories(state, categories) {
            state.categories = categories
        },
        setProducts(state, products) {
            state.products = products
        },
        setPageCount(state, count) {
            state.pageCount = Math.ceil(Number(count) / state.pageSize)
        },
        setCurrentPage(state, page) {
            state.currentPage = page
        },
        setCurrentCategory(state, category) {
            state.currentCategory = category
        }
    },
    actions: {
        async setPagesAction(context) {
            context.commit("setPages", (await axios.get(pagesUrl)).data)

        },
        async setCategoriesAction(context) {
            context.commit("setCategories", (await axios.get(categoriesUrl)).data)

        },
        async setProductsByCategoryAction(context, category) {
            let url;
            //count base on category
            let productCountUrl;
            //if not all, the product base on category
            if (category !== 'all') {
                url = `${productsUrl}/${category}`
                productCountUrl = `${productsUrl}/count/${category}`

            } else {
                url = `${productsUrl}`
                productCountUrl = `${productsUrl}/count/all`

            }

            const productCount = (await axios.get(productCountUrl)).data
            context.commit("setPageCount", productCount)
            context.commit("setProducts", (await axios.get(url)).data)


        },
        async setProductsByCategoryPaginationAction(context, page) {
            let url;
            //if not all, the product base on category
            if (context.state.currentCategory !== 'all') {
                url = `${productsUrl}/${context.state.currentCategory}?p=${page}`
            } else {
                url = `${productsUrl}?p=${page}`
            }
            context.commit("setProducts", (await axios.get(url)).data)
        },
        async addPage(context, page) {
            await axios.post(pagesUrl, page)
            context.commit("setPages", (await axios.get(pagesUrl)).data)
        },
        async editPage(context, page) {
            await axios.put(`${pagesUrl}/${page._id}`, page)
            context.commit("setPages", (await axios.get(pagesUrl)).data)
        },
        async deletePage(context, page) {
            await axios.delete(`${pagesUrl}/${page._id}`)
            context.commit("setPages", (await axios.get(pagesUrl)).data)
        },
        async addProduct(context, product) {
            await axios.post(productsUrl, product)
            // context.commit("setProducts", (await axios.get(productsUrl)).data)
        },
        async editProduct(context, product) {
            await axios.put(productsUrl, product)

        },
        async deleteProduct(context, product) {
            await axios.delete(`${productsUrl}/${product._id}`)

            const url = `${productsUrl}?p=${context.state.currentPage}`
            context.commit("setProducts", (await axios.get(url)).data)
        },
    },
    getters: {
        pageById: state => (id) => state.pages.find(p => p._id == id),
        productById: state => (id) => state.products.find(p => p._id == id)
    }

})