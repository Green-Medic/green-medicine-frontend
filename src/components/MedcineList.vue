
<template>

  <div class="center">
    <span class="p-input-icon-left">
      <i class="pi pi-search"/>
      <InputText type="text" class="p-inputtext-lg" v-model="search_value" placeholder="Search" />
    </span>
  </div>


  <DataTable :value="MedicineList">
    <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
  </DataTable>

</template>


<script>
import { ref } from 'vue';

export default {
  name: 'MedicineList',
  setup() {
    const SERVER_BASE = 'https://api.mocki.io/v1';
    const MedicineList = ref([]);
    let medicineListLength = 0;
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

    async function getMedicineList(parameters="") {
      const response = await fetch(`${SERVER_BASE}/738303ce/${parameters}`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
      });
      MedicineList.value = await response.json();
      medicineListLength = MedicineList.value.length;
    }
    getMedicineList();

    return {
      MedicineList,
      medicineListLength,
      columns
    }
  }
}
</script>




<style>
  .center {
    margin: auto;
    width: 20%;
    padding: 10px;
  }
</style>