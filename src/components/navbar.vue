
<template>
  <nav class="navbar navbar-expand-lg ">
    <div class="container">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <Menu :size="30"></Menu>
      </button>
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link tag="a" to="/">HOME</router-link>
        </li>
      </ul>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="text-center btns-group ml-auto" v-if="signs=!auth">
          <button class="btn" @click="changeStateSignIn()" >SIGN IN</button>
          <div class="clearfix d-lg-none"></div>
          <button class="btn" @click="changeStateSignUp()" >SIGN UP</button>
          <router-link tag="a" :to="{name:'basket'}">Basket<span class="badge badge-light">{{basket.length}}</span></router-link>
   
        </div>
        
        <div v-if="signs=auth" class="text-center spans ml-auto">
          <div v-if="showProfile()" :key="key">
          <router-link tag="span" to="profile" class="profile ml-auto"  >PROFILE</router-link>
          <div class="clearfix d-lg-none"></div>
          <span @click="logOut()" >LOGOUT</span>
        </div>
        
        </div>
        
        
        
      </div>
    </div>
  </nav>
</template>

<script>
import Menu from "vue-material-design-icons/Menu.vue"
export default {
  components:{
    Menu
  },
  data() {
    return {
      profile: false,
      signs: true,
      key: 0,
      basket:this.$store.getters.getBasket

    };
  },
  methods: {
    changeStateSignIn() {
      this.$store.dispatch("actionSignIn", !this.$store.getters.getSignIn);
      this.$store.dispatch("actionSignUp", false);
    },
    changeStateSignUp() {
      this.$store.dispatch("actionSignUp", !this.$store.getters.getSignUp);
      this.$store.dispatch("actionSignIn", false);
    },
    showProfile() {
      this.profile = this.$store.getters.getProfile;
      this.$store.dispatch("actionSignIn", false);
      this.key = 1;
      return this.profile;
    },
    logOut(){
      this.$store.dispatch('logout');
    },
  },
  watch: {
    profile() {
      this.signs = false;
    }
  },
  computed:{
    auth(){
      return this.$store.getters.isAuth
    },
    
    
  },

};
</script>
<style scoped>

.spans span{
  margin: 0 10px;
  cursor: pointer;
}
.menu-icon{
  color: grey
}
</style>