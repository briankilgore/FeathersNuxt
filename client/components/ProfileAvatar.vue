<template>
  <v-avatar
    :style="{ minWidth: size + 'px' }"
    :size="size + 'px'"
    class="grey lighten-1 elevation-0 image-container"
  >
    <img :class="{ border: border }" :src="src" alt="avatar" v-if="src">
    <v-icon class="white--text" v-bind:style="{ fontSize: size / 20 + 'em' }" v-else>person</v-icon>
    <div v-if="editable">
      <label for="file" id="overlay">
        <span v-bind:style="{ fontSize: size / 100 + 'em' }" class="text">Upload new photo</span>
      </label>
      <input type="file" name="file" id="file" class="inputfile" @change="update" />
    </div>
  </v-avatar>
</template>

<script>
export default {
  props: ['size', 'editable', 'src', 'border'],
  data: function () {
    return {
      edit: false,
    };
  },
  computed: {
    avatarSize: function () {
      switch (this.size) {
        case 'small':
          return 50;
        case 'medium':
          return 100;
        case 'large':
          return 150;
        case 'xlarge':
          return 200;
      };
    },
    iconSize: function () {
      switch (this.size) {
        case 'small':
          return 2;
        case 'medium':
          return 4;
        case 'large':
          return 6;
        case 'xlarge':
          return 8;
      };
    },
  },
  methods: {
    update: function (event) {
      if (this.editable) {
        const files = event.target.files;
        const reader = new FileReader(); // eslint-disable-line no-undef
        reader.readAsDataURL(files[0]);
        console.log(files[0]);
        reader.onloadend = (e) => {
          console.log(e);
          this.$emit('update:src', {
            name: files[0].name,
            type: files[0].type,
            dataUri: e.target.result,
          });
        };
      }
    },
  },
};
</script>

<style scoped>
  input[type=file] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .image-container {
      position: relative;
      display: inline-block;
  }

  .text {
    color: white;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
    opacity: 1;
  }

  .image-container:hover #overlay {
    display: block;
    cursor: pointer;
  }

  #overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: none;
    border-radius: 50%;
    background-color: rgba(192,192,192,0.5);
  }

  .border {
    border: 5px solid rgba(255, 255, 255, 0.1);
  }
</style>
