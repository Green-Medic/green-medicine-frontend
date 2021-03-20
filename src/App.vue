<template>
  <TabMenu :model="items" />
  <router-view />
</template>

<script>
export default {
  name: "App",
  // components: {},
  setup() {
    const items = [
      { label: "Medicine List", icon: "pi pi-fw pi-home", to: "/" },
      {
        label: "Covid Statistics(Bangladesh)",
        icon: "pi pi-fw pi-calendar",
        to: "/covid-stat",
      },
    ];

    return{
      items
    }
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 20px 10px;
  height: 100%;
  background: #f9f9f9;
}
.container {
  padding-top: 20px;
}
</style>
