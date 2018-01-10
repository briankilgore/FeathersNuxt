<template>
  <div id="app">
    <v-app>
      <notifications></notifications>
      <navigation-drawer :drawer.sync="drawer" :user="user" v-on:logout="handleLogout"></navigation-drawer>
      <toolbar :title="title" :drawer.sync="drawer"></toolbar>
      <v-content>
        <nuxt />
      </v-content>
      <custom-footer :title="title"></custom-footer>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import NavigationDrawer from '~/components/NavigationDrawer';
import Toolbar from '~/components/Toolbar';
import CustomFooter from '~/components/Footer';
import Notifications from '~/components/Notifications';

export default {
  middleware: 'isAuthenticated',
  data: function () {
    return {
      drawer: null,
      title: 'LoopbackVue',
      alertMessage: 'Test Error',
    };
  },
  computed: {
    user: function () {
      // console.log(this.$store.state);
      return this.$store.state.auth.user || {};
    },
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    handleLogout: async function () {
      console.log('Logging user out');
      let response = await this.logout();
      console.log(response);
      this.$router.replace('/login');
    },
  },
  mounted: function () {
    // console.log(this.$vuetify.breakpoint);
  },
  components: {
    NavigationDrawer,
    Toolbar,
    CustomFooter,
    Notifications,
  },
};
</script>

<style>

</style>
