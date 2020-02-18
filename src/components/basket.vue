<template>
  <div class="container">
      <h1>My basket</h1>
    <ul class="list-group" >
      <li class="list-group-item" v-for="(p ,index) in basket" :key="index" >
          <span>{{index+1}} - </span>
          <span>Product Name: {{p.p.title}}</span>
          <span class="float-right">{{p.p.content}} TL</span>
          </li>
    </ul>
    <button class="btn btn-primary my-3 float-right" @click.prevent="clearStorage()">Buy</button>
  </div>
</template>
<script>
export default {
    data(){
        return {
            basket:this.$store.getters.getBasket
        }
    },
    methods:{
      clearStorage(){
        this.$store.dispatch("clearStorage")
      }
    }
};
</script>