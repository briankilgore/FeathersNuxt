<template>
  <v-avatar
    size="200px"
    class="grey lighten-4 elevation-4 image-container"
  >
    <img :src="src" alt="avatar" v-if="src">
    <v-icon style="font-size: 8rem;" v-else>person</v-icon>
    <label for="file" class="text">Upload new photo</label>
    <input type="file" name="file" id="file" class="inputfile" @change="update" />
  </v-avatar>
</template>

<script>
export default {
  props: ['editable', 'src'],
  data: function () {
    return {
      edit: false,
    }
  },
  methods: {
    update: function (event) {
      const files = event.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      console.log(files[0]);
      reader.onloadend = (e) => {
        console.log(e);
        this.$emit('update', {
          name: files[0].name,
          type: files[0].type,
          dataUri: e.target.result,
        });
      };
    }
  }
}
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
  display: none;
}

.image-container:hover .text {
  display: block;
}

</style>
