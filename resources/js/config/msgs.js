import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'custom-class',
    duration: 5000
})

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops.. Erro inesperado !' : payload.msg,
    {
        type: 'error',
        icon: {name:'fa fa-exclamation-triangle fa-2x', after:false},
        className:"font-weight-bold p-3 border border-dark shadow rounded",
        duration : 10000,
    }
)
Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso !' : payload.msg,
    {
        type: 'success',
        icon: {  name:"fa fa-check", after:true },
        className:"font-weight-bold p-3 border border-dark shadow rounded",
        duration : 20000,
    }
)
Vue.toasted.register(
    'defaultInfo',
    payload => !payload.msg ? 'Oops.. está faltando alguma coisa, verifique !' : payload.msg,
    {
        type: 'info',
        icon: {name:'fa fa-asterisk', after:false},
        className:"font-weight-bold p-3 border border-dark shadow rounded",
        duration : 30000,
    }
)
