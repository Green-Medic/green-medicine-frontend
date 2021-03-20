<template>
  <br />
  <br />
  <br />
  <br />
  <Message
    class="p-col-12 p-md-3"
    v-if="date_error"
    :severity="error_severity.severity"
    >You picked wrong Dates.</Message
  >
  <div class="center">


    <div style="float:left;margin-right:40px;">
      <datepicker
        placeholder="From Date"
        v-model="from_date"
        :upper-limit="upper_limit"
      />
    </div>
    <div style="float:left;margin-left:40px;">
      <datepicker
        placeholder="To Date"
        v-model="to_date"
        :upper-limit="upper_limit"
      />
    </div>
  </div>
  <br />
  <br />
  <br />
  <br />
  <br />
  <Chart type="horizontalBar" :data="plottingData" />
  <br />
  <br />
  <br />
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "CovidStat",
  setup() {
    var moment = require("moment"); // require

    let covidData = ref([]);
    let plottingData = ref({});
    let date_error = ref(false);

    const from_date = ref(
      moment()
        .subtract(7, "days")
        .toDate()
    );
    const to_date = ref(moment().toDate());
    const upper_limit = ref(new Date());

    // const toDate = ;
    // const fromDate = ;

    // let url = `https://api.covid19api.com/total/country/bangladesh/status/${status[0]}?from=${fromDate}T00:00:00Z&to=${toDate}T00:00:00Z`;
    let base_url = `https://api.covid19api.com/country/bangladesh?from=${moment(
      from_date.value
    )
      .subtract(1, "days")
      .format("YYYY-MM-DD")}T00:00:00Z&to=${moment(to_date.value).format(
      "YYYY-MM-DD"
    )}T00:00:00Z`;

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

          previous_confirmed = data[i].Confirmed;
          previous_recovered = data[i].Recovered;
          previous_death = data[i].Deaths;
        }
      }
      return {
        confirmed: { dates: dates, cases: confirmed },
        recovered: { dates: dates, cases: recovered },
        active: { dates: dates, cases: active },
        death: { dates: dates, cases: death },
      };
    }

    async function getCovidData(url) {
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

    watch([from_date, to_date], () => {
      console.log(from_date, to_date);
      // console.log(url)
      // console.log(fromDate, toDate)
      if (from_date.value > to_date.value) {
        date_error.value = true;
      } else {
        getCovidData(
          `https://api.covid19api.com/country/south-africa?from=${moment(
            from_date.value
          )
            .subtract(1, "days")
            .format("YYYY-MM-DD")}T00:00:00Z&to=${moment(to_date.value).format(
            "YYYY-MM-DD"
          )}T00:00:00Z`
        );
        date_error.value = false;
      }
      //   console.log(date_error.value);
    });

    getCovidData(base_url);

    return {
      plottingData,
      from_date,
      to_date,
      upper_limit,
      date_error,
      error_severity: { severity: "error" },
    };
  },
};
</script>

<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
