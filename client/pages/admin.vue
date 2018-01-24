<template>
  <v-container :class="{ 'pa-0': $vuetify.breakpoint.smAndDown }" fluid>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-card-media
            class="blue-grey lighten-1 white--text"
            height="75px"
            :src="`/images/headers/${currentUser.headerImage}`"
          >
          <v-container fluid>
            <v-layout>
              <v-flex xs12 align-end flexbox>
                <span class="display-1">Administration</span>
              </v-flex>
            </v-layout>
          </v-container>
          </v-card-media>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'authenticated',
  // beforeRouteEnter: function (to, from, next) {
  //   console.log(to, from);
  //   return false;
  // },
  data: function () {
    return {
    };
  },
  computed: {
    currentUser: function () {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style>

</style>
