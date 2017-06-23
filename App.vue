<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
  	<!--<div id="logo">
  		<img src="statics/logo.png" id="logo-image"/>
  		<span id="logo-text">Moduler</span>
  	</div>-->
    <router-view></router-view>
  </div>
</template>

<script>
/*
 * Root component
 */
export default {}
</script>

<style lang="styl">
/*#logo
  max-width 900px
  margin-left auto
  margin-right auto
  margin-bottom 0px
  background #696969
#logo-image
  height 100px
  width 100px
  margin-left 10px
  margin-top 10px
#logo-text
	font-size 55px
	font-weight bold
	margin-left 10px
	color white*/
</style>
