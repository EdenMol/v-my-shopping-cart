import axios from 'axios'

const baseUrl = 'http://localhost:3000'
const loginUrl = `${baseUrl}/auth`

export default {
    namespaced: true,
    state: {
        authenticated: false
    },

    mutations: {
        setAuthenticate(state) {
            state.authenticated = true
        }
    },
    actions: {
        async authenticate(context, credentials) {
            let res = (await axios.post(loginUrl, credentials))
            if (res.data.success == true) {
                context.commit('setAuthenticate')
            }
        },


    }
}
