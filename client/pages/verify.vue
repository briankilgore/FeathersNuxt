<template>
  <v-container fluid fill-height>
    <v-toolbar color="transparent" absolute flat>
      <v-toolbar-title><Logo height="36"></Logo></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/login" flat>Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-layout
      justify-center
      align-center
    >
      <v-flex
        xs12 sm8 md6 xl4
      >
        <v-card>
          <v-toolbar color="cardHeader" dark card flat>
            <v-toolbar-title>Verify</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div v-if="user.isVerified">
              <h2>{{ user.email }} has been successfully verified!</h2>
              <p class="pt-5">
                <v-btn block to="/login">Login</v-btn>
              </p>
            </div>
            <div v-if="error">
              <h1>{{ error }}</h1>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo';
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
    verifyUserFromToken: async function (token) {
      if (token) {
        try {
          const user = await this.authManagementCreate({
            action: 'verifySignupLong',
            value: token,
          });

          if (user && user.isVerified) {
            this.user = user;
          }
        } catch (error) {
          console.log(error);
          this.error = 'Invalid token';
        }
      } else {
        this.error = 'No token provided';
      }
    },
  },
  mounted: async function () {
    const token = this.$route.query.token;
    this.verifyUserFromToken(token);
  },
  // can be used to validate route. Responds with 404 if validate returns false
  // validate ({ params, query }) {
  //   // Must be a number
  //   return /^\d+$/.test(query.token);
  // },
  components: {
    Logo,
  },
};
</script>

<style scoped>
.container {
  background-image: url(/images/backgrounds/man-working-in-modern-office_bw.jpg);
  background-size: cover;
}
</style>
