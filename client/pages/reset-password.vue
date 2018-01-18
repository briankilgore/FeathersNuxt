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
          <v-toolbar color="green" dark card flat>
            <v-toolbar-title>Reset Password</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-5">
            <v-form v-if="!token" v-model="valid" ref="form" lazy-validation v-on:submit.prevent="requestPasswordReset">
              <v-text-field
                label="Email"
                prepend-icon="email"
                v-model="email"
                :rules="emailRules"
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
            <v-form v-else v-model="valid" ref="form" lazy-validation v-on:submit.prevent="resetPassword">
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
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
      ],
      showPassword: false,
      valid: false,
    };
  },
  computed: {
    token: function () {
      return this.$route.query.token;
    },
  },
  methods: {
    ...mapActions('authManagement', {
      authManagementCreate: 'create',
    }),
    requestPasswordReset: async function () {
      console.log('Form submitted');
      if (!this.$refs.form.validate()) {
        console.log('Form invalid');
        return;
      }
      console.log(`Sending password reset request to ${this.email}`);
      try {
        // send signup verification notification
        let response = await this.authManagementCreate({
          action: 'sendResetPwd',
          value: { email: this.email },
        });
        console.log(response);

        this.$notify({
          group: 'notice',
          type: 'success',
          text: `Password reset request sent. Please check your email.`,
        });
      } catch (error) {
        console.log(error);
        this.$notify({
          group: 'notice',
          type: 'error',
          text: `Unable to reset password. ${error.message}`,
        });
      }
    },
    resetPassword: async function () {
      console.log('Form submitted');
      if (!this.$refs.form.validate()) {
        console.log('Form invalid');
        return;
      }
      console.log(`Resetting password...`);
      try {
        let response = await this.authManagementCreate({
          action: 'resetPwdLong',
          value: {
            token: this.token, // compares to .resetToken
            password: this.password, // new password
          },
        });
        console.log(response);

        this.$notify({
          group: 'notice',
          type: 'success',
          text: `Password successfully reset. Please return to login screen to continue.`,
        });
      } catch (error) {
        console.log(error);
        this.$notify({
          group: 'notice',
          type: 'error',
          text: `Unable to reset password. ${error.message}`,
        });
      }
    },
  },
  components: {
    Logo,
  },
};
</script>

<style scoped>
.container {
  background-image: url(/images/man-working-in-modern-office_bw.jpg);
  background-size: cover;
}
</style>
