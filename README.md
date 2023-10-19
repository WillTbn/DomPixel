# Teste FullStack 

-> Back-end

* MVC
* Docker
* Laravel10x

->front-end

* Vue.js 2
* Bootstrap Vue
* Vite

## Referência

 - [Laravel](https://laravel.com/docs/10.x)
 - [Vue.js](https://br.vuejs.org/v2/guide/installation.html)
 - [bootstrap-vue](https://bootstrap-vue.org/)
 - [vite](https://v3.vitejs.dev/)

## Instalação

Antes de começamos vamos intender oque vamos fazer e quais possiveis caminhos, aqui eu optei por fazer o projeto com docker, logo pre-requisito é te o mesmo já rodando em sua maquina. 

Se preferi pode roda na sua maquina local, mas vai precisa de no minimo php8 para roda com o laravel, junto com vue cliente para vue.js 2, aqui um [link](https://br.vuejs.org/v2/guide/installation.html), verá na pagina oficial do vuejs, se roda o vue.js2 não tera problema alguma em colocar o vite3 como dependencia, ja configurado aqui.

Meu guia é para docker com docker:

1. Crie o containeres do laravel,ele ira cria o projeto laravel e o banco mysql, configuração esta no docker-compose.
Voce pode verificar o .env e edita-lo como acha necessario.

```
docker composer up -d
```

2. Eu indico roda proximo comando dentro da imagem docker, assim evitando possiveis conflitos locais e não avento necessidade de instalação de mais nada para roda o projeto.

```
composer install
```

3. Ainda dentro do container rode o comando para roda as migrations junto das seed's, assim já terá um banco de dados com dados facticicios, usei o Factory.

```
php artisan make:migrate --seed
```

4. Vamos roda agora o necessario para front-end:

```
npm run install
```

5. Agora só falta roda serve do front, já esta tudo configurado para fazer os apontamentos no vite.config.js:

```
npm run serve
```

Se tudo deu certo deve esta vendo algo como abaixo no seu terminal:

  ➜  Local:   http://localhost:5173/

  ➜  Network: http://172.18.0.7:5173/

  ➜  press h to show help

  LARAVEL v10.28.0  plugin v0.8.1

  ➜  APP_URL: http://localhost
## Dificuldades
