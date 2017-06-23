<template>
  <div class="card bg-white" id="view-container">
    <div class="card-content">
      <button class="primary" @click="back()">
        Return
      </button>
      <br />
      <br />
      <canvas id="text-canvas">
      </canvas>
      <button v-back-to-top.animate="{offset: 0, duration: 200}" class="primary circular fixed-bottom-right animate-pop" style="margin: 0 15px 15px 0">
        <i>keyboard_arrow_up</i>
      </button>
    </div>
  </div>
</template>

<script>
  import Horizon from '@horizon/client'

  const horizon = Horizon({host: 'localhost:8181'})
  const app_users = horizon('app_users')

  export default {
    name: 'View',
    data () {
      return {
        user: {
          id: '',
          login_data: {
            username: '',
            password: ''
          },
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
      back () {
        window.close()
      },
      refresh () {
        var num_modules = 0
        var num_semesters = 0
        for (var i = 0; i < this.user.modules.length; i++) {
          num_semesters = num_semesters + 1
          for (var j = 0; j < this.user.modules[i].length; j++) {
            num_modules = num_modules + 1
          }
        }
        var modules_image = document.getElementById('text-canvas')
        var modules_context = modules_image.getContext('2d')
        modules_image.width = 800
        modules_image.height = num_modules * 40 + num_semesters * 120 + 140
        modules_context.fillStyle = '#FFFFFF'
        modules_context.fillRect(0, 0, 900, num_modules * 40 + num_semesters * 120 + 140)
        modules_context.fillStyle = '#FFA500'
        modules_context.fillRect(0, 0, 800, 100)
        modules_context.fillStyle = '#000000'
        modules_context.font = 'bold 50px Roboto'
        modules_context.fillText('Module Plan by Semester', 10, 60)
        modules_context.font = 'bold 30px Roboto'
        modules_context.fillText('Total Credits: ' + this.total_credits.credits_done + ' (' + (this.total_credits.credits_done + this.total_credits.credits_planned) + ')', 10, 130)
        var row = 170
        for (i = 0; i < this.user.modules.length; i++) {
          var total_credits = 0
          for (j = 0; j < this.user.modules[i].length; j++) {
            total_credits = total_credits + this.user.modules[i][j].credits
          }
          modules_context.fillStyle = '#1E90FF'
          modules_context.fillRect(0, row - 30, 800, 40)
          modules_context.fillStyle = '#000000'
          modules_context.font = 'bold 30px Roboto'
          modules_context.fillText('Semester ' + (i + 1), 10, row)
          modules_context.fillText(total_credits, 410, row)
          row = row + 80
          for (j = 0; j < this.user.modules[i].length; j++) {
            modules_context.font = 'normal 30px \'Roboto Condensed\''
            modules_context.fillText(this.user.modules[i][j].code, 10, row)
            modules_context.fillText(this.user.modules[i][j].credits, 410, row)
            if (this.user.modules[i][j].final_grade === 'Planned' || this.user.modules[i][j].final_grade === '') {
              modules_context.fillText(this.user.modules[i][j].final_grade, 610, row)
            }
            else {
              modules_context.fillText('Completed', 610, row)
            }
            row = row + 40
          }
          row = row + 40
        }
      },
      update (updated_info) {
        this.user = updated_info
        var num_modules = 0
        var num_semesters = 0
        for (var i = 0; i < this.user.modules.length; i++) {
          num_semesters = num_semesters + 1
          for (var j = 0; j < this.user.modules[i].length; j++) {
            num_modules = num_modules + 1
          }
        }
        var modules_image = document.getElementById('text-canvas')
        var modules_context = modules_image.getContext('2d')
        modules_image.width = 800
        modules_image.height = num_modules * 40 + num_semesters * 120 + 140
        modules_context.fillStyle = '#FFFFFF'
        modules_context.fillRect(0, 0, 900, num_modules * 40 + num_semesters * 120 + 140)
        modules_context.fillStyle = '#FFA500'
        modules_context.fillRect(0, 0, 800, 100)
        modules_context.fillStyle = '#000000'
        modules_context.font = 'bold 50px Roboto'
        modules_context.fillText('Module Plan by Semester', 10, 60)
        modules_context.font = 'bold 30px Roboto'
        modules_context.fillText('Total Credits: ' + this.total_credits.credits_done + ' (' + (this.total_credits.credits_done + this.total_credits.credits_planned) + ')', 10, 130)
        var row = 170
        for (i = 0; i < this.user.modules.length; i++) {
          var total_credits = 0
          for (j = 0; j < this.user.modules[i].length; j++) {
            total_credits = total_credits + this.user.modules[i][j].credits
          }
          modules_context.fillStyle = '#1E90FF'
          modules_context.fillRect(0, row - 30, 800, 40)
          modules_context.fillStyle = '#000000'
          modules_context.font = 'bold 30px Roboto'
          modules_context.fillText('Semester ' + (i + 1), 10, row)
          modules_context.fillText(total_credits, 410, row)
          row = row + 80
          for (j = 0; j < this.user.modules[i].length; j++) {
            modules_context.font = 'normal 30px \'Roboto Condensed\''
            modules_context.fillText(this.user.modules[i][j].code, 10, row)
            modules_context.fillText(this.user.modules[i][j].credits, 410, row)
            if (this.user.modules[i][j].final_grade === 'Planned' || this.user.modules[i][j].final_grade === '') {
              modules_context.fillText(this.user.modules[i][j].final_grade, 610, row)
            }
            else {
              modules_context.fillText('Completed', 610, row)
            }
            row = row + 40
          }
          row = row + 40
        }
        setTimeout(this.refresh, 100)
      }
    },
    computed: {
      total_credits: function () {
        var result = {
          credits_done: 0,
          credits_planned: 0
        }
        for (var i = 0; i < this.user.modules.length; i++) {
          for (var j = 0; j < this.user.modules[i].length; j++) {
            if (this.user.modules[i][j].grade !== 'Planned') {
              result.credits_done = result.credits_done + this.user.modules[i][j].credits
            }
            else {
              result.credits_planned = result.credits_planned + this.user.modules[i][j].credits
            }
          }
        }
        return result
      }
    },
    mounted () {
      app_users.find(this.$route.path.substring(6)).watch().subscribe(this.update)
    },
    beforeRouteEnter (to, from, next) {
      app_users.find(to.path.substring(6)).fetch().subscribe(result => {
        if (result && result.shared_with_others.indexOf(sessionStorage['username']) !== -1) {
          next()
        }
        else {
          window.close()
        }
      })
    }
  }
</script>

<style lang="styl">
#view-container
  max-width 900px
  min-height 100vh
  margin-left auto
  margin-right auto
  margin-bottom 0px
#text-canvas
  display block
  margin auto
body
  background-color darkgrey
:root
  overflow-y scroll
</style>
