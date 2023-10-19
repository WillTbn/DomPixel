import Vue from 'vue'


export function showError(e){
    if(e && e.request && e.request.response ){
        const setJson = e.response.data
        Vue.toasted.global.defaultError({msg :  setJson.message})
    }else if(typeof e === 'string'){

        Vue.toasted.global.defaultError({msg: e})
    }else{
        Vue.toasted.global.defaultError()
    }
}
export function showSuccess(e){
    if(e && e.data && e.data.success ){
        Vue.toasted.global.defaultSuccess({msg :  e.data.success})
    }else if(typeof e === 'string'){
        Vue.toasted.global.defaultSuccess({msg: e})
    }else{
        Vue.toasted.global.defaultSuccess()
    }
}
export function showInfo(e){
    if(e && e.data && e.data.success ){
        Vue.toasted.global.defaultInfo({msg :  e.data.success})
    }else if(typeof e === 'string'){
        Vue.toasted.global.defaultInfo({msg: e})
    }else{
        Vue.toasted.global.defaultInfo()
    }
}
export default {showError, showSuccess,showInfo}
