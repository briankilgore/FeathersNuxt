<template>
  <v-container :class="{ 'pa-0': $vuetify.breakpoint.smAndDown }" fluid>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-card-media
            class="blue-grey lighten-1 white--text"
            height="250px"
            :src="`/images/headers/${headerImage}`"
          >
            <v-container fill-height fluid>
              <v-layout column class="media" fill-height>
                <v-flex xs12 align-end flexbox>
                  <v-card-title>
                    <edit-header-dialog :headerImage.sync="headerImage"></edit-header-dialog>
                    <v-spacer></v-spacer>
                    <v-btn dark icon @click="toggleEdit">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-text>
            <v-layout wrap style="position: relative; top: -175px;">
              <v-flex xs12 class="text-xs-center">
                <p class="display-1 white--text">{{firstName}} {{lastName}}</p>
                <profile-avatar :loading="profilePicLoading" editable :src.sync="profileUrl"></profile-avatar>
              </v-flex>
              <v-flex v-if="edit === false" xs12>
                  <v-list two-line>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="blue darken-2">person</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{firstName}} {{lastName}}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="blue darken-2">phone</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{phone | phoneNumber}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{phoneType}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="blue darken-2">mail</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{email}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{emailType}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="blue darken-2">location_on</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{street}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{city}}, {{state}} {{postalCode}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset></v-divider>
                  </v-list>
              </v-flex>
              <v-flex v-else>
                <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent="submit">
                  <v-container grid-list-xl>
                    <v-layout wrap>
                      <v-flex xs12 sm6>
                        <v-text-field
                          label="First Name"
                          v-model="firstName"
                          :rules="[(v) => !!v || 'First Name is required']"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field
                          label="Last Name"
                          v-model="lastName"
                          :rules="[(v) => !!v || 'Last Name is required']"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field
                          label="Phone"
                          v-model="phone"
                          mask="phone"
                          :rules="[(v) => !!v || 'Phone number is required']"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap>
                      <v-flex xs12 sm4>
                        <v-text-field
                          label="Street Address"
                          v-model="street"
                          :rules="[(v) => !!v || 'Street Address is required']"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm3>
                        <v-text-field
                          label="City"
                          v-model="city"
                          :rules="[(v) => !!v || 'City is required']"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm2>
                        <v-select
                          v-bind:items="states"
                          v-model="state"
                          label="State"
                          :rules="[(v) => !!v || 'State is required']"
                          multi-line
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm3>
                        <v-text-field
                          label="Postal Code"
                          v-model="postalCode"
                          :rules="[(v) => !!v || 'Postal Code is required']"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-btn type="submit" color="primary" dark block>Save</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { debounce } from 'lodash';
import { mapActions, mapMutations, mapState } from 'vuex';
import ProfileAvatar from '~/components/ProfileAvatar';
import EditHeaderDialog from '~/components/EditHeaderDialog';

export default {
  layout: 'authenticated',
  data: function () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      emailType: '',
      phone: '',
      phoneType: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      states: ['CA','CO'],
      profilePicLoading: false,
      valid: false,
      error: false,
      edit: false,
      success: false,
    };
  },
  computed: {
    profileUrl: {
      get () {
        return this.$store.state.auth.user.profileUrl;
      },
      async set (data) {
        const userId = this.$store.state.auth.user._id;
        const upload = await this.createUpload(data);

        if(upload) {
          console.log(upload);
          this.userPatch([userId, { profileUrl: upload.secure_url }]);
        } else {
          console.log('Error uploading image');
        }
      },
    },
    headerImage: {
      get () {
        return this.$store.state.auth.user.headerImage;
      },
      set (value) {
        console.log(value);
        const userId = this.$store.state.auth.user._id;
        this.userPatch([userId, { headerImage: value }]);
      },
    },
  },
  methods: {
    ...mapActions({
      userPatch: 'users/patch',
      createUpload: 'upload/create',
      userService: 'auth/user',
    }),
    toggleEdit: function () {
      this.loadDefaults();
      this.edit = !this.edit;
    },
    submit: async function () {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        emailType: this.emailType,
        phone: this.phone,
        phoneType: this.phoneType,
        street: this.street,
        city: this.city,
        state: this.state,
        postalCode: this.postalcode,
      };

      const user = await this.userPatch([
        this.$store.state.auth.user._id,
        data,
      ]);

      console.log("User updated", user);
      this.edit = false;
    },
    loadDefaults: function () {
      const user = this.$store.state.auth.user;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.emailType = user.emailType;
      this.phone = user.phone;
      this.phoneType = user.phoneType;
      this.street = user.street;
      this.city = user.city;
      this.state = user.state;
      this.postalCode = user.postalCode;
    },
    // changePassword: async function () {
    //   const payload = { password: this.password };

    //   if (this.password) {
    //     this.error = false;
    //     this.success = false;

    //     try {
    //       await this.userPatch([this.user._id, payload]);
    //       this.success = true;
    //     } catch (e) {
    //       throw e;
    //     }
    //   }
    // },
  },
  watch: {
    success: function () {
      if (this.success) {
        setTimeout(() => {
          this.success = false;
        }, 3000);
      }
    },
    error: function () {
      if (this.error) {
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    },
  },
  filters: {
    phoneNumber: function (value) {
      var s2 = (""+value).replace(/\D/g, '');
      var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
      return (!m) ? null : "(" + m[1] + ") " + m[2] + " - " + m[3];
    },
  },
  mounted: function () {
    // console.log(this.$store);
  },
  created: function () {
    // set default values from store
    this.loadDefaults();
  },
  components: {
    ProfileAvatar,
    EditHeaderDialog,
  }
};
</script>

<style>
.avatar img {
  border: 5px solid rgba(255, 255, 255, 0.1);
}
</style>
