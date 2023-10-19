import axios from 'axios'
import {showError, showSuccess, showInfo} from '@/config/global'
export default {
    methods:{
        loadProducts(){
            axios.get('/products')
                .then(response => {
                    console.log(response.data)
                    this.products = response.data.products
                })
                .catch(error => {
                    this.error = error
                })
            .finally(this.view = true, this.show=false, this.isBusy = false)
            console.log(this.products)
        },
        saveOrUpdate(){
            this.show = true
            const method = this.product.id ? 'put' : 'post'
            const id = this.product.id ? `/${this.product.id}` : ''
            //return console.log(id)

            axios[method](`product/register${id}`, this.product)
            .then(response => {
                this.show = true
                showSuccess(response.data.success)
                this.showTop = true
                this.reset()
                }).catch(e => {
                    console.log(e)
                    showError(e)
                    this.setErrors( JSON.parse(e.request.response))
                    // this.setErrors(e.response.data.errros)

                })
            .finally(this.show = false)

        },

        remove(){
            var result = confirm(`ATENÇÃO!!! Tem certeza que deseja deleta ${this.product.name}?`)
            this.show = true

            if(result){
                axios.delete(`/product/${this.product.id}`, this.product)
                .then(response => {
                    showSuccess(response.data.success)
                    this.reset()
                })
                .catch(e => {
                    showError(e)
                })
                .finally(this.show = false)
            }else{
                this.show = false
            }
        },
        createdView(){
            this.mode = 'save'
            this.$bvModal.show('modal-1')
        },
        loadDe(product, mode = 'save'){
            const jsonStatus = {
                edit:{name:'Editando Produto', bgHeader:"info", textVariant:"dark"},
                remove:{name:'Excluindo Produto',  bgHeader:"danger", textVariant:"light"},
                create:{name: 'Registrando Produto', bgHeader:"success", textVariant:"dark", btnIcon:"outline-light"}
            }
            this.status = mode == 'edit' ? jsonStatus.edit : jsonStatus.remove;


            this.$bvModal.show('modal-1')
            this.mode = mode
            this.product = {
                id:product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                description: product.description,
            }
        },
        setErrors(e){
            this.error ={ ...e.errors}
        },
        overlay(){
            this.show = true

            let self = this
            setTimeout(function(){
                self.show = false
            }, 2000)
        },
        reset(){
            this.status ={name: 'Registrando Produto', bgHeader:"success", textVariant:"light"}
            this.mode =  'save'
            this.product = {
                name: '',
                price: '',
                quantity:'',
                description:'',
            },
            this.error = {name:'', price:'', quantity: '', description: ''},
            this.$bvModal.hide('modal-1')
            this.loadProducts()
        },
    },
    mounted(){
        this.loadProducts()
    }
}
