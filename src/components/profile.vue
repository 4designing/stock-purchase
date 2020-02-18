<template>
  <div class="container">
    <div class="row">
      <div class="offset-lg-4 col-lg-4">
        <h6>Add a new Product :</h6>
        <form>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="post.title" />
          </div>
          <div class="form-group">
            <label>Price</label>
            <input class="form-control" v-model="post.content"/>
          </div>
          <button class="btn btn-primary float-right" @click.prevent="addPost()">Add Post</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h1>My Posts</h1>
        <p>here you can see all your previous posts</p>
      </div>
      <div class="col-lg-4" v-for="(post, index) in posts" :key="index">
        <div class="card">
          <div class="card-header">{{post.title}}</div>
          <div class="card-body">
            <p class="card-text">{{post.content}}</p>
          </div>
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
      post: {
        title: "",
        content: ""
      },
      posts: [],
      isLoaded:false
    };
  },
  methods: {
    addPost() {
      this.posts.push(this.post);
      this.$store.dispatch("addPosts", this.posts);
      this.post={
        title:"",
        content:""
      }
    },
    
  },
  created(){
    const vue = this;
    setTimeout(function(){
      vue.$store.dispatch("getMyPosts").then(function(res) {   
      if(res!=null) 
       {
        vue.posts=res;
       } 

        vue.isLoaded=true
      });
    }, 1000)
  }
};
</script>
<style scoped>
</style>