
<template>
  <h1>Hello Medicine</h1>

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
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>