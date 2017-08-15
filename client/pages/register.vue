<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar class="info" dark>
            <v-toolbar-title>Sign up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              name="firstName"
              label="First Name"
              value=""
              required
              v-model="firstName"
            ></v-text-field>
            <v-text-field
              label="Last Name"
              value=""
              required
              v-model="lastName"
            ></v-text-field>
            <v-text-field
              label="Email Address"
              value=""
              required
              v-model="emailAddress"
            ></v-text-field>
            <v-text-field
              label="Password"
              hint="At least 8 characters"
              min="8"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (showPassword = !showPassword)"
              :type="showPassword ? 'text' : 'password'"
              required
              v-model="password"
            ></v-text-field>
            <v-btn block info dark v-on:click.native="submit">Sign Up</v-btn>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <p class="text-xs-center mb-0">If you already have an account, please <router-link to="login">login</router-link></p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
// import querystring from 'querystring'

export default {
  layout: 'nonauth',
  data () {
    return {
      num1: 1,
      color: 'rgba(19, 206, 102, 0.8)',
      formError: null,
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      showPassword: true,
      response: ''
    }
  },
  methods: {
    submit () {
      var data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.emailAddress,
        password: this.password
      }

      axios.post('http://127.0.0.1:3030/api/users', data)
      .then((response) => {
        console.log(response)
        this.$router.replace('/')
      })
      .catch((error) => {
        console.error(error)
        this.response = error
      })
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
