<template>
  <v-dialog v-model="dialog" persistent max-width="1200">
    <v-btn v-if="$vuetify.breakpoint.smAndDown" color="white" dark slot="activator" icon outline>
      <v-icon>palette</v-icon>
    </v-btn>
    <v-btn v-else color="white" dark slot="activator" outline>
      <v-icon left>palette</v-icon>Edit Header
    </v-btn>
    <v-card>
      <v-toolbar card dense color="white elevation-1">
        <v-spacer></v-spacer>
        <v-btn icon @click.native="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            xs12 sm6 md4 lg3
            v-for="n in 40"
            :key="n"
          >
            <v-card flat tile hover ripple>
              <v-card-media
                :src="`/images/headers/vector/${n}.jpg`"
                height="150px"
                @click="selectHeader(n)"
              >
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: function () {
    return {
      dialog: false,
    };
  },
  methods: {
    selectHeader: function (value) {
      const headerImage = (value > 0) ? `vector/${value}.jpg` : '';
      this.$emit('update:headerImage', headerImage);
      this.dialog = false;
    },
  },
};
</script>

<style>

</style>
