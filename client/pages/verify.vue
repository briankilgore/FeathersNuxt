<template>
  <v-container fluid fill-height>
    <v-layout
      justify-center
      align-center
    >
      <v-flex
        xs6
      >
        <v-card>
          <v-toolbar color="indigo" dark card flat>
            <v-toolbar-title>Verify</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div v-if="user.isVerified">
              <h1>Email [{{ user.email }}] has been successfully verified!</h1>
              Please <nuxt-link to="/login">login</nuxt-link>
            </div>
            <div v-if="error">
              <h1><pre>{{ error }}</pre></h1>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: function () {
    return {
      user: {},
      error: '',
    };
  },
  methods: {
    ...mapActions('authManagement', {
      authManagementCreate: 'create',
    }),
  },
  mounted: async function () {
    console.log(this.$route);
    const token = this.$route.query.token;

    if (token) {
      try {
        let user = await this.authManagementCreate({
          action: 'verifySignupLong',
          value: token,
        });

        if (user && user.isVerified) {
          this.user = user;
        }
      } catch (error) {
        console.log(error);
        this.error = error;
      }
    } else {
      this.message = 'No token provided';
    }
  },
  // can be used to validate route. Responds with 404 if validate returns false
  // validate ({ params, query }) {
  //   // Must be a number
  //   return /^\d+$/.test(query.token);
  // },
};
</script>

<style>

</style>
