<template>
  <div class="card bg-white" id="login-container">
    <div class="card-content">



      <!-- Tab Definitions -->
      <q-tabs :refs="$refs" class="justified blue" v-model="tab">
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
            <div class="floating-label">
              <input required type="text" v-model="register_data.email" class="full-width" :class="{'has-error': $v.register_data.email.$error || $v.register_data.email_check.$error}" v-on:keyup.enter="register()">
              <label>Email</label>
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
  import {required, sameAs, minLength, alphaNum, email} from 'vuelidate/lib/validators'
  import {Toast} from 'quasar'
  import Horizon from '@horizon/client'
  import Axios from 'axios'
  import smtp_data from '../../../smtp_api.json'
  
  Vue.use(Validations)
  
  const horizon = Horizon({host: 'localhost:8181'})
  const app_users = horizon('app_users')

  Toast.setDefaults({
    timeout: 3000
  })
  
  export default {
    name: 'Index',
    data () {
      return {
        tab: 'login',
        login_data: {
          username: '',
          password: '',
          remember: false
        },
        register_data: {
          username: '',
          password: '',
          repeat_password: '',
          email: ''
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
        username: {required, alphaNum, minLength: minLength(5)},
        password: {required, minLength: minLength(5)},
        repeat_password: {sameAsPassword: sameAs('password')},
        email: {required, email},
        username_check: {
          username_used () {
            for (var i = 0; i < this.users.length; i++) {
              if (this.users[i].login_data.username === this.register_data.username) {
                return false
              }
            }
            return true
          }
        },
        email_check: {
          email_used () {
            for (var i = 0; i < this.users.length; i++) {
              if (this.users[i].login_data.username !== 'admin' && this.users[i].email === this.register_data.email) {
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
        if (sessionStorage['username'] === 'admin') {
          this.$router.push({
            name: 'Admin'
          })
        }
        else {
          this.$router.push({
            name: 'Modules',
            params: {
              username: this.login_data.username
            }
          })
        }
        Toast.create.positive('Logged in.')
      },
      register () {
        var login_data = {
          username: this.register_data.username,
          password: this.register_data.password
        }
        app_users.find('admin').fetch().subscribe(result => {
          if (result) {
            if (!result.registration_enabled) {
              Toast.create.negative('Registration has been disabled by the admin. Please contact the admin for assistance.')
            }
            else {
              this.$v.register_data.username.$touch()
              if (this.$v.register_data.username.$error) {
                Toast.create.negative('Username must be at least 5 characters long and only consist of alphanumerics.')
                return
              }
              this.$v.register_data.password.$touch()
              if (this.$v.register_data.password.$error) {
                Toast.create.negative('Password must be at least 5 characters long.')
                return
              }
              this.$v.register_data.repeat_password.$touch()
              if (this.$v.register_data.repeat_password.$error) {
                Toast.create.negative('Passwords do not match. Please check again.')
                return
              }
              this.$v.register_data.email.$touch()
              if (this.$v.register_data.email.$error) {
                Toast.create.negative('Invalid email. Please check again.')
                return
              }
              this.$v.register_data.username_check.$touch()
              if (this.$v.register_data.username_check.$error) {
                Toast.create.negative('Username has already been taken. Please choose another username.')
                return
              }
              this.$v.register_data.email_check.$touch()
              if (this.$v.register_data.email_check.$error) {
                Toast.create.negative('Email is registered with another account. Please use another email.')
                return
              }
              Axios.request({
                url: smtp_data.endpoint,
                method: 'post',
                auth: {
                  username: 'darklyght',
                  password: smtp_data.users.darklyght
                },
                params: {
                  subject: 'Successful Registration on Moduler',
                  from: 'mailer@darklyght.com',
                  to: this.register_data.email,
                  text: ('Your account has been registered successfully at http://orbital.darklyght.com.<br />The username you have provided is <i>' + this.register_data.username + '</i><br />You may now log in with the password you have provided.')
                }
              }).then((response) => {
                if (response.status === 200 && response.data.status === 'success') {
                  app_users.store({
                    id: this.register_data.username,
                    login_data: login_data,
                    email: this.register_data.email,
                    theme: 'blue',
                    modules: [[]],
                    shared_with_others: [],
                    shared_with_you: []
                  })
                  Toast.create.positive('Account has been created successfully. An email has been sent to the registered email address.')
                  this.register_data.username = ''
                  this.register_data.password = ''
                  this.register_data.repeat_password = ''
                  this.register_data.email = ''
                }
                else {
                  Toast.create.negative('There has been an error. Please contact the server administrator.')
                }
              })
            }
          }
          else {
            if (this.register_data.username === 'admin') {
              Axios.request({
                url: smtp_data.endpoint,
                method: 'post',
                auth: {
                  username: 'darklyght',
                  password: smtp_data.users.darklyght
                },
                params: {
                  subject: 'Admin Account Created on Moduler',
                  from: 'mailer@darklyght.com',
                  to: this.register_data.email,
                  text: 'An admin account has been registered successfully at http://orbital.darklyght.com.<br />The username of the admin account is <i>admin</i>. <br />You may now log in with the password you have provided.'
                }
              }).then((response) => {
                Loading.hide()
                if (response.status === 200) {
                    id: this.register_data.username,
                    login_data: login_data,
                    email: this.register_data.email,
                    theme: 'blue',
                    registration_enabled: true
                  })
                  Toast.create.positive('Admin account has been created. An email has been sent to the admin email address.')
                  this.register_data.username = ''
                  this.register_data.password = ''
                  this.register_data.repeat_password = ''
                  this.register_data.email = ''
                }
                else {
                  Toast.create.negative('There has been an error. Please contact the server administrator.')
                }
              })
            }
            else {
              Toast.create.negative('Admin account must have username \'admin\'.')
            }
          }
        })
      },
      update: function (new_users) {
        this.users = new_users
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].id === 'admin') {
            return
          }
        }
        Toast.create.negative('No admin account. Please create an admin account first.')
        this.register_data.username = 'admin'
        this.tab = 'register'
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
