import Vue from 'vue'; // eslint-disable-line import/no-extraneous-dependencies
import Vuex from 'vuex'; // eslint-disable-line import/no-extraneous-dependencies
import feathersVuex, { initAuth } from 'feathers-vuex';
import feathers from '~/api';
// import parseCookies from '~/helpers/parse-cookies';
// import * as AlertStore from '~/store/alerts';

Vue.use(Vuex);

const { service, auth } = feathersVuex(feathers, { idField: '_id' });

const store = new Vuex.Store({
  modules: {
    // alerts: {
    //   namespaced: true,
    //   ...AlertStore,
    // },
  },
  plugins: [
    service('users'),
    service('authManagement'),
    auth({ userService: 'users' }),
  ],
  state: {},
  actions: {
    nuxtServerInit: function ({ commit, dispatch }, { req }) { // eslint-disable-line consistent-return
      let auth = initAuth({
        commit,
        dispatch,
        req,
        moduleName: 'auth',
        cookieName: 'feathers-jwt',
      });

      return auth;
    },
  },
});

export default () => store;
