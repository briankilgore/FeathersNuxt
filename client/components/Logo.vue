<template>
  <img v-bind:style="{ maxHeight: height + 'px' }" src="/images/feathers-logo-wide.png" />
</template>

<script>
export default {
  props: {
    height: String,
  },
  data: function () {
    return {
    };
  },
};
</script>

<style>

</style>