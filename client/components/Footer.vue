<template>
  <v-footer class="elevation-1" color="white" app>
    <span>{{ title }} &copy; 2017</span>
  </v-footer>
</template>

<script>
export default {
  props: {
    title: String,
  },
  data: function () {
    return {
    };
  },
};
</script>

<style>

</style>