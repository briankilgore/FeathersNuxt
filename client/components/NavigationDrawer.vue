<template>
  <v-navigation-drawer
    fixed
    v-model="navDrawer"
    :clipped="$vuetify.breakpoint.width > 1264"
    app
  >
    <v-card flat>
      <v-card-media 
        class="blue-grey lighten-1 white--text"
        :src="`/images/headers/${headerImage}`"
        height="150px">
        <v-layout column class="media">
          <v-spacer></v-spacer>
          <profile-menu></profile-menu>
        </v-layout>
      </v-card-media>
      <v-list dense>
        <v-list-tile to="/" exact nuxt>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/contact" exact nuxt>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import ProfileMenu from '~/components/ProfileMenu';

export default {
  props: {
    drawer: Boolean,
    user: { type: Object, default: {} },
  },
  data: function () {
    return {
    };
  },
  computed: {
    headerImage: function () {
      return this.$store.state.auth.user.headerImage;
    },
    navDrawer: {
      get: function () {
        return this.drawer;
      },
      set: function (value) {
        this.$emit('update:drawer', value);
      },
    },
  },
  methods: {
  },
  components: {
    ProfileMenu,
  }
};
</script>

<style>

</style>
