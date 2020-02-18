import Vue from 'vue'
import vuex from 'vuex'
import axios from '../firebase/auth.js'
import globalAxios from 'axios'
import { router } from '../main.js'
Vue.use(vuex)

export const store = new vuex.Store({
    state: {
        signin: false,
        singnup: false,
        profile: false,
        user: {
            idToken: null,
            localId: null,
            email: null,
        },
        apiKey: "AIzaSyD5wdBqGLbyZ-FcL33rM7X27U8_ONx2Bi8",
        post: {
            userID: null,
            title: null,
            content: null
        },
        posts: [],
        basket: []

    },
    getters: {
        getCurrentID(state) {
            return state.currentID
        },
        //navigation popups getters
        getSignIn(state) {
            return state.signin
        },
        getSignUp(state) {
            return state.singnup
        },
        getProfile(state) {
            return state.profile
        },
        getIdToken(state) {
            return state.user.idToken
        },
        getPosts(state) {
            return state.posts
        },
        isAuth(state) {
            return state.user.idToken !== null
        },
        getBasket(state) {
            return state.basket
        }

    },
    mutations: {
        setCurrentID(state, id) {
            state.currentID = id
        },
        //navigation popups mutations
        setSignIn(state, showState) {
            state.signin = showState
        },
        setSignUp(state, showState) {
            state.singnup = showState
        },
        setProfile(state, showState) {
            state.profile = showState
        },
        authUser(state, apiReponse) {
            state.user.idToken = apiReponse.data.idToken
            state.user.localId = apiReponse.data.localId
            state.user.email = apiReponse.data.email
        },
        setPosts(state, posts) {
            state.posts = posts
        },
        clearToken(state) {
            state.user.idToken = null;
            state.user.localId = null
            state.user.email = null
        },
        setBasket(state, p) {
            state.basket.push(p)
        },
        authBasket(state, b) {
            state.basket = b;
        },


    },
    actions: {
        actionSignIn({ commit }, showState) {
            commit('setSignIn', showState)
        },
        actionSignUp({ commit }, showState) {
            commit('setSignUp', showState)
        },
        signup({ state, commit }, user) {
            axios.post('/v1/accounts:signUp?key=' + state.apiKey, {
                    email: user.email,
                    password: user.password,
                    returnSecureToken: true
                })
                .then(function(response1) {
                    commit('authUser', response1)
                    axios.post('/v1/accounts:sendOobCode?key=' + state.apiKey, {
                            requestType: "VERIFY_EMAIL",
                            idToken: state.user.idToken
                        })
                        .then(function(response) {
                            alert("check your email , a verification link sent")
                            console.log(response)
                            globalAxios.post('/users/' + state.user.localId + '.json', {
                                    fullName: user.fullName,
                                    email: user.email
                                })
                                .then(function(response) {
                                    console.log(response)
                                })
                        }).catch(function(error) {
                            console.log(error)
                        })

                })
                .catch(function(error) {
                    console.log(error)
                })
        },
        signin({ state, commit }, user) {
            axios.post('v1/accounts:signInWithPassword?key=' + state.apiKey, {
                    email: user.email,
                    password: user.password,
                    returnSecureToken: true
                })
                .then(function(response) {
                    commit('authUser', response)

                    axios.post('v1/accounts:lookup?key=' + state.apiKey, {
                            idToken: state.user.idToken
                        })
                        .then(function(response) {
                            if (response.data.users[0].emailVerified) {
                                commit('setProfile', true)

                            } else {
                                alert("please verify your email")
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
                .catch(function(error) {
                    console.log(error)
                })
        },
        addPosts({ state }, posts) {
            globalAxios.put('posts/' + state.user.localId + '.json?auth=' + state.user.idToken, posts)
                .then(function(response) {
                    return response
                })
                .catch(function(error) {
                    console.log(error)
                })
        },
        getMyPosts({ state }) {
            if (!state.user.idToken) {
                return
            }
            return globalAxios.get('posts/' + state.user.localId + '.json?auth=' + state.user.idToken)
                .then(function(response) {
                    return response.data
                })

        },
        getAllPosts() {
            return globalAxios.get('posts.json')
                .then(function(response) {
                    return response.data
                })
        },
        logout({ commit }) {
            commit('clearToken');
            router.replace({ path: '/' })
        },
        addMyBasket({ state, commit }, p) {
            commit("setBasket", p);
            localStorage.setItem('basket', JSON.stringify(state.basket))

        },
        tryStoreBasket({ commit }) {
            if (JSON.parse(localStorage.getItem('basket')) == null)
                return
            const basket = JSON.parse(localStorage.getItem('basket'))

            commit('authBasket', basket)

        },
        clearStorage({ state }) {
            localStorage.clear()
            state.basket.splice(0, state.basket.length)
        }

    }


})