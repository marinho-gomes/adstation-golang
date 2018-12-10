<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      navMenuIndex: '1'
    }
  }
};
</script>

<style>
@font-face {
	 font-family:'Nunito Sans';
	 font-style:normal;
	 font-weight:300;
	 src:local('Nunito Sans Light'),local('NunitoSans-Light'),url(https://fonts.gstatic.com/s/nunitosans/v3/pe03MImSLYBIv1o4X1M8cc8WAc5tU1Q.ttf) format('truetype')
	}
	@font-face {
	 font-family:'Nunito Sans';
	 font-style:normal;
	 font-weight:400;
	 src:local('Nunito Sans Regular'),local('NunitoSans-Regular'),url(https://fonts.gstatic.com/s/nunitosans/v3/pe0qMImSLYBIv1o4X1M8cce9I94.ttf) format('truetype')
	}
	@font-face {
	 font-family:'Nunito Sans';
	 font-style:normal;
	 font-weight:600;
	 src:local('Nunito Sans SemiBold'),local('NunitoSans-SemiBold'),url(https://fonts.gstatic.com/s/nunitosans/v3/pe03MImSLYBIv1o4X1M8cc9iB85tU1Q.ttf) format('truetype')
	}
	@font-face {
	 font-family:'Nunito Sans';
	 font-style:normal;
	 font-weight:700;
	 src:local('Nunito Sans Bold'),local('NunitoSans-Bold'),url(https://fonts.gstatic.com/s/nunitosans/v3/pe03MImSLYBIv1o4X1M8cc8GBs5tU1Q.ttf) format('truetype')
	}
	@font-face {
	 font-family:'Nunito Sans';
	 font-style:normal;
	 font-weight:800;
	 src:local('Nunito Sans ExtraBold'),local('NunitoSans-ExtraBold'),url(https://fonts.gstatic.com/s/nunitosans/v3/pe03MImSLYBIv1o4X1M8cc8aBc5tU1Q.ttf) format('truetype')
	}
	@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,900');
body{
  margin: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  height: 100%;
}
.el-header{
  background: #0001e4;
  color: white;
  height: 60px;
}
</style>
