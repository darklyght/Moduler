<template>
  <div class="card bg-white" id="reset-container">
    <div class="card-content">
      <div class="card">
        <div class="card-title">
          <h4><span class="uppercase text-bold">Reset Password</span></h4>
        </div>
        <div class="card-content">
          <div class="floating-label">
            <input required type="text" v-model="reset_code" class="full-width" v-on:keyup.enter="validate()">
            <label>Reset Code</label>
          </div>
          <button class="positive" id="reset-button" @click="reset()">
            <label>Reset</label>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast, Loading} from 'quasar'
  import Horizon from '@horizon/client'
  import Axios from 'axios'
  import smtp_data from '../../../smtp_api.json'

  const horizon = Horizon({host: 'localhost:8181'})
  const app_users = horizon('app_users')

  function make_code () {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 12; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  export default {
    name: 'Reset',
    data () {
      return {
        reset_code: '',
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
          modules: [[{
            code: '',
            credits: 0,
            type: '',
            grade: '',
            su_option: false,
            final_grade: ''
          }]],
          shared_with_others: [],
          shared_with_you: []
        }
      }
    },
    methods: {
      reset: function () {
        if (this.reset_code === this.user.reset_code) {
          Loading.show()
          var new_password = make_code()
          Axios.request({
            url: smtp_data.endpoint,
            method: 'post',
            auth: {
              username: 'darklyght',
              password: smtp_data.users.darklyght
            },
            params: {
              subject: 'Successful Password Reset on Moduler',
              from: 'mailer@darklyght.com',
              to: this.user.email,
              text: ('Your password at http://orbital.darklyght.com has been succssfully reset.<br /><br />Your new password is <i>' + new_password + '</i>.<br /><br />Please change your password as soon as you log in.')
            }
          }).then((response) => {
            Loading.hide()
            if (response.status === 200 && response.data.status === 'success') {
              var login_data = {
                username: this.$route.params.username,
                password: new_password
              }
              app_users.update({
                id: this.$route.params.username,
                login_data: login_data,
                reset_state: false,
                reset_code: ''
              })
              Toast.create.positive('Password has been reset. Your new password has been sent to your registered email address.')
            }
            else {
              Toast.create.negative('There has been an error. Please contact the server administrator.')
            }
          })
        }
        else {
          Toast.create.negative('Reset code is incorrect. Please check again.')
        }
      },
      update: function (updated_info) {
        this.user = updated_info
        if (!this.user.reset_state) {
          this.$router.push({
            name: 'Index'
          })
        }
      }
    },
    mounted () {
      if (this.$route.params.code) {
        this.reset_code = this.$route.params.code
      }
      app_users.find(this.$route.params.username).watch().subscribe(this.update)
    }
  }
</script>

<style lang="styl">
#reset-container
  max-width 900px
  min-height 100vh
  margin-left auto
  margin-right auto
  margin-bottom 0px
#reset-button
  float right
  margin-top 20px
  margin-bottom 20px
#forgot-button
  float left
  margin-top 30px
  margin-bottom 20px
body
  background-color darkgrey
:root
  overflow-y scroll
</style>
