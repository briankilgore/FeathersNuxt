<template>
  <v-container :class="{ 'pa-0': $vuetify.breakpoint.smAndDown }" fluid>
    <v-layout
      justify-center
      align-center
    >
      <h1>Home</h1>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'authenticated',
};
</script>

<style>

</style>
