import Vue from 'vue';
import Router from 'vue-router';
import MainApp from '@/components/MainApp';
import Form from '@/components/FormApp';
import LoginApp from '@/components/LoginApp';
import ThankYou from '@/components/ThankYou';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainApp,
      meta: {
        requiresAuth: true
       }
    },
    {
      path: '/ad/:id',
      name: 'ad',
      component: MainApp,
      meta: {
        requiresAuth: true
       }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginApp,
    },
    {
      path: '/auth',
      name: 'form',
      component: Form,
    },
    {
      path: '/thankyou',
      name: 'thankyou',
      component: ThankYou,
    },
  ],
});
//
