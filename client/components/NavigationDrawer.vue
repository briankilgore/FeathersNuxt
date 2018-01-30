<template>
  <v-navigation-drawer
    fixed
    v-model="navDrawer"
    :clipped="$vuetify.breakpoint.width > 1264"
    app
  >
    <v-card flat>
      <v-list dense>
        <v-list-tile to="/" exact nuxt>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/availability" exact nuxt>
          <v-list-tile-action>
            <v-icon>event_available</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Availability</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/sessions" exact nuxt>
          <v-list-tile-action>
            <v-icon>schedule</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sessions</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/clients" exact nuxt>
          <v-list-tile-action>
            <v-icon>perm_contact_calendar</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Clients</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group group="admin">
          <v-list-tile slot="item" nuxt>
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Administration</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile to="/admin/clients">
            <v-list-tile-content>
              <v-list-tile-title>Clients</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/admin/locations">
            <v-list-tile-content>
              <v-list-tile-title>Locations</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/admin/users">
            <v-list-tile-content>
              <v-list-tile-title>Users</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/admin/settings">
            <v-list-tile-content>
              <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
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
  },
};
</script>

<style>

</style>
