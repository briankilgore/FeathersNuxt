<template>
  <div>
    <no-ssr>
      <notifications group="notice" width="100%" position="top center">
        <template slot="body" slot-scope="props">
          <v-alert
            class="alert ma-0"
            :type="props.item.type"
            transition="scale-transition"
            :value="true"
            v-on:input="props.close"
            dismissible
          >
            {{ props.item.text }}
          </v-alert>
        </template>
      </notifications>
    </no-ssr>
    <no-ssr>
      <notifications  group="alert" position="bottom center">
        <template slot="body" slot-scope="props">
          <v-snackbar
            :timeout="timeout"
            bottom
            multi-line
            :value="true"
          >
            {{ props.item.text }}
            <v-btn flat color="pink" @click.native="props.close">Close</v-btn>
          </v-snackbar>
        </template>
      </notifications>
    </no-ssr>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      timeout: 6000,
    };
  },
  computed: {
    message: function () {
      console.log(this.$store);
      return this.$store.state.alerts.message;
    },
    display: {
      get: function () {
        console.log(this.$store.state.alerts.display);
        return this.$store.state.alerts.display;
      },
      set: function (value) {
        this.$store.dispatch('alerts/display', value);
      },
    },
  },
  methods: {
    close: function () {
      console.log('closing notifications');
    },
  },
};
</script>

<style>
  .alert {
    position: absolute;
    width: 100% !important;
  }
</style>
