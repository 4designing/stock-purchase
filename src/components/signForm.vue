<template>
  <div>
    <div class="forms" v-if="showSignIn()">
        <!-- Sign In -->
          <form>
            <div class="form-group">
              <h3 class="text-center mb-3">Sign in</h3>
              <label>EMAIL</label>
              <input type="email" class="form-control" v-model="user.email" />
            </div>
            <div class="form-group">
              <label>PASSWORD</label>
              <input type="password" class="form-control" v-model="user.password"  />
            </div>
            <button type="submit" class="btn float-right" @click.prevent="signIn()">Submit</button>
          </form>
    </div>
    <div class="forms" v-if="showSignUp()">
          <form v-if="signupForm">
            <div class="form-group">
              <h3 class="text-center mb-3">Sign up</h3>
              <label>FULL NAME</label>
              <input type="text" class="form-control" v-model="user.fullName" />
            </div>
            <div class="form-group">
              <label>EMAIL</label>
              <input type="email" class="form-control" v-model="user.email" />
            </div>
            <div class="form-group">
              <label>PASSWORD</label>
              <input type="password" class="form-control" v-model="user.password" />
            </div>
            <button type="submit" class="btn float-right" @click.prevent="showSuccess()">CONTINUE</button>
          </form>
        
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signupForm: true,
      user: {
        fullName: "",
        email: "",
        password: ""
      },
      code: ""
    };
  },
  methods: {
    closeForm() {
      this.$store.dispatch("actionSignIn", false);
      this.$store.dispatch("actionSignUp", false);
    },
    showSignIn() {
      return this.$store.getters.getSignIn;
    },
    showSignUp() {
      return this.$store.getters.getSignUp;
    },
    showSuccess() {
      this.$store.dispatch("signup", this.user);
      this.signupForm = false;
    },
    signIn() {
      this.$store.dispatch("signin", this.user);
    }
  }
};
</script>

<style>
.forms{
  position: absolute;
right: 0;
  z-index: 999999999;
  background: white;
  padding: 15px;
  margin: 0 20px;
  width: 35%;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 10px

}
</style>