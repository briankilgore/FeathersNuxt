<template>
  <v-menu offset-y>
    <v-btn class="white--text" flat value="justify" block :ripple="false" slot="activator">
      <span>Brian Kilgore</span>
      <v-spacer></v-spacer>
      <v-icon>arrow_drop_down</v-icon>
    </v-btn>
    <v-list dense>
      <v-list-tile to="/profile" nuxt>
        <v-list-tile-title>Profile</v-list-tile-title>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile to="/logout" nuxt>
        <v-list-tile-title>Logout</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  methods: {
  },
};
</script>

<style>

</style>
