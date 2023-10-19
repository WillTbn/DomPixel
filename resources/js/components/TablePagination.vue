<template>
    <div class="overflow-auto">

        <b-table
            class="mt-3"
            table-variant="light"
            show
            hover
            :items="products"
            :fields="fields"
            responsive="md"
            id="my-table"
            small
        >
            <template #table-busy>
                <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
                </div>
            </template>
            <template #cell(action)="row">
                <b-button variant="warning" @click="sentProct(row.item, 'edit')" class="mr-md-2" size="sm">
                    <b-icon icon="tools"></b-icon>
                </b-button>
                <b-button variant="danger" @click="sentProct(row.item, 'remove')" class="mr-2" size="sm">
                    <b-icon icon="trash"></b-icon>
                </b-button>
            </template>
        </b-table>
    </div>
  </template>

<script>

export default {
    props:{
        products:{ required: true}
    },
    data() {
        return {
            fields:[
                // { key: 'id', label: 'Ident.', sortable:true},
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
    methods: {
        sentProct(){
            this.$emit('toReceive', {row, mode})
        }
    },
}
</script>
