<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
          <v-card-media
            class="green white--text"
            height="250px"
            :src="`/backgrounds/vector/${Math.floor(Math.random() * 40) + 1}.jpg`"
          >
            <v-container fill-height fluid>
              <v-layout column class="media" fill-height>
                <v-flex xs12 align-end flexbox>
                  <v-card-title>
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
                <profile-avatar :loading="profilePicLoading" editable :src="user.profileUrl" v-on:update="updateProfilePic"></profile-avatar>
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
                        <v-list-tile-title>{{phone}}</v-list-tile-title>
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
                      <v-list-tile-content v-if="edit === false">
                        <v-list-tile-title>{{email}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{emailType}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                      <v-list-tile-content v-else>
                        <v-layout style="width: 100%">
                          <v-flex xs12>
                            <v-text-field
                              label="Email"
                              v-model="email"
                              :rules="[(v) => !!v || 'Email is required']"
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
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
                  <v-btn
                    v-if="edit"
                    class="mt-5"
                    :loading="$store.state.auth.isAuthenticatePending"
                    :disabled="$store.state.auth.isAuthenticatePending"
                    type="submit"
                    block
                  >
                    Save
                  </v-btn>
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
import { mapActions, mapState } from 'vuex';
import ProfileAvatar from '~/components/ProfileAvatar';

export default {
  layout: 'authenticated',
  data: function () {
    return {
      firstName: 'Brian',
      lastName: 'Kilgore',
      email: 'briankilgore@yahoo.com',
      emailType: 'Work',
      phone: '(303) 704-7193',
      phoneType: 'Mobile',
      street: '1672 Oneida St.',
      city: 'Denver',
      state: 'CO',
      postalCode: '80220',
      profileUrl: '',
      states: ['CA','CO'],
      valid: false,
      error: false,
      edit: true,
      success: false,
    };
  },
  computed: {
    ...mapState('auth', {
      user: 'user',
    }),
  },
  methods: {
    ...mapActions({
      userPatch: 'users/patch',
      createUpload: 'upload/create',
      userService: 'auth/user',
      // watchUser: 'auth/watchUser'
    }),
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
    updateProfilePic: async function (data) {
      let upload = await this.createUpload(data);
      if(upload) {
        console.log(upload);
        this.userPatch([this.user._id, { profileUrl: upload.secure_url }]);
      } else {
        console.log('Error uploading image');
      }
    },
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
  mounted: function () {
    // this.watchUser();
    console.log(this.$store);
  },
  components: {
    ProfileAvatar,
  }
};
</script>

<style>
.avatar img {
  border: 5px solid rgba(255, 255, 255, 0.1);
}
</style>

