import Vue from 'vue';
import App from './App';
import router from './router';
import {DatePicker, Carousel, CarouselItem, Dialog, Dropdown, DropdownMenu, DropdownItem} from 'element-ui'
import iView from 'iview';
import axios from 'axios';
import VueAxios from 'vue-axios';
import infiniteScroll from 'vue-infinite-scroll'

// import ES6 style
import {VueMasonryPlugin} from 'vue-masonry';


import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'

import bugsnag from 'bugsnag-js'
const bugsnagClient = bugsnag('413da0cc0b1b4379e72bfe2ca21eaa32')

import bugsnagVue from 'bugsnag-vue'

bugsnagClient.use(bugsnagVue(Vue))

//loading the Vuex store 
//import {store} from './store/store.js'

//importing locale for ElementUi
locale.use(lang)
//import ElementUi components
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(DropdownMenu.name, DropdownMenu);

Vue.component(DatePicker.name, DatePicker);
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);


Vue.component(Dialog.name, Dialog);

import 'iview/dist/styles/iview.css';

//import the css
import 'element-ui/lib/theme-chalk/index.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';

import Multiselect from 'vue-multiselect';

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(VueAxios, axios);
Vue.use(infiniteScroll);
Vue.use(VueMasonryPlugin)


Vue.axios.defaults.baseURL = 'https://affserver-223918.appspot.com/';
//Vue.axios.defaults.baseURL = 'http://localhost:8080/';

Vue.component('multiselect', Multiselect);

//router authentication
router.beforeEach((to, from, next) => {

  let currentToken = localStorage.getItem("id_token");

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentToken) {
    next('/login');
   } else if (requiresAuth && currentToken) {
    next();
   } else {
    next();
   }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
