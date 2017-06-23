<template>
  <div class="card bg-white" id="login-container">
    <div class="card-content">



      <!-- Tab Definitions -->
      <q-tabs :refs="$refs" default-tab="login" class="justified blue">
        <q-tab name="login" icon="vpn_key">
          Log In
        </q-tab>
        <q-tab name="register" icon="create">
          Register
        </q-tab>
      </q-tabs>



      <!-- Log In Tab -->
      <div ref="login">
        <div class="card" id="login-box">
          <div class="card-title">
            <h4><span class="uppercase text-bold">Log In</span></h4>
          </div>
          <div class="card-content">
            <div class="floating-label">
              <input required type="text" v-model="login_data.username" class="full-width" :class="{'has-error': $v.login_data.username.$error || $v.login_data.password_check.$error}" v-on:keyup.enter="login()">
              <label>Username</label>
            </div>
            <div class="floating-label">
              <input required type="password" v-model="login_data.password" class="full-width" :class="{'has-error': $v.login_data.password.$error || $v.login_data.password_check.$error}" v-on:keyup.enter="login()">
              <label>Password</label>
            </div>
            <br />
            <br />
            <label>
              <q-checkbox v-model="login_data.remember"></q-checkbox>
              <span class="light-paragraph">&nbsp;Remember me</span>
            </label>
            <button class="positive circular" id="login-button" @click="login()">
              <i>vpn_key</i>
            </button>
          </div>
        </div>
      </div>



      <!-- Register Tab -->
      <div ref="register">
        <div class="card" id="register-box">
          <div class="card-title">
            <h4><span class="uppercase text-bold">Register</span></h4>
          </div>
          <div class="card-content">
            <div class="floating-label">
              <input required type="text" v-model="register_data.username" class="full-width" :class="{'has-error': $v.register_data.username.$error || $v.register_data.username_check.$error}" v-on:keyup.enter="register()">
              <label>Username</label>
            </div>
            <div class="floating-label">
              <input required type="password" v-model="register_data.password" class="full-width" :class="{'has-error': $v.register_data.password.$error}" v-on:keyup.enter="register()">
              <label>Password</label>
            </div>
            <div class="floating-label">
              <input required type="password" v-model="register_data.repeat_password" class="full-width" :class="{'has-error': $v.register_data.repeat_password.$error}" v-on:keyup.enter="register()">
              <label>Repeat Password</label>
            </div>
            <button class="positive circular" id="register-button" @click="register()">
              <i>create</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Validations from 'vuelidate'
  import {required, sameAs, minLength, alphaNum} from 'vuelidate/lib/validators'
  import {Toast} from 'quasar'
  import Horizon from '@horizon/client'
  
  Vue.use(Validations)
  
  const horizon = Horizon({host: '203.114.75.97:8181'})
  const app_users = horizon('app_users')

  Toast.setDefaults({
    timeout: 3000
  })
  
  export default {
    name: 'Index',
    data () {
      return {
        login_data: {
          username: '',
          password: '',
          remember: false
        },
        register_data: {
          username: '',
          password: '',
          repeat_password: ''
        },
        users: []
      }
    },
    validations: {
      login_data: {
        username: {required},
        password: {required},
        password_check: {
          password_correct () {
            for (var i = 0; i < this.users.length; i++) {
              if (this.users[i].login_data.username === this.login_data.username && this.users[i].login_data.password === this.login_data.password) {
                return true
              }
            }
            return false
          }
        }
      },
      register_data: {
        username: {required, alphaNum, minLength: minLength(6)},
        password: {required, minLength: minLength(6)},
        repeat_password: {sameAsPassword: sameAs('password')},
        username_check: {
          username_used () {
            for (var i = 0; i < this.users.length; i++) {
              if (this.users[i].login_data.username === this.register_data.username) {
                return false
              }
            }
            return true
          }
        }
      }
    },
    methods: {
      login () {
        this.$v.login_data.username.$touch()
        if (this.$v.login_data.username.$error) {
          Toast.create.negative('Username field cannot be empty.')
          return
        }
        this.$v.login_data.password.$touch()
        if (this.$v.login_data.password.$error) {
          Toast.create.negative('Password field cannot be empty.')
          return
        }
        this.$v.login_data.password_check.$touch()
        if (this.$v.login_data.password_check.$error) {
          Toast.create.negative('Username or password is incorrect. Please try again.')
          return
        }
        sessionStorage.setItem('username', this.login_data.username)
        if (this.login_data.remember) {
          localStorage.setItem('username', this.login_data.username)
        }
        this.$router.push({
          name: 'Modules',
          params: {
            username: this.login_data.username
          }
        })
        Toast.create.positive('Logged in.')
      },
      register () {
        this.$v.register_data.username.$touch()
        if (this.$v.register_data.username.$error) {
          Toast.create.negative('Username must be at least 6 characters long and only consist of alphanumerics.')
          return
        }
        this.$v.register_data.password.$touch()
        if (this.$v.register_data.password.$error) {
          Toast.create.negative('Password must be at least 6 characters long.')
          return
        }
        this.$v.register_data.repeat_password.$touch()
        if (this.$v.register_data.repeat_password.$error) {
          Toast.create.negative('Passwords do not match. Please check again.')
          return
        }
        this.$v.register_data.username_check.$touch()
        if (this.$v.register_data.username_check.$error) {
          Toast.create.negative('Username has already been taken. Please choose another username.')
          return
        }
        var login_data = {
          username: this.register_data.username,
          password: this.register_data.password
        }
        app_users.store({
          id: this.register_data.username,
          login_data: login_data,
          theme: 'blue',
          modules: [[]],
          shared_with_others: [],
          shared_with_you: []
        })
        Toast.create.positive('Account has been created successfully. You may now log in.')
      },
      update: function (new_users) {
        this.users = new_users
      }
    },
    mounted () {
      app_users.watch().subscribe(this.update)
    }
  }
</script>

<style lang="styl">
#login-container
  max-width 900px
  min-height 100vh
  margin-left auto
  margin-right auto
  margin-bottom 0px
#login-button, #register-button
  float right
  margin-top 20px
  margin-bottom 20px
body
  background-color darkgrey
:root
  overflow-y scroll
</style>
