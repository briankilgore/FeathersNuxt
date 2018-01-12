<template>
  <v-footer color="green" v-show="$vuetify.breakpoint.width > 1264" fixed app>
    <span class="white--text">{{ title }} &copy; 2017</span>
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