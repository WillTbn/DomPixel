import Vue from 'vue';
import VueRouter from 'vue-router';

import Products from '../template/Products.vue';
import Home from '../template/Home.vue'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name:'sobre',
        component: Home
    },
    {
        path: '/Products',
        name:'Catátogo de Produtos',
        component: Products
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
