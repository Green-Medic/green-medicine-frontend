<template>
  <div>
    <div class="center">
      <span class="p-input-icon-right">
        <i class="pi pi-search" />
        <InputText
          v-on:keyup.enter="search"
          type="text"
          class="p-inputtext-lg"
          style="width:600px;height:60px;border:solid;"
          v-model="search_value"
          placeholder="Search"
        />
      </span>
      <p
        v-bind:class="
          search_value.length > 0 && search_value.length < 3
            ? 'minimum-search'
            : 'no-display'
        "
      >
        You must enter minimum 3 alphabets to search.
      </p>
    </div>

    <DataTable :value="MedicineList.results">
      <Column
        v-for="col of columns"
        :field="col.field"
        :header="col.header"
        :key="col.field"
      ></Column>
    </DataTable>

    <br />

    <div class="navigation-row">
      <button
        v-on:click="navigate_page('previous')"
        v-bind:class="
          MedicineList.previous
            ? 'pi pi-chevron-left navigation-column'
            : 'no-display'
        "
        style="fontSize: 3rem"
      ></button>
      <i style="letter-spacing:5px;">Results: {{ MedicineList.count }}</i>
      <button
        v-on:click="navigate_page('next')"
        v-bind:class="
          MedicineList.next
            ? 'pi pi-chevron-right navigation-column'
            : 'no-display'
        "
        style="fontSize: 3rem"
      ></button>
    </div>

    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "MedicineList",
  setup() {
    const SERVER_BASE = "http://localhost:8080/api";
    const MedicineList = ref([]);
    const search_value = ref("");
    let root_url = `${SERVER_BASE}/medicines/`;

    const columns = [
      { field: "id", header: "SN" },
      { field: "brand_name", header: "Brand" },
      { field: "generic_name", header: "Generic Name" },
      { field: "strength", header: "Strength" },
      { field: "price", header: "Price (BDT)" },
      { field: "manufacturer", header: "Manufacturer" },
      { field: "dosages", header: "Dosages" },
      { field: "use_for", header: "Use for" },
    ];

    async function getMedicineList(url) {
      const response = await fetch(url, {
        // const response = await fetch(`${SERVER_BASE}/medicines/${parameter}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });
      let jsonValue = await response.json();
      MedicineList.value = jsonValue;
    }

    function search() {
      if (search_value.value.length > 2) {
        getMedicineList(`${root_url}?search=${search_value.value}`);
      }
    }

    function navigate_page(value) {
      if (value == "next") {
        getMedicineList(MedicineList.value.next);
      } else getMedicineList(MedicineList.value.previous);
    }

    // watch(search_value, (newValue, oldValue) => {
    //   console.log(search_value)
    //   console.log(newValue, oldValue)
    //   // nextUrl = jsonValue.next
    //   // previousUrl = jsonValue.previous
    //   // count = jsonValue.count
    // })

    // add a watch mehtod to check search input length

    getMedicineList(root_url);
    return {
      search,
      MedicineList,
      columns,
      search_value,
      navigate_page,
    };
  },
};
</script>

<style>
.center {
  margin: auto;
  width: 40%;
  padding: 30px;
}

.navigation-row {
  content: "";
  clear: both;
  display: table;
  align-items: center;
  margin: auto;
  display: flex;
  justify-content: center;
}

.navigation-column {
  padding: 5px;
  display: flex;
  justify-content: center;
}

.minimum-search {
  text-align: center;
  color: red;
}

.no-display {
  display: none;
}
</style>
