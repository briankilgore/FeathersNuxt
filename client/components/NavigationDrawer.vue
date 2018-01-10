<template>
  <v-navigation-drawer
    fixed
    v-model="navDrawer"
    :clipped="$vuetify.breakpoint.width > 1264"
    app
  >
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
  </v-navigation-drawer>
</template>

<script>
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
};
</script>

<style>

</style>
