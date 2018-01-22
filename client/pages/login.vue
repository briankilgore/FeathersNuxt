<template>
  <v-container fluid fill-height>
    <v-toolbar color="transparent" absolute flat>
      <v-toolbar-title><Logo height="36"></Logo></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/register" flat>Sign Up</v-btn>
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
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-5">
            <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent="signIn">
              <v-text-field
                label="Email"
                prepend-icon="email"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                prepend-icon="lock"
                v-model="password"
                :rules="passwordRules"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (showPassword = !showPassword)"
                :type="showPassword ? 'text' : 'password'"
                required
              ></v-text-field>
              <v-btn
                :loading="$store.state.auth.isAuthenticatePending"
                :disabled="$store.state.auth.isAuthenticatePending"
                type="submit"
                block
              >
                Submit
              </v-btn>
            </v-form>
            <p class="pt-3 text-xs-center">
              <nuxt-link to="/reset-password">I forgot my password</nuxt-link>
            </p>
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
      email: '',
      password: '',
      error: '',
      valid: false,
      showPassword: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
      ],
    };
  },
  methods: {
    ...mapActions({
      authenticate: 'auth/authenticate',
      logout: 'auth/logout',
    }),
    signIn: async function () {
      console.log('Form submitted');
      if (this.$refs.form.validate()) {
        console.log('Form valid');
        const { email, password } = this;
        this.authenticate({ strategy: 'local', email, password })
          .then((response) => {
            // console.log(response);
            this.$router.replace('/');
          })
          .catch((e) => {
            switch (e.name) {
              case 'NotAuthenticated':
                this.$notify({
                  group: 'notice',
                  type: 'info',
                  text: `${e.message}. Please check your email and password and try again.`,
                });
                break;
              case 'Error':
                this.$notify({
                  group: 'notice',
                  type: 'error',
                  text: `${e.name}. ${e.message}`,
                });
                break;
              default:
                this.$notify({
                  group: 'notice',
                  type: 'error',
                  text: 'Unknown error occurred. Please check your email and password and try again.',
                });
            }
          });
      } else {
        console.log('Form invalid');
      }
    },
  },
  mounted: function () {
    // this.logout();
  },
  watch: {
  },
  components: {
    Logo
  },
};
</script>

<style scoped>
.container {
  background-image: url(/images/backgrounds/man-working-in-modern-office_bw.jpg);
  background-size: cover;
}
</style>

