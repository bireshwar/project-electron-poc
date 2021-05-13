import axios from 'axios';
import routes from '../routes/routes';

let baseUrl = "http://localhost:7000";
const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    lang:{},
    user_groups: [],
    files: [],
    status: '',
    error: null
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    lang: state => state.lang,
    user_groups: state => state.user_groups,
    files: state => state.files,
    error: state => state.error
};

const actions = {
    // Login Action
    async login({
        commit
    }, user) {
        commit('auth_request');
        try {
            let res = await axios.post(`${baseUrl}/api/login`, user)
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                const lang = res.data.lang;
                // Store the token into the localstorage
                localStorage.setItem('token', token);
                // Set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user,lang);
            }
            return res;
        } catch (err) {
            commit('auth_error', err);
        }
    },

    async loginAmazon({
        commit
    }) {
        commit('auth_request');
        try {
            let res = await axios.get(`${baseUrl}/api/login/amazon`)
            //if (res.data.success) {
                //const token = res.data.token;
                //const user = res.data.user;
                // Store the token into the localstorage
                //localStorage.setItem('token', token);
                // Set the axios defaults
                //axios.defaults.headers.common['Authorization'] = token;
                //commit('auth_success', token, user);
            //}
            return res;
        } catch (err) {
            commit('auth_error', err);
        }
    },
    // Register User
    async register({
        commit
    }, userData) {
        try {
            commit('register_request');
            let res = await axios.post(`${baseUrl}/api/register`, userData);
            if (res.data.success !== undefined) {
                commit('register_success');
            }
            return res;
        } catch (err) {
            commit('register_error', err)
        }
    },
    // Get the user Profile
    async getProfile({
        commit
    }) {
        commit('profile_request');
        let res = await axios.get(`${baseUrl}/api/profile`)
        commit('user_profile', res.data.user)
        commit('user_lang', res.data.lang)
        return res;
    },
    // Get the user Groups
    async getUserGroups({
        commit,
        state
    }) {
        commit('group_request');
        let res = await axios.post(`${baseUrl}/api/groups`, { id: state.user._id });
        commit('user_groups', res.data)
        return res;
    },

    async getFiles({
        commit,
        state
    }) {
        commit('file_request');
        let res = await axios.get(`${baseUrl}/api/files`) ;
        localStorage.setItem("files",JSON.stringify(res.data));
        commit('files', res.data)
        return res;
    },

    async getLocalFiles({
        commit,
        state
    }) {
        commit('file_request');
        let files = await JSON.parse(localStorage.getItem("files"));
        commit('files', files);
        return files;
    },

    async setFiles({
        commit,
        state
    },files) {
        commit('file_request');
        localStorage.setItem("files",JSON.stringify(files));
        commit('files', files);
        return files
    },

    // Logout the user
    async logout({
        commit
    }) {
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return
    }
};

const mutations = {
    auth_request(state) {
        state.error = null
        state.status = 'loading'
    },
    auth_success(state, token, user,lang) {
        state.token = token
        state.user = user
        state.lang = lang
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err) {
        state.error = err.response.data.msg
    },
    register_request(state) {
        state.error = null
        state.status = 'loading'
    },
    register_success(state) {
        state.error = null
        state.status = 'success'
    },
    register_error(state, err) {
        state.error = err.response.data.msg
    },
    logout(state) {
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    },
    profile_request(state) {
        state.status = 'loading'
    },
    group_request(state) {
        state.status = 'loading'
    },
    file_request(state) {
        state.status = 'loading'
    },
    user_profile(state, user) {
        state.user = user
    },
    user_lang(state,lang) {
        state.lang = lang
    },
    user_groups(state, groups) {
        state.user_groups = groups
    },
    files(state, files) {
        state.files = files
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};