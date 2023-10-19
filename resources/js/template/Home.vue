<template>
    <div>
       <b-container class="text-center">
            <b-row class="justify-content-center">
                <b-col cols="8">
                   <p> Projeto de teste para vaga de FullStack </p>
                   <p> na empresa Dom Pixel </p>
                   <a href="https://github.com/WillTbn/DomPixel">
                        <b-avatar class="mx-3"  src='https://jorgenunes.vercel.app/assets/img/icones/038-github.svg' alt="github do projeto">
                        </b-avatar>
                   </a>
                </b-col>
            </b-row>
            <b-row class="justify-content-between my-5 py-5">
                <b-col cols="12" class="text-left my-3">
                    <p class="h6">
                        Front-end
                    </p>
                   <stacks-list
                    :staks="front"
                    ></stacks-list>
                </b-col>
                <b-col cols="12" class="text-left my-3">
                    <p class="h6">
                        Black-end
                    </p>
                    <stacks-list
                    :staks="back"
                    ></stacks-list>
                </b-col>

                <b-col md="4" sm="8" class="text-center my-5 py-5">
                    <router-link :to="{name:'Catátogo de Produtos'}" active-class="active" exact class="nav-link btn btn-info">Comece aqui</router-link>
                </b-col>
            </b-row>
       </b-container>

    </div>
</template>
<script>
import StacksList from '../components/StacksList.vue';
export default {
    name:'Home',
    components:{StacksList},
    data(){
        return{
            front:[
                {name:'Vue.js 2 ', icon:'https://jorgenunes.vercel.app/assets/img/icones/icons8-vuejs-240.png', version:"2"},
                {name:'Vite.js 3', icon:'https://vitejs.dev/logo-with-shadow.png', version:"3"},
                {name:'Boostrap vue  ', icon:'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/bootstrap/bootstrap.png', version:"2" }
            ],
            back:[
                {name:'Laravel' , icon:'https://jorgenunes.vercel.app/assets/img/icones/laravel.png', version:'10'},
                {name:'Php', icon:'https://jorgenunes.vercel.app/assets/img/icones/php.png', version:'8'},
                {name:'Mysql', icon:'https://jorgenunes.vercel.app/assets/img/icones/icons8-mysql-240.png' },
                {name:'Doker', icon:'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png'}
            ]
        }
    }
}
</script>
