<template>
  <div id="app">
    <router-view name="nav"></router-view>
    <app-sign></app-sign>
    <router-view></router-view>
  </div>
</template>

<script>
import signForm from "./components/signForm.vue";
export default {
  components: {
    "app-sign": signForm
  },
  created(){
    this.$store.dispatch('tryStoreBasket')
  }
};
</script>
<style>
</style>