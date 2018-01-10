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
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent="signIn">
              <v-text-field
                label="Email"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
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
                Login
              </v-btn>
            </v-form>
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
            let msg;
            switch (e.name) {
              case 'NotAuthenticated':
                msg = `${e.message}. Please check your email and password and try again.`;
                this.$notify({
                  group: 'notice',
                  type: 'info',
                  text: msg,
                });
                break;
              case 'Error':
                msg = `${e.name}. ${e.message}`;
                this.$notify({
                  group: 'notice',
                  type: 'error',
                  text: msg,
                });
                break;
              default:
                msg = 'Unknown error occurred. Please check your email and password and try again.';
                this.$notify({
                  group: 'notice',
                  type: 'error',
                  text: msg,
                });
            }
          });
      } else {
        console.log('Form invalid');
      }
    },
  },
  mounted: function () {
  },
  watch: {
    error: function () {
      if (this.error) {
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    },
  },
};
</script>

<style>
</style>

