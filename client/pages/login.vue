<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar class="info" dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              label="Username"
              value=""
            ></v-text-field>
            <v-text-field
              label="Password"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (showPassword = !showPassword)"
              :type="showPassword ? 'text' : 'password'"
            ></v-text-field>
            <v-btn block info dark>Login</v-btn>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <p class="text-xs-center mb-0">Don't have an account? <router-link to="register">Sign up!</router-link></p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    layout: 'nonauth',
    data: () => ({
      title: 'Login',
      num1: 1,
      color: 'rgba(19, 206, 102, 0.8)',
      formError: null,
      formUsername: '',
      formPassword: '',
      showPassword: false
    }),
    methods: {
      login () {
        // console.log(this.$router)
        window.location.href = '/auth'
      }
    },
    components: {
    }
  }
</script>

<style>
.error {
  color: red;
}
</style>
