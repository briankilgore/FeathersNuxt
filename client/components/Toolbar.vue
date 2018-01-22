<template>
  <v-toolbar class="elevation-1" color="white" clipped-left fixed app>
    <v-toolbar-side-icon v-show="$vuetify.breakpoint.width <= 1264" @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title><Logo height="24"></Logo></v-toolbar-title>
    <v-spacer></v-spacer>
    <profile-menu :currentUser="currentUser"></profile-menu>
  </v-toolbar>
</template>

<script>
import Logo from '~/components/Logo';
import ProfileMenu from '~/components/ProfileMenu';

export default {
  props: {
    drawer: Boolean,
    title: String,
    currentUser: { type: Object, default: () => {} },
  },
  data: function () {
    return {
    };
  },
  methods: {
    toggleDrawer: function () {
      this.$emit('update:drawer', !this.drawer);
    },
  },
  components: {
    Logo,
    ProfileMenu,
  },
};
</script>

<style>

</style>