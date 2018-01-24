<template>
  <v-menu offset-y>
    <v-btn class="white--text" flat fab :ripple="false" slot="activator">
      <v-avatar size="40px">
        <img :src="currentUser.profileUrl" />
      </v-avatar>
    </v-btn>
    <v-card>
      <v-list dense>
        <v-list-tile class="pt-3 pb-3" avatar>
          <v-list-tile-avatar>
            <img :src="currentUser.profileUrl" style="width: 48px; height: 48px;" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ currentUser.firstName }} {{ currentUser.lastName }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ currentUser.email }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile to="/profile" nuxt>
          <v-list-tile-avatar>
            <v-icon left>person</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="body-2">Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat to="/logout">Logout</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    currentUser: { type: Object, default: () => {} },
  },
  methods: {
  },
};
</script>

<style>

</style>
