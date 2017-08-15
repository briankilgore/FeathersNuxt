<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar class="info" dark>
            <v-toolbar-title>Reset Password</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field
              label="Email Address"
              value=""
              required
              v-model="emailAddress"
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
      emailAddress: null
    }),
    asyncData: ({ query }) => ({
      token: query.token
    }),
    computed: {
    },
    methods: {
      isValidToken () {
        console.log(this)
        return this.token === 'asdfasdfasdf'
      }
    },
    mounted: () => {
      // console.log(this)
    },
    components: {
    }
  }
</script>

<style scoped>

</style>
