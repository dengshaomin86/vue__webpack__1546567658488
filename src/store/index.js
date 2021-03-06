import Vue from 'vue'
import Vuex from 'vuex'
import {SET_NUMBER, SET_THEME} from './mutation-types'

Vue.use(Vuex);

const state = {
  number: 10,
  theme: 'dark',
};

const getters = {
  theme: (state) => {
    state.theme = $local.get('theme') || state.theme;
    return state.theme
  },
  // store.getters.getNumber
  getNumber: (state) => {
    return state.number + 10
  },
  // store.getters.calcNumber(2)
  calcNumber: (state) => (data) => {
    return state.number + data
  }
};

const mutations = {
  [SET_NUMBER](state, payload) {
    console.log('mutation', payload);
    state.number = payload.amount;
  },
  [SET_THEME](state, payload) {
    $local.set('theme', payload);
    state.theme = payload;
  },
};

const actions = {
  setNumber({dispatch, commit, state}, payload) {
    console.log('action', payload);
    setTimeout(() => {
      commit(SET_NUMBER, payload)
    }, 1000);
  },
};

export default new Vuex.Store({state, getters, mutations, actions});

// localStorage
const $local = {
  key: "app-data",
  set(key, data) {
    let $data = localStorage.getItem(this.key);
    $data = $data ? JSON.parse($data) : {};
    let obj = {};
    obj[key] = data;
    localStorage.setItem(this.key, JSON.stringify(Object.assign($data, obj)));
  },
  get(key) {
    let $data = localStorage.getItem(this.key);
    $data = $data ? JSON.parse($data) : {};
    return $data[key] || null
  },
  remove(key) {
    let $data = localStorage.getItem(this.key);
    $data = $data ? JSON.parse($data) : {};
    delete $data[key];
    localStorage.setItem(this.key, JSON.stringify($data));
  }
};

Vue.prototype.$local = $local;
