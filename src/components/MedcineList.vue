
<template>
  <div>
    <div class="center">
      <span class="p-input-icon-right">
        <i class="pi pi-search"/>
        <InputText v-on:keyup.enter="getMedicineList" type="text" class="p-inputtext-lg" v-model="search_value" placeholder="Search" />
      </span>
    </div>

    <DataTable :value="MedicineList">
      <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
    </DataTable>
  </div>
</template>


<script>
import { ref } from 'vue';

export default {
  name: 'MedicineList',
  setup() {
    const SERVER_BASE = 'https://api.mocki.io/v1';
    const MedicineList = ref([]);
    const search_value = ref("");
    let columns = [
      {field: "sl", header: "SN"},
      {field: "brand_name", header: "Brand"},
      {field: "generic_name", header: "Generic Name"},
      {field: "strength", header: "Strength"},
      {field: "price", header: "Price"},
      {field: "manufacturer", header: "Manufacturer"},
      {field: "dosages", header: "Dosages"},
      {field: "dar", header: "DAR"},
      {field: "use_for", header: "Use for"},
    ]

    async function getMedicineList(parameter="") {
      parameter = search_value.value
      const response = await fetch(`${SERVER_BASE}/738303ce/${parameter}`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
      });
      MedicineList.value = await response.json();
    }

    getMedicineList();
    return {
      getMedicineList,
      MedicineList,
      columns,
      search_value,
    }
  }
}
</script>




<style>
  .center {
    margin: auto;
    width: 30%;
    padding: 20px;
  }
</style>