<template>
  <v-toolbar color="green" absolute clipped-left dark fixed flat app>
    <v-toolbar-side-icon v-show="$vuetify.breakpoint.width <= 1264" @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title><Logo height="24"></Logo></v-toolbar-title>
    <v-spacer></v-spacer>
    <profile></profile>
  </v-toolbar>
</template>

<script>
import Logo from '~/components/Logo';
import Profile from '~/components/Profile';

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
    Profile,
  },
};
</script>

<style>

</style>