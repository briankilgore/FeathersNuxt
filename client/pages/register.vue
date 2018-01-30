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
            <v-toolbar-title>Sign Up</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-5">
            <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent="submit">
              <v-text-field
                label="First Name"
                v-model="firstName"
                :rules="[(v) => !!v || 'First Name is required']"
                required
              ></v-text-field>
              <v-text-field
                label="Last Name"
                v-model="lastName"
                :rules="[(v) => !!v || 'Last Name is required']"
                required
              ></v-text-field>
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
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
      usersCreate: 'users/create',
      authManagementCreate: 'authManagement/create',
    }),
    submit: async function () {
      console.log('Form submitted');
      if (!this.$refs.form.validate()) {
        console.log('Form invalid');
        return;
      }

      console.log('Form valid');
      try {
        // create user
        let user = await this.usersCreate({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });

        // send signup verification notification
        await this.authManagementCreate({
          action: 'resendVerifySignup',
          value: { email: user.email },
        });

        this.$notify({
          group: 'notice',
          type: 'success',
          text: `Account Created! Please verify your email: ${user.email}`,
        });
      } catch (error) {
        console.log(error);
        this.$notify({
          group: 'notice',
          type: 'error',
          text: `Unable to create account. ${error.message}`,
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
  background-image: url(/images/backgrounds/man-working-in-modern-office_bw.jpg);
  background-size: cover;
}
</style>
