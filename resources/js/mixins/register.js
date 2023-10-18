// const zxcvbn = require('zxcvbn')
import zxcvbn from 'zxcvbn'
import axios from 'axios'
export default {
    computed:{
        passwordStrength(){
            let stats = this.mode == 'save' ? zxcvbn(this.userGet.password) : zxcvbn('')
            return stats
        },
        strength(){
            this.passwordStrength.score == 0 ? this.strengthPassword = '' : this.strengthPassword = ''
            if(this.passwordStrength.score == 0){
                return this.strengthPassword = ''
            }
            if(this.passwordStrength.score == 1){
                return this.strengthPassword = 'Senha não aceitavél'
            }
            if(this.passwordStrength.score == 2){
                return this.strengthPassword = 'Senha não aceitavél, quase lá'
            }
            if(this.passwordStrength.score == 3){
                return this.strengthPassword = 'Senha aceitavél, mas você pode melhora'
            }
            if(this.passwordStrength.score == 4){
                return this.strengthPassword = 'Senha ótima !'
            }
        }
    },
    methods:{
        passwordConfirm(pass, passconfirm){
            return pass === passconfirm ? true : false
        },
        overlay(){
            this.show = true
            let self = this
            setTimeout(function(){
                self.show = false
            }, 2000)
        },
        validateRegister(){
            this.show = true
            var error = 0;
            //erro de email
            if(this.regex.test(this.userGet.email)){
                this.error.email = ""
            }else if(this.userGet.email === undefined){
                showError("Preencha o campo email")
                this.error.email = "Preencha o campo de email"
                error++
            }else{
                this.error.email = "E-mail invalido"
                error++
            }

            //erro de password length
            if(this.userGet.password == ''){
                this.error.password = "Campo vazio, preencha-o"
                error++
            }else if(this.userGet.password.length < 6){
                this.error.password = "Senha tem que conter mais de 6 digitos"
                error++
            }else if(this.userGet.password === undefined){
                showError("Preencha o campo o campo de senha")
                this.error.password = "Preencha o campo de senha"
                error++
            }else{
                this.error.password = ""
            }
            //erro de confirmação de password
            if(this.userGet.password_confirm === undefined){
                this.error.password_confirm = "Preencha o campo de senha corretamente"
                error++
            }else{
                this.error.password_confirm = ""
            }
            if(this.passwordConfirm(this.userGet.password, this.userGet.password_confirm)){
                this.error.password_confirm = ""
            }else{
                showError("Senhas não conferir")
                this.error.password_confirm = "Senha não conferir"
                error++
            }
            //erro de birthdate
            if(this.userGet.birthdate){
                this.error.birthdate = ""
            }else if(this.userGet.birthdate === undefined){
                showError("Preencha o campo data de nascimento")
                this.error.birthdate = "Campo obrigatorio vazio"
                error++
            }else{
                this.error.birthdate = "Data de nascimento invalida"
                error++
            }
            //erro de name
            if(this.userGet.name.length < 6){
                this.error.name = "Campo tem que conter nome e sobrenome"
            }else if(this.userGet.name === undefined){
                showError("Preencha o campo data de nascimento")
                this.error.name = "Campo obrigatorio vazio"
                error++
            }else{
                this.error.name = ""
            }
            if(this.userGet.terms == ""){
                showError("O campo termos deve ser preenchido")
                this.error.terms = "Leia os termos e clique em aceitar para acessar nossa plataforma"
                error++
            }else{
                this.error.terms = ""
            }
            this.show = false
            return (error === 0)
        },
        loadUsers(){
            const url = `${baseApiUrl}/admin/users`
            const auth = JSON.parse(localStorage.getItem(userKey))
            axios.defaults.headers.common['Authorization'] = `bearer ${auth.token}`
            axios.get(url).then(res =>{
                this.usersAdm = res.data.users
            })
            this.view = true

        },
        loadDe(userGet, mode = 'save'){
            this.mode = mode
            let getdata = new Date(userGet.birthdate)
            let setday = (getdata.getDate()) < 10 ? "0"+(getdata.getDate()  + 1) : (getdata.getDate()  + 1)
            let setMonth = ((getdata.getMonth() + 1))< 10 ? "0"+((getdata.getMonth() + 1)) : ((getdata.getMonth() + 1))
            let data = ( setday + "/" + setMonth + "/" + getdata.getFullYear() )

            this.userGet = {
                id:userGet.id,
                name: userGet.name,
                email: userGet.email,
                password:'',
                password_confirm:'',
                birthdate: data,
                type:userGet.type,
                terms: userGet.terms
            }
        },
        reset(){
            this.mode =  'save'
            this.userGet = {
                name: '',
                email: '',
                password:'',
                password_confirm:'',
                birthdate: '',
                type:'admin',
                terms: 'accept'
            },
            this.error = {name:'', email:'', password: '', password_confirm: '', birthdate: ''},
            this.loadUsers()
        },
        save(){
            if(this.validateRegister()){
                this.show = true
                const method = this.userGet.id ? 'put' : 'post'
                const id = this.userGet.id ? `/${this.userGet.id}` : ''
                //return console.log(id)

                axios[method](`${baseApiUrl}/auth/register${id}`, this.userGet)
                .then(json => {
                    this.show = true
                    if(json.data.success){
                        /*  Metodo para mensagem personalizada de sucesso*/
                        this.$toasted.success(json.data.admin, {
                            theme: "toasted-primary",
                            position: "top-right",
                            duration : 5000,
                            icon:'check_circle'
                        })
                        this.showTop = true
                        this.reset()
                        this.res = json.data.admin
                    }else{
                        showError(json.data.error)
                    }
                    this.show = false
                }).catch(showError)
            }
        },
        remove(){
            console.log(this.userGet)
            this.show = true
            var result = confirm(`ATENÇÃO!!! Tem certeza que deseja deleta ${this.userGet.name}?`)
            if(result){
                const id = this.userGet.id
                axios.delete(`${baseApiUrl}/admin/userdel/${id}`)
                .then(json=>{
                    this.show = true
                    if(json.data.success){
                        /*  Metodo para mensagem personalizada de sucesso*/
                        this.$toasted.success(json.data.success, {
                            theme: "toasted-primary",
                            position: "top-right",
                            duration : 5000,
                            icon:'check_circle'
                        })
                        this.reset()
                        this.show = false
                    }else{
                        showError(json.data.error)
                        this.show = false
                    }
                }).catch(showError)
            }else{
                this.show = false
            }
        }
    },
    mounted(){
        this.loadUsers()
    }
}
