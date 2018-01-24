<template>
  <v-navigation-drawer
    fixed
    v-model="navDrawer"
    :clipped="$vuetify.breakpoint.width > 1264"
    app
  >
    <v-card flat>
      <v-list>
        <v-list-tile to="/" exact nuxt>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/contacts" exact nuxt>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contacts</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/admin" exact nuxt>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Administration</v-list-tile-title>
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
    currentUser: { type: Object, default: () => {} },
  },
  data: function () {
    return {
    };
  },
  computed: {
    // headerImage: function () {
    //   return this.$store.state.auth.user.headerImage;
    // },
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
