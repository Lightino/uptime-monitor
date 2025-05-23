import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'

export const routes = [
    { paths: '/', component: Dashboard, name: 'dashboard'},
    { path: '/login', component: Login, name: 'login'},
  ];