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
        <q-tab name="about" icon="info">
          About
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
              <input required type="text" v-model="login_data.username" class="full-width no-border" :class="{'has-error': $v.login_data.username.$error || $v.login_data.password_check.$error}" v-on:keyup.enter="login()">
              <label>Username</label>
            </div>
            <div class="floating-label">
              <input required type="password" v-model="login_data.password" class="full-width no-border" :class="{'has-error': $v.login_data.password.$error || $v.login_data.password_check.$error}" v-on:keyup.enter="login()">
              <label>Password</label>
            </div>
            <br />
            <br />
            <label>
              <q-checkbox v-model="login_data.remember"></q-checkbox>
              <span class="light-paragraph">&nbsp;Remember me</span>
            </label>
            <br />
            <button class="positive circular" id="login-button" @click="login()">
              <i>vpn_key</i>
            </button>
            <button class="blue clear" id="forgot-button" @click="forgot_password_dialog()">
              <label>Forgot Password</label>
            </button>
            <br />
            <br />
            <br />
            <g-signin-button :params="google_sign_in_params" @success="google_success" @error="google_error">
              <button class="blue">
                Sign in with Google
              </button>
            </g-signin-button>
            <br />
            <fb-signin-button :params="fb_sign_in_params" @success="fb_success" @error="fb_error">
              <button class="blue">
                Sign in with Facebook
              </button>
            </fb-signin-button>
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
              <input required type="text" v-model="register_data.username" class="full-width no-border" :class="{'has-error': $v.register_data.username.$error || $v.register_data.username_check.$error}" v-on:keyup.enter="register()">
              <label>Username</label>
            </div>
            <div class="floating-label">
              <input required type="password" v-model="register_data.password" class="full-width no-border" :class="{'has-error': $v.register_data.password.$error}" v-on:keyup.enter="register()">
              <label>Password</label>
            </div>
            <div class="floating-label">
              <input required type="password" v-model="register_data.repeat_password" class="full-width no-border" :class="{'has-error': $v.register_data.repeat_password.$error}" v-on:keyup.enter="register()">
              <label>Repeat Password</label>
            </div>
            <div class="floating-label">
              <input required type="text" v-model="register_data.email" class="full-width no-border" :class="{'has-error': $v.register_data.email.$error || $v.register_data.email_check.$error}" v-on:keyup.enter="register()">
              <label>Email</label>
            </div>
            <button class="positive circular" id="register-button" @click="register()">
              <i>create</i>
            </button>
          </div>
        </div>
      </div>


      <!-- About Tab -->
      <div ref="about">
        <div class="card" id="about-box">
          <div class="card-title">
            <h4><span class="uppercase text-bold">About</span></h4>
          </div>
          <div class="card-content">
            <h5><span class="text-bold">About Us</span></h5>
            <p>We are two students from the National University of Singapore majoring in Electrical Engineering.</p>
            <h5><span class="text-bold">About Moduler</span></h5>
            <p>Moduler is a web application created as part of our Orbital project at the National University of Singapore. Moduler aims to help NUS engineering students plan their modules, such that they would be able to take modules they are interested in, without worrying about whether they have taken the prerequisites.</p>
            <h5><span class="text-bold">Moduler API</span></h5>
            <p>A RESTful API is available for Moduler at <a href="http://orbital.darklyght.com:3000/" target="_blank">http://orbital.darklyght.com:3000/</a>. A registered account (not associated with a Facebook or Google account) at Moduler is required to use the API. The username and API key is used for HTTP authentication.</p>
            <p>Documentation for the API is available at <a href="http://docs.orbital.darklyght.com/" target="_blank">http://docs.orbital.darklyght.com/</a>.</p>
          </div>
        </div>
      </div>
    </div>



    <!-- Forgot Password Dialog Modal Definition -->
    <q-modal class="minimized" ref="forgot_password">
      <div class="modal-header">Forgot Password</div>
      <div class="modal-body">
        <table>
          <tr class="dialog-table">
            <td>
              <label>Username</label>
            </td>
            <td>
                <input required v-model="forgot_password.username" v-on:keyup.enter="reset_password()" />
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
              <label>Email Address</label>
            </td>
            <td>
                <input required v-model="forgot_password.email" v-on:keyup.enter="reset_password()" />
            </td>
          </tr>
          <tr class="dialog-table">
            <td>
            </td>
            <td align="right">
              <button class="negative clear" style="text-decoration: underline" @click="forgot_password_dialog_close()">Close</button>
              <button class="positive" @click="reset_password()">Reset</button>
            </td>
          </tr>
        </table>
      </div>
    </q-modal>
  </div>
</template>

<script>
  /* eslint-disable */
  window.fbAsyncInit = function() {
    FB.init({
      appId: '252564631903334',
      cookie: true,  // enable cookies to allow the server to access the session
      xfbml: true,  // parse social plugins on this page
      version: 'v2.8' // use graph api version 2.8
    });
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  /* eslint-enable */

  import Vue from 'vue'
  import Validations from 'vuelidate'
  import {required, sameAs, minLength, alphaNum, email} from 'vuelidate/lib/validators'
  import {Toast, Loading} from 'quasar'
  import Horizon from '@horizon/client'
  import Axios from 'axios'
  import Sjcl from 'sjcl'
  import GSignInButton from 'vue-google-signin-button'
  import FBSignInButton from 'vue-facebook-signin-button'
  import smtp_data from '../../../smtp_api.json'
  
  Vue.use(Validations)
  Vue.use(GSignInButton)
  Vue.use(FBSignInButton)
  
  const horizon = Horizon({host: 'localhost:8181'})
  const app_users = horizon('app_users')

  Toast.setDefaults({
    timeout: 3000
  })
  
  function make_code () {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  function uuid () {
    var d = new Date().getTime()
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now()
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  }

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
        google_sign_in_params: {
          client_id: '524259464334-q6ucfimeubjcf90j3p7a7i58v5padbmr.apps.googleusercontent.com'
        },
        fb_sign_in_params: {
          scope: 'email',
          return_scopes: true
        },
        register_data: {
          username: '',
          password: '',
          repeat_password: '',
          email: ''
        },
        forgot_password: {
          username: '',
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
              if (this.users[i].login_data.username === this.login_data.username && Sjcl.decrypt(smtp_data.users.darklyght, this.users[i].login_data.password) === this.login_data.password) {
                return true
              }
            }
            return false
          }
        },
        validated_check: {
          validated () {
            for (var i = 0; i < this.users.length; i++) {
              if (this.users[i].login_data.username === this.login_data.username) {
                return this.users[i].validated
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
              // if (this.users[i].login_data.username !== 'admin' && this.users[i].email === this.register_data.email) {
              if (this.users[i].email === this.register_data.email) {
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
        this.$v.login_data.validated_check.$touch()
        if (this.$v.login_data.validated_check.$error) {
          Toast.create.negative('Account has not been validated. Please check your registered email for validation instructions.')
          return
        }
        sessionStorage.setItem('username', this.login_data.username)
        if (this.login_data.remember) {
          localStorage.setItem('username', this.login_data.username)
        }
        Loading.show()
        app_users.update({
          id: this.login_data.username,
          reset_state: false,
          reset_code: ''
        })
        // if (sessionStorage['username'] === 'admin') {
        //   this.$router.push({
        //     name: 'Admin'
        //   })
        // }
        // else {
        //   this.$router.push({
        //     name: 'Modules',
        //     params: {
        //       username: this.login_data.username
        //     }
        //   })
        // }
        this.$router.push({
          name: 'Modules',
          params: {
            username: this.login_data.username
          }
        })
        Loading.hide()
        Toast.create.positive('Logged in.')
      },
      google_success (user) {
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].id === user.getBasicProfile().getName()) {
            sessionStorage.setItem('username', user.getBasicProfile().getName())
            this.$router.push({
              name: 'Modules',
              params: {
                username: user.getBasicProfile().getName()
              }
            })
            return
          }
        }
        for (i = 0; i < this.users.length; i++) {
          if (this.users[i].email === user.getBasicProfile().getEmail()) {
            Toast.create.negative('Email is registered with another account. Please use another email.')
            return
          }
        }
        var login_data = {
          username: user.getBasicProfile().getName(),
          password: ''
        }
        Loading.show()
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
            to: user.getBasicProfile().getEmail(),
            text: ('Your account has been registered successfully at http://orbital.darklyght.com using Google authentication.')
          }
        }).then((response) => {
          Loading.hide()
          if (response.status === 200 && response.data.status === 'success') {
            app_users.store({
              id: user.getBasicProfile().getName(),
              login_data: login_data,
              email: user.getBasicProfile().getEmail(),
              validated: true,
              validation_code: '',
              reset_state: false,
              reset_code: '',
              api_key: uuid(),
              theme: 'blue',
              modules: [[]],
              shared_with_others: [],
              shared_with_you: []
            })
            sessionStorage.setItem('username', user.getBasicProfile().getName())
            this.$router.push({
              name: 'Modules',
              params: {
                username: user.getBasicProfile().getName()
              }
            })
          }
          else {
            Toast.create.negative('There has been an error. Please contact the server administrator.')
          }
        })
      },
      google_error () {
        Toast.create.negative('There has been an error. Please contact the server administrator.')
      },
      fb_success (success) {
        FB.api('/me?fields=name,email', result => { // eslint-disable-line
          for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].id === result.name) {
              sessionStorage.setItem('username', result.name)
              this.$router.push({
                name: 'Modules',
                params: {
                  username: result.name
                }
              })
              return
            }
          }
          for (i = 0; i < this.users.length; i++) {
            if (this.users[i].email === result.email) {
              Toast.create.negative('Email is registered with another account. Please use another email.')
              return
            }
          }
          var login_data = {
            username: result.name,
            password: ''
          }
          Loading.show()
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
              to: result.email,
              text: ('Your account has been registered successfully at http://orbital.darklyght.com using Facebook authentication.')
            }
          }).then((response) => {
            Loading.hide()
            if (response.status === 200 && response.data.status === 'success') {
              app_users.store({
                id: result.name,
                login_data: login_data,
                email: result.email,
                validated: true,
                validation_code: '',
                reset_state: false,
                reset_code: '',
                api_key: uuid(),
                theme: 'blue',
                modules: [[]],
                shared_with_others: [],
                shared_with_you: []
              })
              sessionStorage.setItem('username', result.name)
              this.$router.push({
                name: 'Modules',
                params: {
                  username: result.name
                }
              })
            }
            else {
              Toast.create.negative('There has been an error. Please contact the server administrator.')
            }
          })
        })
      },
      fb_error () {
        Toast.create.negative('There has been an error. Please contact the server administrator.')
      },
      register () {
        var login_data = {
          username: this.register_data.username,
          password: Sjcl.encrypt(smtp_data.users.darklyght, this.register_data.password)
        }
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
        Loading.show()
        var validation_code = make_code()
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
            text: ('Your account has been registered successfully at http://orbital.darklyght.com.<br /><br />The username you have provided is <i>' + this.register_data.username + '</i>.<br /><br />Your validation code is <i>' + validation_code + '</i>.<br /><br />In order to validate your account, please visit http://orbital.darklyght.com/#/validate/' + this.register_data.username + ' and enter your validation code.<br /><br />Alternatively, you may follow this link http://orbital.darklyght.com/#/validate/' + this.register_data.username + '/' + validation_code + ' to activate your account.')
          }
        }).then((response) => {
          Loading.hide()
          if (response.status === 200 && response.data.status === 'success') {
            app_users.store({
              id: this.register_data.username,
              login_data: login_data,
              email: this.register_data.email,
              validated: false,
              validation_code: validation_code,
              reset_state: false,
              reset_code: '',
              api_key: uuid(),
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
        // app_users.find('admin').fetch().subscribe(result => {
        //   if (result) {
        //     if (!result.registration_enabled) {
        //       Toast.create.negative('Registration has been disabled by the admin. Please contact the admin for assistance.')
        //     }
        //     else {
        //       this.$v.register_data.username.$touch()
        //       if (this.$v.register_data.username.$error) {
        //         Toast.create.negative('Username must be at least 5 characters long and only consist of alphanumerics.')
        //         return
        //       }
        //       this.$v.register_data.password.$touch()
        //       if (this.$v.register_data.password.$error) {
        //         Toast.create.negative('Password must be at least 5 characters long.')
        //         return
        //       }
        //       this.$v.register_data.repeat_password.$touch()
        //       if (this.$v.register_data.repeat_password.$error) {
        //         Toast.create.negative('Passwords do not match. Please check again.')
        //         return
        //       }
        //       this.$v.register_data.email.$touch()
        //       if (this.$v.register_data.email.$error) {
        //         Toast.create.negative('Invalid email. Please check again.')
        //         return
        //       }
        //       this.$v.register_data.username_check.$touch()
        //       if (this.$v.register_data.username_check.$error) {
        //         Toast.create.negative('Username has already been taken. Please choose another username.')
        //         return
        //       }
        //       this.$v.register_data.email_check.$touch()
        //       if (this.$v.register_data.email_check.$error) {
        //         Toast.create.negative('Email is registered with another account. Please use another email.')
        //         return
        //       }
        //       Loading.show()
        //       var validation_code = make_code()
        //       Axios.request({
        //         url: smtp_data.endpoint,
        //         method: 'post',
        //         auth: {
        //           username: 'darklyght',
        //           password: smtp_data.users.darklyght
        //         },
        //         params: {
        //           subject: 'Successful Registration on Moduler',
        //           from: 'mailer@darklyght.com',
        //           to: this.register_data.email,
        //           text: ('Your account has been registered successfully at http://orbital.darklyght.com.<br /><br />The username you have provided is <i>' + this.register_data.username + '</i>.<br /><br />Your validation code is <i>' + validation_code + '</i>.<br /><br />In order to validate your account, please visit http://orbital.darklyght.com/#/validate/' + this.register_data.username + ' and enter your validation code.<br /><br />Alternatively, you may follow this link http://orbital.darklyght.com/#/validate/' + this.register_data.username + '/' + validation_code + ' to activate your account.')
        //         }
        //       }).then((response) => {
        //         Loading.hide()
        //         if (response.status === 200 && response.data.status === 'success') {
        //           app_users.store({
        //             id: this.register_data.username,
        //             login_data: login_data,
        //             email: this.register_data.email,
        //             validated: false,
        //             validation_code: validation_code,
        //             reset_state: false,
        //             reset_code: '',
        //             api_key: uuid(),
        //             theme: 'blue',
        //             modules: [[]],
        //             shared_with_others: [],
        //             shared_with_you: []
        //           })
        //           Toast.create.positive('Account has been created successfully. An email has been sent to the registered email address.')
        //           this.register_data.username = ''
        //           this.register_data.password = ''
        //           this.register_data.repeat_password = ''
        //           this.register_data.email = ''
        //         }
        //         else {
        //           Toast.create.negative('There has been an error. Please contact the server administrator.')
        //         }
        //       })
        //     }
        //   }
        //   else {
        //     if (this.register_data.username === 'admin') {
        //       Loading.show()
        //       Axios.request({
        //         url: smtp_data.endpoint,
        //         method: 'post',
        //         auth: {
        //           username: 'darklyght',
        //           password: smtp_data.users.darklyght
        //         },
        //         params: {
        //           subject: 'Admin Account Created on Moduler',
        //           from: 'mailer@darklyght.com',
        //           to: this.register_data.email,
        //           text: 'An admin account has been registered successfully at http://orbital.darklyght.com.<br /><br />The username of the admin account is <i>admin</i>. <br /><br />You may now log in with the password you have provided.'
        //         }
        //       }).then((response) => {
        //         Loading.hide()
        //         if (response.status === 200 && response.data.status === 'success') {
        //           app_users.store({
        //             id: this.register_data.username,
        //             login_data: login_data,
        //             email: this.register_data.email,
        //             validated: true,
        //             validation_code: '',
        //             reset_state: false,
        //             reset_code: '',
        //             theme: 'blue',
        //             registration_enabled: true
        //           })
        //           Toast.create.positive('Admin account has been created. An email has been sent to the admin email address.')
        //           this.register_data.username = ''
        //           this.register_data.password = ''
        //           this.register_data.repeat_password = ''
        //           this.register_data.email = ''
        //         }
        //         else {
        //           Toast.create.negative('There has been an error. Please contact the server administrator.')
        //         }
        //       })
        //     }
        //     else {
        //       Toast.create.negative('Admin account must have username \'admin\'.')
        //     }
        //   }
        // })
      },
      forgot_password_dialog: function () {
        this.$refs.forgot_password.open()
      },
      forgot_password_dialog_close: function () {
        this.forgot_password.username = ''
        this.forgot_password.email = ''
        this.$refs.forgot_password.close()
      },
      reset_password: function () {
        app_users.find(this.forgot_password.username).fetch().subscribe(result => {
          if (result) {
            if (result.email === this.forgot_password.email) {
              Loading.show()
              var reset_code = make_code()
              Axios.request({
                url: smtp_data.endpoint,
                method: 'post',
                auth: {
                  username: 'darklyght',
                  password: smtp_data.users.darklyght
                },
                params: {
                  subject: 'Password Reset on Moduler',
                  from: 'mailer@darklyght.com',
                  to: this.forgot_password.email,
                  text: ('Your account with username <i>' + this.forgot_password.username + '</i> at http://orbital.darklyght.com has been flagged for a password reset.<br /><br />If you believe this has been done in error, simply proceed to log in.<br /><br />To reset your password, your reset code is <i>' + reset_code + '</i>.<br /><br />In order to reset your password, please visit http://orbital.darklyght.com/#/reset/' + this.forgot_password.username + ' and enter your validation code.<br /><br />Alternatively, you may follow this link http://orbital.darklyght.com/#/reset/' + this.forgot_password.username + '/' + reset_code + ' to reset your password.')
                }
              }).then((response) => {
                Loading.hide()
                if (response.status === 200 && response.data.status === 'success') {
                  app_users.update({
                    id: this.forgot_password.username,
                    reset_state: true,
                    reset_code: reset_code
                  })
                  Toast.create.positive('An email has been sent to your registered address with further instructions to reset your password.')
                  this.forgot_password_dialog_close()
                }
                else {
                  Toast.create.negative('There has been an error. Please contact the server administrator.')
                }
              })
            }
            else {
              Toast.create.negative('The email you have provided is incorrect. Please check again.')
            }
          }
          else {
            Toast.create.negative('The username you have entered is not found. Please check again.')
          }
        })
      },
      update: function (new_users) {
        this.users = new_users
        // for (var i = 0; i < this.users.length; i++) {
        //   if (this.users[i].id === 'admin') {
        //     return
        //   }
        // }
        // Toast.create.negative('No admin account. Please create an admin account first.')
        // this.register_data.username = 'admin'
        // this.tab = 'register'
      }
    },
    mounted () {
      app_users.watch().subscribe(this.update)
    }
  }
</script>

<style lang="styl">
table tr td a
  display block
  height 100%
  width 100%
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
#forgot-button
  float right
  margin-top 30px
  margin-bottom 20px
  margin-right 10px
.q-checkbox input:checked + div:before
  background-color #027be3
  border-color #027be3
.dialog-table
  height 40px
input:not(.no-style), textarea:not(.no-style), .textfield:not(.no-style)
  border-bottom 2px solid #999
body
  background-color darkgrey
:root
  overflow-y scroll
</style>
