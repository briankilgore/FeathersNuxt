<template>
  <v-dialog :value="dialog" persistent max-width="500px" transition="dialog-bottom-transition" :fullscreen="$vuetify.breakpoint.smAndDown">
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="pink"
      slot="activator"
      @click="open"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent="submit">
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field 
                  label="Legal first name" 
                  required 
                  v-model="firstName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field 
                  label="Legal last name" 
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  v-model="lastName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Email"
                  required
                  v-model="email"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>* indeicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat type="submit">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
  },
  data: function () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      valid: false,
    };
  },
  methods: {
    submit: function () {
      console.log('Form submitted');
      if (!this.$refs.form.validate()) {
        console.log('Form invalid');
        return;
      }
      this.$emit('update:form', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      });
      this.close();
    },
    close: function () {
      this.$emit('update:dialog', false);
    },
    open: function () {
      this.$emit('update:dialog', true);
    },
  },
  mounted: function () {
  },
};
</script>

<style>

</style>
