<template>
    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>

        <b-table
            class="mt-3"
            table-variant="light"
            hover
            responsive="md"
            id="my-table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
            :fields="fields"
            small
        >

            <template #cell(action)="row">
                <b-button variant="info" @click="loadDe(row.item, 'edit')" class="mr-md-2" size="sm">
                    <b-icon icon="tools"></b-icon>
                </b-button>
                <b-button variant="danger" @click="loadDe(row.item, 'remove')" class="mr-2" size="sm">
                    <b-icon icon="trash"></b-icon>
                </b-button>
            </template>
         </b-table>
    </div>
  </template>

  <script>
    export default {
        props:{
            items: {required:true}
        },
      data() {
        return {
          perPage: 10,
          currentPage: 1,
        //   items: [
        //     { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
        //     { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
        //     { id: 3, first_name: 'Barney', last_name: 'Rubble' },
        //     { id: 4, first_name: 'Betty', last_name: 'Rubble' },
        //     { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
        //     { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
        //     { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
        //     { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
        //     { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
        //   ],
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
      computed: {
        rows() {
          return this.items.length
        }
      }
    }
</script>
