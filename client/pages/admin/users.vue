<template>
  <v-container :class="{ 'pa-0': $vuetify.breakpoint.smAndDown }" fluid>
    <v-layout wrap>
      <v-flex xs12>
        <v-card>
          <v-card-media
            class="blue-grey lighten-1 white--text"
            height="75px"
            :src="`/images/headers/${currentUser.headerImage}`"
          >
          <v-container fluid>
            <v-layout>
              <v-flex xs12 align-end flexbox>
                <span class="display-1">Users</span>
              </v-flex>
            </v-layout>
          </v-container>
          </v-card-media>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12>
                  <v-toolbar card color="white" prominent>
                    <user-invite-modal :invitees.sync="invitees"></user-invite-modal>
                  </v-toolbar>
                  <v-divider></v-divider>
                  <v-data-table
                      v-bind:headers="headers"
                      :items="users"
                      hide-actions
                      class="elevation-0"
                    >
                    <template slot="items" slot-scope="props">
                      <tr>
                        <td>
                          <v-icon v-if="props.item.status === 'Pending'">help_outline</v-icon>
                          <profile-avatar :size="25" :src="props.item.profileUrl" v-else></profile-avatar>
                        </td>
                        <td>{{ props.item.firstName }} {{ props.item.lastName }}</td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.status }}</td>
                        <td class="text-xs-right">
                          <v-btn v-if="props.item.status === 'Pending'" small flat>Resend Invitation</v-btn>
                          <span v-else>&nbsp;</span>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                  <v-divider></v-divider>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserInviteModal from '~/components/UserInviteModal';
import ProfileAvatar from '~/components/ProfileAvatar';

export default {
  layout: 'authenticated',
  // beforeRouteEnter: function (to, from, next) {
  //   console.log(to, from);
  //   return false;
  // },
  data: function () {
    return {
      headers: [
        { text: '', sortable: false, value: 'avatar', align: 'left' },
        { text: 'Full Name', sortable: false, value: 'name', align: 'left' },
        { text: 'Email', value: 'email', align: 'left' },
        { text: 'Status', value: 'status', align: 'left' },
        { text: '', value: 'action', align: 'right' },
      ],
      // invitees: [
      //   { name: '', email: 'brianleeekilgore@gmail.com', status: 'Pending' },
      // ],
    };
  },
  computed: {
    currentUser: function () {
      return this.$store.state.auth.user;
    },
    invitees: {
      get () {
        return this.$store.getters['invitees/list'];
      },
      async set (invitees) {
        console.log(invitees);

        // const invitees = value.map((invitee) => {
        //   return { to: invitee };
        // });

        let response = await this.$store.dispatch('invitees/create', invitees);
        console.log(response);
      },
    },
    users: function () {
      let users = this.$store.getters['users/list'];
      return users.concat(this.invitees);
    },
  },
  mounted: function () {
    this.$store.dispatch('users/find');
    this.$store.dispatch('invitees/find');
  },
  components: {
    UserInviteModal,
    ProfileAvatar,
  },
};
</script>

<style>
  .pending {
    background-color: rgba(0,0,255,0.1);
  }
</style>
