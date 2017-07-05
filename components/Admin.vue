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
          theme: '',
          registration_enabled: true
        },
        users: []
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
      update (updated_info) {
        this.users = updated_info
      },
      update_admin (updated_info) {
        this.user = updated_info
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
