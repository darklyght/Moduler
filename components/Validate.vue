<template>
  <div class="card bg-white" id="validate-container">
    <div class="card-content">
      <div class="card">
        <div class="card-title">
          <h4><span class="uppercase text-bold">Validate Account</span></h4>
        </div>
        <div class="card-content">
          <div class="floating-label">
            <input required type="text" v-model="validation_code" class="full-width no-border" v-on:keyup.enter="validate()">
            <label>Validation Code</label>
          </div>
          <button class="positive" id="validate-button" @click="validate()">
            <label>Validate</label>
          </button>
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
    name: 'Validate',
    data () {
      return {
        validation_code: '',
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
      validate: function () {
        if (this.validation_code === this.user.validation_code) {
          Toast.create.positive('Account validated. You may now log in.')
          this.user.validated = true
          this.user.validation_code = ''
          app_users.update({
            id: this.user.id,
            validated: true,
            validation_code: ''
          })
        }
        else {
          Toast.create.negative('Validation code is incorrect. Please check again.')
        }
      },
      update: function (updated_info) {
        this.user = updated_info
        if (this.user.validated) {
          this.$router.push({
            name: 'Index'
          })
        }
      }
    },
    mounted () {
      if (this.$route.params.code) {
        this.validation_code = this.$route.params.code
      }
      app_users.find(this.$route.params.username).watch().subscribe(this.update)
    }
  }
</script>

<style lang="styl">
#validate-container
  max-width 900px
  min-height 100vh
  margin-left auto
  margin-right auto
  margin-bottom 0px
#validate-button
  float right
  margin-top 20px
  margin-bottom 20px
#forgot-button
  float left
  margin-top 30px
  margin-bottom 20px
input:not(.no-style), textarea:not(.no-style), .textfield:not(.no-style)
  border-bottom 2px solid #999
body
  background-color darkgrey
:root
  overflow-y scroll
</style>
