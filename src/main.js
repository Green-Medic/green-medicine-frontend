import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import CovidStat from "./components/CovidStat.vue";
import MedcineList from "./components/MedcineList.vue";

import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import TabMenu from 'primevue/tabmenu';
import Chart from 'primevue/chart';


import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import 'primeflex/src/_elevation.scss';



const routes = [{ 
        path: "/",
        name: "MedcineList",
        component: MedcineList 
    },
    { 
        path: "/covid-stat",
        name: "CovidStat",
        component: CovidStat 
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
  .use(PrimeVue)
  .component("Button", Button)
  .component("InputText", InputText)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("TabMenu", TabMenu)
  .component("Chart", Chart)
  .use(router)
  .mount("#app");
