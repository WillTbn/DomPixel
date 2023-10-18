import './bootstrap';
import './config/bootstrap-vue.js';
import Vue from 'vue';
import App from './template/App.vue';
import router from './config/router';

new Vue({
    router,
    render: h=> h(App),
}).$mount('#app')
