<template>
  <v-toolbar class="elevation-1" color="white" clipped-left fixed app>
    <v-toolbar-side-icon v-show="$vuetify.breakpoint.width <= 1264" @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title><Logo height="24"></Logo></v-toolbar-title>
  </v-toolbar>
</template>

<script>
import Logo from '~/components/Logo';

export default {
  props: {
    drawer: Boolean,
    title: String,
  },
  data: function () {
    return {
      breakpointWidth: 0,
    };
  },
  methods: {
    toggleDrawer: function () {
      this.$emit('update:drawer', !this.drawer);
    },
  },
  components: {
    Logo,
  },
};
</script>

<style>

</style>