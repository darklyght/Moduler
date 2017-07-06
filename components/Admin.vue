<template>
  <div class="card bg-white" id="admin-container">
    <div class="card-content">



      <!-- Tab Definitions -->
      <q-tabs :refs="$refs" default-tab="users" class="justified blue">
        <q-tab name="users" icon="person">
          Users
        </q-tab>
        <q-tab name="options" icon="settings">
          Options
        </q-tab>
        <q-tab name="logout" icon="exit_to_app">
          Log Out
        </q-tab>
      </q-tabs>



      <!-- Users Tab -->
      <div ref="users">
        <div class="card">
          <div class="card-title">
            <h4><span class="uppercase text-bold">Users</span></h4>
          </div>
          <div class="card-content">
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <div class="title-inline">
                  <div class="right-inline">
                    <button class="primary circular positive" @click="add_user()">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -5]">Add User</q-tooltip>
                      <i>add</i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-content">
                <q-data-table :data="users.all_users" :config="users.config" :columns="users.columns" ref="modules_table" id="modules_table">
                  <template slot="selection" scope="selection">
                    <button class="clear" @click="delete_users(selection)">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -5]">Delete</q-tooltip>
                      <i>delete</i>
                    </button>
                  </template>
                </q-data-table>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- Options Tab -->
      <div ref="options">
        <div class="card">
          <div class="card-title">
            <h4><span class="uppercase text-bold">Options</span></h4>
          </div>
          <div class="card-content">
          </div>
        </div>
      </div>



      <!-- Log Out Tab -->
      <div ref="logout">
        <div class="card">
          <div class="card-title">
            <h4><span class="uppercase text-bold">Log Out</span></h4>
          </div>
          <div class="card-content">
            <div class="card" :class="theme_bg">
              <div class="card-title">
                <h5>Log Out</h5>
              </div>
              <div class="card-content">
                Are you sure you want to log out?
                <button class="positive right-button" @click="logout()">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {Toast} from 'quasar'
  import Horizon from '@horizon/client'

  const horizon = Horizon({host: 'localhost:8181'})
  const app_users = horizon('app_users')

  export default {
    name: 'Admin',
    data () {
      return {
        //
        //
        //
        // Universal Variables
        user: {
          id: '',
          login_data: {
            username: '',
            password: ''
          },
          email: '',
          validated: true,
          validation_code: '',
          reset_state: false,
          reset_code: '',
          theme: '',
          registration_enabled: true
        },
        users: {
          all_users: [],
          config: {
            title: '&nbsp;',
            rowHeight: '50px',
            responsive: true,
            selection: 'multiple',
            messages: {
              noData: '<i>warning</i> No users to show. Add a user first.',
              noDataAfterFiltering: '<i>warning</i> No results. Please refine your search terms.'
            }
          },
          columns: [
            {
              label: 'Username',
              field: 'id',
              width: '75px',
              classes: this.table_bg,
              sort: 'string'
            },
            {
              label: 'Email',
              field: 'email',
              width: '75px',
              classes: this.table_bg,
              sort: 'string'
            },
            {
              label: 'Validated',
              field: 'validated',
              width: '50px',
              classes: this.table_bg,
              sort: 'boolean',
              format (value) {
                if (value) {
                  return 'Yes'
                }
                else {
                  return 'No'
                }
              }
            }
          ]
        }
      }
    },
    computed: {
      //
      //
      //
      // Options Tab Variables
      theme_bg: function () {
        switch (this.user.theme) {
          case 'pink':
            return 'bg-pink-3'
          case 'indigo':
            return 'bg-indigo-3'
          case 'blue':
            return 'bg-blue-3'
          case 'teal':
            return 'bg-teal-3'
          case 'orange':
            return 'bg-orange-3'
          case 'blue-grey':
            return 'bg-blue-grey-3'
        }
      }
    },
    methods: {
      //
      //
      //
      // Logout Tab Methods
      logout () {
        if (localStorage['username']) {
          localStorage.removeItem('username')
        }
        sessionStorage.removeItem('username')
        this.$router.push({
          name: 'Index'
        })
        Toast.create.positive('Logged out.')
      },
      //
      //
      //
      // Universal Methods
      update_theme () {
        var color1 = ''
        var color2 = ''
        var color3 = ''
        switch (this.user.theme) {
          case 'pink':
            color1 = 'rgba(248, 187, 208, 1.0)'
            color2 = 'rgba(136, 14, 79, 1.0)'
            color3 = 'rgba(136, 14, 79, 0.2)'
            break
          case 'indigo':
            color1 = 'rgba(197, 202, 233, 1.0)'
            color2 = 'rgba(26, 35, 126, 1.0)'
            color3 = 'rgba(26, 35, 126, 0.2)'
            break
          case 'blue':
            color1 = 'rgba(187, 222, 251, 1.0)'
            color2 = 'rgba(13, 17, 161, 1.0)'
            color3 = 'rgba(13, 17, 161, 0.2)'
            break
          case 'teal':
            color1 = 'rgba(178, 223, 219, 1.0)'
            color2 = 'rgba(0, 77, 64, 1.0)'
            color3 = 'rgba(0, 77, 64, 0.2)'
            break
          case 'orange':
            color1 = 'rgba(255, 224, 178, 1.0)'
            color2 = 'rgba(230, 81, 0, 1.0)'
            color3 = 'rgba(230, 81, 0, 0.2)'
            break
          case 'blue-grey':
            color1 = 'rgba(207, 216, 220, 1.0)'
            color2 = 'rgba(69, 90, 100, 1.0)'
            color3 = 'rgba(69, 90, 100, 0.2)'
            break
        }
        document.body.style.setProperty('--theme-color1', color1)
        document.body.style.setProperty('--theme-color2', color2)
        document.body.style.setProperty('--theme-color3', color3)
      },
      update (updated_info) {
        this.users.all_users = updated_info
      },
      update_admin (updated_info) {
        this.user = updated_info
        this.update_theme()
      }
    },
    beforeRouteEnter (to, from, next) {
      if (sessionStorage['username'] !== 'admin') {
        next(false)
      }
      else {
        next()
      }
    },
    mounted () {
      app_users.watch().subscribe(this.update)
      app_users.find('admin').watch().subscribe(this.update_admin)
    }
  }
</script>

<style lang="styl">
a
  color var(--theme-color2)
a:hover
  color var(--theme-color3)
table tr td a
  display block
  height 100%
  width 100%
#admin-container
  max-width 900px
  min-height 100vh
  margin-left auto
  margin-right auto
  margin-bottom 0px
#cap
  font-size 200%
#semester-select
  float right
  margin-top 10px
  margin-bottom 5px
#semester-text
  font-size 100%
  margin-top 8px
#text-canvas
  display none
.item-link
  height 40px
  line-height 12px
  font-size 80%
.title-inline
  width 100%
  display inline-block
  margin-bottom 5px
.left-inline
  float left
.right-inline
  float right
.center-inline
  float center
  margin 0 auto
.block-inline
  display inline-block
.right-button
  float right
  margin-top 20px
  margin-bottom 20px
.dialog-table
  height 40px
.q-data-table
  border none
.sharing td
  border none
  border-bottom 1px solid var(--theme-color2)
  padding-left 10px
  padding-right 10px
  padding-top 0px
  padding-bottom 0px
.sharing tr:hover
  background-color var(--theme-color1)
table.q-table:not(.responsive):not(.flipped).horizontal-delimiter th, table.q-table:not(.responsive):not(.flipped).cell-delimiter th, table.q-table:not(.responsive):not(.flipped).horizontal-delimiter td, table.q-table:not(.responsive):not(.flipped).cell-delimiter td
  background var(--theme-color1)
table.q-table.responsive:not(.flipped) tr, table.q-table.responsive:not(.flipped) td
  background var(--theme-color1)
.q-data-table table thead tr
  background var(--theme-color1)
.q-data-table-selection
  color var(--theme-color2)
  background var(--theme-color3)
.q-radio input:checked + div:before
  border-color var(--theme-color2)
.q-radio input:checked + div:after
  background-color var(--theme-color2)
.q-checkbox input:checked + div:before
  background-color var(--theme-color2)
  border-color var(--theme-color2)
.q-radio input + div:before
  border-color #777777
.q-checkbox input + div:before
  border-color #777777
input:not(.no-style), textarea:not(.no-style), .textfield:not(.no-style)
  border-bottom 2px solid #999
/*.modal.minimized .modal-content
  background-color var(--theme-color1)*/
th
  height 50px
  font-size 120%
body
  background-color darkgrey
:root
  --theme-color1 rgba(255, 255, 255, 1.0)
  --theme-color2 rgba(255, 255, 255, 1.0)
  --theme-color3 rgba(255, 255, 255, 0.2)
  overflow-y scroll
</style>
