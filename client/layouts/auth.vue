<template>
  <v-app light>
    <v-navigation-drawer persistent clipped v-model="drawer" enable-resize-watcher>
      <v-list>
        <v-list-tile v-for="item in navItems" :key="item.title" :to="item.route" nuxt exact>
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-slide-x-reverse-transition mode="out-in">
          <nuxt />
        </v-slide-x-reverse-transition>
      </v-container>
    </main>
    <v-footer fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: true,
      navItems: [
        { icon: 'home', title: 'Home', route: '/' },
        { icon: 'info_outline', title: 'About', route: '/about' }
      ],
      title: 'FeathersNuxt'
    }),
    mounted: () => {
      // console.log(this)
    },
    watch: {
      drawer () {
        // console.log(this.drawer)
      }
    }
  }
</script>

<style scoped>

</style>
