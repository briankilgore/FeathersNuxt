<template>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: function () {
    return {
      error: '',
    };
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
  },
  mounted: function () {
    console.log('Logging user out');
    this.logout()
      .then(() => {
        this.$router.replace('/login');
      });
  },
  watch: {
    error: function () {
      if (this.error) {
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    },
  },
};
</script>

<style>
</style>

