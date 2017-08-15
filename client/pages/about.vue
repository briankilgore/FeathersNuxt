<template>
  <v-container>
    <v-layout row>
      <v-flex xs6>
        <page-title v-bind:title="title"></page-title>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PageTitle from '~/components/PageTitle.vue'
  
  export default {
    layout: 'auth',
    data: () => ({
      title: 'About'
    }),
    computed: {
    },
    methods: {
    },
    mounted: () => {
    },
    components: {
      PageTitle
    }
  }
</script>

<style scoped>

</style>
