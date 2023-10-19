<template>
    <div>
        <div class="" v-for="(error, i) in errors" :key="i">
            <ul>
                <li class="text-danger">
                   {{error}}
                </li>
            </ul>

        </div>
    </div>
</template>
<script>
export default{
    name:'AlertsErros',

    props:{
        errors:{type:Array, required: true}
    }


}
</script>
