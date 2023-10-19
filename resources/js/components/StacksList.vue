<template>
    <div class="staks-list">
        <b-row class="" style="display:inline-table" v-for="(stak, i) in staks" :key="i" v.b-tooltip.hover :title="stak.name">
            <b-avatar class="mx-3"  :src="stak.icon" :alt="stak.name">
                <template v-if="stak.version != 0" #badge>{{stak.version}}</template>
            </b-avatar>
        </b-row>
    </div>
</template>
<script>
export default{
    props:{
        staks: {type:Array, required:true}
    }
}
</script>
<style>
.icon-control{
    width: 15%;
    aspect-ratio: 5/3;
    object-fit: contain;
}
</style>
