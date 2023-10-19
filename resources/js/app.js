import './bootstrap';
import './config/bootstrap-vue.js';
import './config/msgs';
import Vue from 'vue';
import App from './template/App.vue';
import router from './config/router';
import VueMask from 'v-mask';


const DEFAULT_TITLE = 'Dom Pixel '
router.beforeEach((to, from, next) => {
    console.log(to.name, from.name)
    document.title = to.name != undefined ? `${DEFAULT_TITLE} -  ${to.name}` : DEFAULT_TITLE
    next()
})

Vue.use(VueMask)
new Vue({
    router,
    render: h=> h(App),
}).$mount('#app')
