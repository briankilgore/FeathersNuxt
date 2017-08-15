<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3 class="text-xs-center">
        <div v-if="isValidToken()">
          <page-title v-bind:title="title"></page-title>
        </div>
        <div v-else>
          Error: Invalid Token
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PageTitle from '~/components/PageTitle.vue'
  
  export default {
    layout: 'nonauth',
    data: () => ({
      title: 'Verify Email',
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
      PageTitle
    }
  }
</script>

<style scoped>

</style>
