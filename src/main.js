import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import "primevue/resources/themes/saga-blue/theme.css"       //theme
import "primevue/resources/primevue.min.css"                //core css
import "primeicons/primeicons.css"                          //icons


createApp(App)
    .use(PrimeVue)
    .component("Button", Button)
    .component("InputText", InputText)
    .component("DataTable", DataTable)
    .component("Column", Column)
    .mount('#app');