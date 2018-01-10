<template>
  <v-menu offset-y>
    <v-btn flat slot="activator">
      <v-icon left>account_circle</v-icon>Brian
    </v-btn>
    <v-list>
      <v-list-tile>
        <v-list-tile-title>Profile</v-list-tile-title>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-list-tile-title v-on:click="logout">Logout</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  methods: {
    logout: function () {
      this.$store.dispatch('auth/logout');
    },
  },
};
</script>

<style>

</style>
