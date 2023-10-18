<template>
    <div class="config-user">
        <b-alert
            v-model="showTop"
            class="position-fixed fixed-bottom m-0 rounded-0 text-center"
            style="z-index: 2000;"
            variant="warning"
            dismissible
        >
            {{res}}
        </b-alert>
        <b-overlay :show="show" rounded="sm">
        <b-container>
            <b-form>
                <!--<input id="user-id" type="hidden" v-model="userGet.id"/>
                <input id="user-type" type="hidden" v-model="userGet.type"/>
                <input id="user-terms" type="hidden" v-model="userGet.terms"/>-->
                <b-row>
                    <b-col md="6" sm="12">
                        <b-form-group label="Nome Completo" label-for="user-name">
                            <b-form-input
                                :class="{'border border-danger' : error.name != 0 }"
                                id="user-name"
                                type="text"
                                v-model="userGet.name" placeholder="Digite o nome do Usuário..."
                                :readonly="mode === 'remove'"
                                ></b-form-input>
                                <span class="text-danger">
                                    {{error.name}}
                                </span>
                        </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                        <b-form-group label="Email valido" label-for="user-email">
                            <b-form-input
                                :class="{'border border-danger' : error.email != 0 }"
                                id="user-email"
                                type="email"
                                v-model="userGet.email" placeholder="Digite o e-mail do Usuário..."
                                :readonly="mode === 'remove'"
                                ></b-form-input>
                                <span class="text-danger">
                                    {{error.email}}
                                </span>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="4" sm="12">
                        <b-form-group label="Data de Nascimento" label-for="user-birthdate">
                            <b-form-input
                                :class="{'border border-danger' : error.birthdate != 0 }"
                                id="user-birthdate"
                                v-model="userGet.birthdate"
                                :readonly="mode === 'remove'"
                                placeholder="00/00/0000"
                                v-mask="'##/##/####'"
                            ></b-form-input>
                            <span class="text-danger">
                                {{error.birthdate}}
                            </span>
                        </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12" v-show="mode === 'save' || mode === 'edit'">
                        <b-form-group label="Senha" label-for="user-password">
                            <b-form-input
                                :class="{'border border-danger' : error.password != 0 }"
                                id="user-password"
                                type="password"
                                v-model="userGet.password" placeholder="*********"
                                :readonly="mode === 'remove'"
                            ></b-form-input>
                            <span class="text-danger">
                                {{error.password}}
                            </span>
                            <div>
                                <p v-if="passwordStrength.score == 0">
                                    Nível de senha
                                </p>
                                <p v-if="passwordStrength.score == 1">
                                    Senha não aceitavél
                                </p>
                                <p v-if="passwordStrength.score == 2">
                                    Senha não aceitavél, quase lá
                                </p>
                                <p v-if="passwordStrength.score == 3">
                                    Senha aceitavél, mas você pode melhora
                                </p>
                                <p v-if="passwordStrength.score == 4">
                                    Senha ótima !
                                </p>
                                <div class="d-flex flex-row bd-highlight my-1" >

                                    <span class="progress_password mr-2 rounded-pill bd-highlight" v-bind:class="{
                                    'bg-danger' : passwordStrength.score <= 1,
                                    'bg-warning' : passwordStrength.score == 2,
                                    'bg-info' : passwordStrength.score == 3,
                                    'bg-success' : passwordStrength.score == 4
                                    }"></span>
                                    <span class="progress_password mr-2 rounded-pill  bd-highlight" v-bind:class="{
                                    'bg-secondary' : passwordStrength.score <= 1,
                                    'bg-warning' : passwordStrength.score == 2,
                                    'bg-info' : passwordStrength.score == 3,
                                    'bg-success' : passwordStrength.score == 4
                                    }"></span>
                                    <span class="progress_password mr-2 rounded-pill bd-highlight" v-bind:class="{
                                    'bg-secondary' : passwordStrength.score <= 2,
                                    'bg-info' : passwordStrength.score == 3,
                                    'bg-success' : passwordStrength.score == 4
                                    }"></span>
                                    <span class="progress_password rounded-pill bd-highlight" v-bind:class="{
                                    'bg-secondary' : passwordStrength.score <= 3,
                                    'bg-success' : passwordStrength.score == 4
                                    }"></span>
                                </div>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col md="4" sm="12" v-show="mode === 'save' || mode === 'edit'">
                        <b-form-group label="Confirma Senha" label-for="user-password_confirm">
                            <b-form-input
                                id="user-password_confirm"
                                type="password"
                                v-model="userGet.password_confirm"
                                placeholder="*********"
                            ></b-form-input>
                            <span class="text-danger">
                                {{error.password_confirm}}
                            </span>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-button variant="success" v-if="mode === 'save'" @click="save">Registra</b-button>
                <b-button variant="primary" v-if="mode === 'edit'" @click="save">Editar Usuário</b-button>
                <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
                <b-button class="ml-2" @click="reset">Cancelar</b-button>
            </b-form>
        </b-container>
        </b-overlay>
        <transition name="slide" type="animation">
            <b-table class="mt-3" show v-show="view" hover striped :items="usersAdm" :fields="fields">
                <template #cell(action)="row">
                    <b-button variant="warning" @click="loadDe(row.item, 'edit')" class="mr-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button variant="danger" @click="loadDe(row.item, 'remove')" class="mr-2">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
        </transition>
    </div>
</template>
<script>
import register from '../mixins/register.js'
export default {
    name:'ConfigUser',
    data(){
        return{
            mode:'save',
            show:false,
            view:false,
            userGet:{
                name: '',
                email: '',
                password:'',
                password_confirm:'',
                birthdate: '',
                type:'admin',
                terms: 'accept'
            },
            strengthPassword:'',
            error : {name:"", email:"", password: "", password_confirm: "", birthdate: ""},
            usersAdm:[],
            showTop:false,
            res:'',
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            fields:[
                { key: 'id', label: 'Ident.', sortable:true},
                { key: 'name', label: 'Nome', sortable:true},
                { key: 'birthdate', label: 'Dt. Nascimento',
                    formatter: value =>{
                        let getdata = new Date(value)
                        let setday = (getdata.getDate() + 1) < 10 ? "0"+(getdata.getDate()+1) : (getdata.getDate()+1)
                        let setMonth = ((getdata.getMonth() + 1))< 10 ? "0"+((getdata.getMonth() + 1)) : ((getdata.getMonth() + 1))
                        let data = (setday+ "/" + setMonth + "/" + getdata.getFullYear() )
                        return data
                    },
                     sortable:true},
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
