<template>
    <div class="config-user">
        <b-container>
            <b-row class="d-flex justify-content-between">
                <div class="text-center">
                    <h2 class="font-weight-bold h4">
                        Catálogo de Produtos

                    </h2>
                </div>
                <div class="mt-5" >
                    <b-button variant="success" @click="createdView()">Registra novo produto</b-button>
                </div>
            </b-row>
        </b-container>

        <b-modal id="modal-1"
            :title="this.status.name"
            centered  size="lg"
            hide-footer no-close-on-backdrop
            :header-bg-variant="this.status.bgHeader != '0' ? this.status.bgHeader : ''"
            :header-text-variant="this.status.textVariant != '0' ? this.status.textVariant : ''"
        >
            <template #modal-header="{ close }">
                <!-- Emulate built in modal header close button action -->
                <h5>{{ status.name }}</h5>
                <b-button size="sm"
                    variant="outline-danger"
                    @click="reset"
                >
                    <b-icon icon="x-lg"></b-icon>
                </b-button>
            </template>
            <b-container>
                <b-form>
                    <b-row class=" d-flex justify-content-center">
                        <b-col md="8" sm="12">
                            <b-form-group label="Nome do produto*" label-for="product-name">
                                <b-form-input
                                    :class="{'border border-danger' : error['name'] }"
                                    id="product-name"
                                    type="text"
                                    v-model="product.name"
                                    placeholder="Digite o nome do Produto..."
                                    :readonly="mode === 'remove'"
                                    ></b-form-input>
                                    <div class="" v-if="error['name']">
                                        <alerts-erros
                                            :errors="error.name"
                                        />
                                    </div>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class=" d-flex justify-content-center">

                        <b-col md="8" sm="12">
                            <b-form-group label="Preço*" label-for="product-price">
                                <b-form-input
                                    :class="{'border border-danger' : error['price'] }"
                                    id="product-price"
                                    type="text"
                                    v-model="product.price"
                                    placeholder="Digite o preço do Produto..."
                                    :readonly="mode === 'remove'"

                                    ></b-form-input>
                                    <div class=""  v-if="error['price']">
                                        <alerts-erros
                                            :errors="error.price"
                                        />
                                    </div>
                            </b-form-group>
                        </b-col>

                    </b-row>
                    <b-row class=" d-flex justify-content-center">
                        <b-col md="8" sm="12">
                            <b-form-group label="Quantidade*" label-for="product-quantity">
                                <b-form-input
                                    :class="{'border border-danger' : error['quantity'] }"
                                    id="product-quantity"
                                    v-model="product.quantity"
                                    :readonly="mode === 'remove'"
                                    placeholder="Quantidade que deseja adicionar"
                                ></b-form-input>
                                <div class=""  v-if="error['quantity']">
                                    <alerts-erros
                                        v-if="error['quantity']"
                                        :errors="error.quantity"
                                    />
                                </div>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class=" d-flex justify-content-center">
                        <b-col md="8" sm="12">
                            <b-form-group label="Descrição" label-for="product-description">
                                <b-form-textarea

                                    id="product-description"
                                    v-model="product.description"
                                    :readonly="mode === 'remove'"
                                    placeholder="Descrição do Produto"
                                ></b-form-textarea>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="d-flex justify-content-between">
                        <b-button variant="success" v-if="mode === 'save'" @click="saveOrUpdate">Registra</b-button>
                        <b-button variant="primary" v-if="mode === 'edit'" @click="saveOrUpdate">Editar Produto</b-button>
                        <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
                        <b-button class="ml-5" @click="reset">Cancelar</b-button>
                    </b-row>
                </b-form>
            </b-container>
        </b-modal>
        <b-overlay :show="show" rounded="sm">
            <b-container >
                <div class="text-right">
                    <p class="font-weight-bold ml-auto">Total de produtos :{{ products.length }}</p>
                </div>
                <transition name="slide" type="animation"  >
                    <b-table
                        class="mt-3"
                        table-variant="light"
                        show
                        v-show="view"
                        hover
                        :busy="isBusy"
                        :items="products"
                        :fields="fields"
                        responsive="md"
                    >
                        <template #table-busy>
                            <div class="text-center text-danger my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong>Loading...</strong>
                            </div>
                        </template>
                        <template #cell(action)="row">
                            <b-button variant="warning" @click="loadDe(row.item, 'edit')" class="mr-md-2" size="sm">
                                <b-icon icon="tools"></b-icon>
                            </b-button>
                            <b-button variant="danger" @click="loadDe(row.item, 'remove')" class="mr-2" size="sm">
                                <b-icon icon="trash"></b-icon>
                            </b-button>
                        </template>
                    </b-table>
                </transition>
            </b-container>

        </b-overlay>

    </div>
</template>
<script>
import register from '../mixins/register.js'
import AlertsErros from './AlertsErros.vue'
export default {
    name:'ControlProduct',
    components:{AlertsErros},
    data(){
        return{
            status:{name: 'Registrando Produto', bgHeader:"success", textVariant:"light"},
            mode:'save',
            show:true,
            view:false,
            isBusy:true,
            product:{
                name: '',
                price: '',
                quantity:'',
                description: ''
            },
            error : [ ],
            products:[],
            res:'',
            fields:[
                { key: 'name', label: 'Nome', sortable:true},
                { key: 'price', label: 'Preço',sortable:true},
                { key: 'quantity', label: 'Quant.',sortable:true},
                { key: 'created_at',
                    label: 'Criado em',
                    formatter: value =>{
                        let getdata = new Date(value)
                        let setday = (getdata.getDate()) < 10 ? "0"+(getdata.getDate()) : (getdata.getDate())
                        let setMonth = ((getdata.getMonth() + 1))< 10 ? "0"+((getdata.getMonth() + 1)) : ((getdata.getMonth() + 1))
                        let data = ( setday + "/" + setMonth + "/" + getdata.getFullYear() )
                        return data
                    },

                    sortable:true,
                },
                { key: 'action', label: 'Ações'}
            ]
        }
    },
    mixins:[register]
}
</script>
<style>
@keyframes slide-in{
    from{transform: translateY(40px)}
    to{transform: translateY(0)}
}
.slide-enter-active{
    animation: slide-in 2s ease;
}
</style>
