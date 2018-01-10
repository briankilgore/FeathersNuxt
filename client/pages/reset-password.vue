<template>
  <v-container fluid fill-height>
    <v-layout
      justify-center
      align-center
    >
      <v-flex
        xs6
      >
        <v-card>
          <v-toolbar color="indigo" dark card flat>
            <v-toolbar-side-icon v-if="$vuetify.breakpoint.width <= 1264" @click.stop="toggleDrawer"></v-toolbar-side-icon>
            <v-toolbar-title>Reset Password</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="Email"
                v-model="emailAddress"
                :rules="emailRules"
                required
              ></v-text-field>
            </v-form>
            <v-btn @click="submit" block>submit</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      emailAddress: '',
      password: '',
      valid: false,
      showPassword: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
      ],
    };
  },
  methods: {
    submit: function () {
      console.log('Form submitted');
      if (this.$refs.form.validate()) {
        console.log('Form valid');
      } else {
        console.log('Form invalid');
      }
    },
  },
};
</script>

<style>

</style>
