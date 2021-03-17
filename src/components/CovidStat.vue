<template>
  <br />
  <br />
  <br />
  <Chart type="horizontalBar" :data="plottingData" />
</template>

<script>
import { ref } from "vue";

export default {
  name: "CovidStat",
  setup() {
    var moment = require("moment"); // require

    let covidData = ref([]);
    let plottingData = ref({});

    const toDate = moment().format("YYYY-MM-DD");
    const fromDate = moment()
      .subtract(10, "days")
      .format("YYYY-MM-DD");

    // let url = `https://api.covid19api.com/total/country/bangladesh/status/${status[0]}?from=${fromDate}T00:00:00Z&to=${toDate}T00:00:00Z`;
    let url = `https://api.covid19api.com/country/bangladesh?from=${fromDate}T00:00:00Z&to=${toDate}T00:00:00Z`;

    function processData(data) {
      let previous_confirmed = 0;
      let previous_recovered = 0;
      let previous_death = 0;

      let dates = [];
      let confirmed = [];
      let recovered = [];
      let active = [];
      let death = [];
      for (let i in data) {
        if (i == 0 || i == data.length - 1) {
          previous_confirmed = data[i].Confirmed;
          previous_recovered = data[i].Recovered;
          previous_death = data[i].Deaths;
        } else {
          dates.push(data[i].Date.slice(0, -10));
          confirmed.push(data[i].Confirmed - previous_confirmed);
          recovered.push(data[i].Recovered - previous_recovered);
          active.push(data[i].Active);
          death.push(data[i].Deaths - previous_death);
          console.log(data[i].Deaths, previous_death);

          previous_confirmed = data[i].Confirmed;
          previous_recovered = data[i].Recovered;
          previous_death = data[i].Deaths;
        }
      }
      console.log({
        confirmed: { dates: dates, cases: confirmed },
        recovered: { dates: dates, cases: recovered },
        active: { dates: dates, cases: active },
        death: { dates: dates, cases: death },
      });
      return {
        confirmed: { dates: dates, cases: confirmed },
        recovered: { dates: dates, cases: recovered },
        active: { dates: dates, cases: active },
        death: { dates: dates, cases: death },
      };
    }

    async function getCovidData() {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      let jsonValue = await response.json();
      covidData.value = jsonValue;

      let processedValue = processData(covidData.value);
      plottingData.value = {
        labels: processedValue.confirmed.dates,
        datasets: [
          //   {
          //     label: "Active",
          //     backgroundColor: "#42A5F5",
          //     data: processedValue.active.cases,
          //   },
          {
            label: "Confirmed",
            backgroundColor: "#0000ff",
            data: processedValue.confirmed.cases,
          },
          {
            label: "Recovered",
            backgroundColor: "#40ff00",
            data: processedValue.recovered.cases,
          },
          {
            label: "Death",
            backgroundColor: "#ff0040",
            data: processedValue.death.cases,
          },
        ],
      };
    }

    getCovidData();

    return {
      plottingData,
    };
  },
};
</script>

<style></style>
