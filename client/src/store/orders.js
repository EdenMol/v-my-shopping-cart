import axios from 'axios'

const baseUrl = 'http://localhost:3000'
const ordersUrl = `${baseUrl}/orders`

export default {
    namespaced: true,
    state: {
        orders: []
    },

    mutations: {
        setOrders(state, data) {
            state.orders = data
        }
    },
    actions: {
        async storeOrderAction(context, order) {
            return (await axios.post(ordersUrl, order)).data._id
        },
        async setOrdersAction(context) {
            context.commit("setOrders", (await axios.get(ordersUrl)).data)
        }

    }
}
