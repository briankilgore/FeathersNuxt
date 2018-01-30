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
                <span class="display-1">Clients</span>
              </v-flex>
            </v-layout>
          </v-container>
          </v-card-media>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12>
                <div>
                  <v-data-table
                    v-bind:headers="headers"
                    v-bind:items="items"
                    v-bind:search="search"
                    v-bind:pagination.sync="pagination"
                    hide-actions
                  >
                    <template slot="headerCell" slot-scope="props">
                      <v-tooltip bottom>
                        <span slot="activator">
                          {{ props.header.text }}
                        </span>
                        <span>
                          {{ props.header.text }}
                        </span>
                      </v-tooltip>
                    </template>
                    <template slot="items" slot-scope="props">
                      <td>{{ props.item.name }}</td>
                      <td  class="text-xs-right">{{ props.item.calories }}</td>
                      <td  class="text-xs-right">{{ props.item.fat }}</td>
                      <td  class="text-xs-right">{{ props.item.carbs }}</td>
                      <td  class="text-xs-right">{{ props.item.protein }}</td>
                      <td  class="text-xs-right">{{ props.item.sodium }}</td>
                      <td  class="text-xs-right">{{ props.item.calcium }}</td>
                      <td  class="text-xs-right">{{ props.item.iron }}</td>
                    </template>
                  </v-data-table>
                  <div class="text-xs-center pt-2">
                    <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'authenticated',
  // beforeRouteEnter: function (to, from, next) {
  //   console.log(to, from);
  //   return false;
  // },
  data: function () {
    return {
      headers: [],
      items: [],
      pagination: {},
    };
  },
  computed: {
    currentUser: function () {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style>

</style>
