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
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
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
                v-model="emailAddress"
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
            </v-form>
            <v-btn @click="submit" block>Submit</v-btn>
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
      firstName: '',
      lastName: '',
      emailAddress: '',
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
          email: this.emailAddress,
          password: this.password,
        });

        // send signup verification notification
        this.authManagementCreate({
          action: 'resendVerifySignup',
          value: { email: user.email },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>

</style>
