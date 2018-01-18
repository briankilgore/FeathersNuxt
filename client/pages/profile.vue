<template>
  <v-container :class="{ 'pa-0': $vuetify.breakpoint.smAndDown }" fluid>
    <v-layout wrap>
      <v-flex xs12 md8 offset-md2>
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
                    <v-btn dark icon @click="edit = !edit">
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
                <profile-avatar :loading="profilePicLoading" editable :src.sync="profilePic"></profile-avatar>
              </v-flex>
              <v-flex xs12>
                <v-form v-model="valid" ref="form" lazy-validation v-on:submit.prevent="submit">
                  <v-list two-line>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="blue darken-2">person</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content v-if="edit === false">
                        <v-list-tile-title>{{firstName}} {{lastName}}</v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-content v-else>
                        <v-layout style="width: 100%">
                          <v-flex xs6>
                            <v-text-field
                              label="First Name"
                              v-model="firstName"
                              :rules="[(v) => !!v || 'First Name is required']"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs6>
                            <v-text-field
                              label="Last Name"
                              v-model="lastName"
                              :rules="[(v) => !!v || 'Last Name is required']"
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset v-if="edit === false"></v-divider>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="blue darken-2">phone</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content v-if="edit === false">
                        <v-list-tile-title>{{phone | phoneNumber}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{phoneType}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-content v-else>
                        <v-layout style="width: 100%">
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
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset v-if="edit === false"></v-divider>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="blue darken-2">mail</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title>{{email}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{emailType}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset v-if="edit === false"></v-divider>
                    <v-list-tile>
                      <v-list-tile-action>
                        <v-icon color="blue darken-2">location_on</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content v-if="edit === false">
                        <v-list-tile-title>{{street}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{city}}, {{state}} {{postalCode}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-content v-else>
                        <v-layout style="width: 100%">
                          <v-flex xs4>
                            <v-text-field
                              label="Street Address"
                              v-model="street"
                              :rules="[(v) => !!v || 'Street Address is required']"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field
                              label="City"
                              v-model="city"
                              :rules="[(v) => !!v || 'City is required']"
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs2>
                            <v-select
                              v-bind:items="states"
                              v-model="state"
                              label="State"
                              :rules="[(v) => !!v || 'State is required']"
                              multi-line
                              required
                            ></v-select>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field
                              label="Postal Code"
                              v-model="postalCode"
                              :rules="[(v) => !!v || 'Postal Code is required']"
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider inset v-if="edit === false"></v-divider>
                  </v-list>
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
import { mapActions, mapState } from 'vuex';
import ProfileAvatar from '~/components/ProfileAvatar';
import EditHeaderDialog from '~/components/EditHeaderDialog';

export default {
  layout: 'authenticated',
  data: function () {
    return {
      states: ['CA','CO'],
      profilePicLoading: false,
      valid: false,
      error: false,
      edit: false,
      success: false,
    };
  },
  computed: {
    firstName: {
      get () {
        return this.$store.state.auth.user.firstName;
      },
      set (value) {
        const userId = this.$store.state.auth.user._id;
        this.patchUser(userId, { firstName: value });
      },
    },
    lastName: {
      get () {
        return this.$store.state.auth.user.lastName;
      },
      set (value) {
        const userId = this.$store.state.auth.user._id;
        this.patchUser(userId, { lastName: value });
      },
    },
    email: function () {
      return this.$store.state.auth.user.email;
    },
    emailType: {
      get () {
        return this.$store.state.auth.user.emailType;
      },
      set (value) {
        const userId = this.$store.state.auth.user._id;
        this.patchUser(userId, { emailType: value });
      },
    },
    phone: {
      get () {
        return this.$store.state.auth.user.phone;
      },
      set (value) {
        const userId = this.$store.state.auth.user._id;
        this.patchUser(userId, { phone: value });
      },
    },
    phoneType: {
      get () {
        return this.$store.state.auth.user.phoneType;
      },
      set (value) {
        const userId = this.$store.state.auth.user._id;
        this.patchUser(userId, { phoneType: value });
      },
    },
    street: {
      get () {
        return this.$store.state.auth.user.street;
      },
      set (value) {
        const userId = this.$store.state.auth.user._id;
        this.patchUser(userId, { street: value });
      },
    },
    city: {
      get () {
        return this.$store.state.auth.user.city;
      },
      set (value) {
        const userId = this.$store.state.auth.user._id;
        this.patchUser(userId, { city: value });
      },
    },
    state: {
      get () {
        return this.$store.state.auth.user.state;
      },
      set (value) {
        const userId = this.$store.state.auth.user._id;
        this.patchUser(userId, { state: value });
      },
    },
    postalCode: {
      get () {
        return this.$store.state.auth.user.postalCode;
      },
      set (value) {
        const userId = this.$store.state.auth.user._id;
        this.patchUser(userId, { postalCode: value });
      },
    },
    profilePic: {
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
        this.patchUser(userId, { headerImage: value });
      },
    },
    // ...mapState('auth', {
    //   user: 'user',
    // }),
  },
  methods: {
    ...mapActions({
      userPatch: 'users/patch',
      createUpload: 'upload/create',
      userService: 'auth/user',
      // watchUser: 'auth/watchUser'
    }),
    patchUser: debounce(function(userId, data) {
      this.userPatch([userId, data])
    }, 1000, { 'maxWait': 5000 }),
    changePassword: async function () {
      const payload = { password: this.password };

      if (this.password) {
        this.error = false;
        this.success = false;

        try {
          await this.userPatch([this.user._id, payload]);
          this.success = true;
        } catch (e) {
          throw e;
        }
      }
    },
    // updateProfilePic: async function (data) {
    //   let upload = await this.createUpload(data);
    //   if(upload) {
    //     console.log(upload);
    //     this.userPatch([this.user._id, { profileUrl: upload.secure_url }]);
    //   } else {
    //     console.log('Error uploading image');
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
    // this.watchUser();
    console.log(this.$store);
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

