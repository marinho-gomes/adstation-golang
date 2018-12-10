import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        apiToken: ''
    },
    getters: {
        token(state){
            return state.apiToken
        }
    },
    mutations: {
        changeToken(state, token){
            state.apiToken = token;
        }
    }
});