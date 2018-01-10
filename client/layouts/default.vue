<template>
  <div id="app">
    <v-app>
      <custom-notifications></custom-notifications>
      <v-content>
        <nuxt />
      </v-content>
    </v-app>
  </div>
</template>

<script>
// import { mapActions, mapState } from 'vuex'; // eslint-disable-line import/no-extraneous-dependencies

import MainMenu from '~/components/MainMenu';
import CustomNotifications from '~/components/Notifications';

export default {
  name: 'default-layout',
  data: function () {
    return {
    };
  },
  computed: {
    // ...mapState('auth', ['user']),
  },
  methods: {
    // ...mapActions({
    //   authenticate: 'auth/authenticate',
    //   logout: 'auth/logout',
    // }),
  },
  mounted: function () {
  },
  created: async function () {
    // try {
    //   if (this.user) await this.authenticate();
    // } catch (e) {
    //   this.logout();
    //   throw e;
    // }
  },
  components: {
    MainMenu,
    CustomNotifications,
  },
};
</script>

<style>
body {
  font-family: sans-serif;
}

main {
  box-sizing: border-box;
  padding: 1rem 2rem;
}
</style>
