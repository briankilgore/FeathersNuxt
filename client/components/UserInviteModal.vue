<template>
  <v-layout row>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="green" slot="activator" dark flat>
        <v-icon left>person_add</v-icon> Invite User
      </v-btn>
      <v-card>
        <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent="submit">
          <v-card-title>
            <span class="headline">Invite Users</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-select
                    v-model="invitees"
                    label="Email addresses"
                    hint="Enter the email addresses for the users you would like to invite. Press tab or enter after each entry"
                    persistent-hint
                    chips
                    tags
                    clearable
                    deletable-chips
                    :rules="emailRules"
                    multiple
                    append-icon="email"
                  >
                    <template slot="selection" slot-scope="data">
                      <v-chip
                        close
                        @input="data.parent.selectItem(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                        :key="JSON.stringify(data.item)"
                        v-if="isValidEmail(data.item)"
                      >
                        {{ data.item }}
                      </v-chip>
                      <v-chip
                        close
                        text-color="red"
                        @input="data.parent.selectItem(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                        :key="JSON.stringify(data.item)"
                        v-else
                      >
                        <v-avatar>
                          <v-icon>warning</v-icon>
                        </v-avatar>
                        {{ data.item }}
                      </v-chip>
                    </template>
                  </v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
            <v-btn color="blue darken-1" type="submit" flat>Send</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: function () {
    return {
      invitees: [],
      dialog: false,
      valid: false,
      emailRules: [
        (v) => v.length > 0 || 'E-mail is required',
        (v) => v.every((email) => this.isValidEmail(email)) || 'E-mail must be valid',
      ],
    };
  },
  methods: {
    submit: function () {
      if (!this.$refs.form.validate()) {
        console.log('Form invalid');
        return;
      }

      const invitees = this.invitees.map((invitee) => {
        return { email: invitee };
      });

      this.$emit('update:invitees', invitees);
      this.dialog = false;
      this.$refs.form.reset();
    },
    close: function () {
      this.dialog = false;
      this.$refs.form.reset();
    },
    isValidEmail: function (email) {
      const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return emailRegEx.test(email);
    },
  },
  mounted: function () {
  },
  watch: {
    // invitees: function (value) {
    //   // value must be a valid email address
    //   const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    //   value.forEach((email) => {
    //     if (!emailRegEx.test(email)) {
    //       // this.error = true;
    //       this.errorMessage = 'Invalid email';
    //     }
    //   });
    //   console.log(value);
    // }
  },
};
</script>

<style>

</style>
