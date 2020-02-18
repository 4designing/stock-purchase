<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Our products</h1>
      </div>

      <div class="col-lg-4" v-for="(p, index) in posts" :key="index">
        <div class="card">
          <div class="card-header">{{p.title}}</div>
          <div class="card-body">
            <p class="card-text">{{p.content}} TL</p>
          </div>
          <button class="btn btn-primary col-4 m-3" @click="buy(p,index)">Buy Now</button>
        </div>
      </div>
      <div class="col-lg-4" v-if="!isLoaded">
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div> Loading ...
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      posts: [],
      isLoaded:false
    };
  },
  methods:{
    buy(p, index){
      this.$store.dispatch("addMyBasket", {p, index})
    }
  },

  created(){
    const vue = this
      let tab = []
      setTimeout(function(){
        vue.$store.dispatch("getAllPosts").then(function(res) {
          for (let i in res) {
            for (let j in res[i]) {
              tab.push(res[i][j])
            }
          }
          vue.posts = tab
          vue.isLoaded=true
        });
      }, 1000)
  }
};
</script>
<style>
.card {
  margin: 15px auto;
}
</style>