import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../template/Home.vue';
import Documentation from '../template/Documentation.vue'

Vue.use(VueRouter)
const routes = [
    {path: '/', name:'Home', component: Home},
    {path: '/Documentation', name:'Catálogo de Produtos', component: Documentation}
];

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
