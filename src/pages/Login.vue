<template>
  <div class="wrapper">
    <notifications></notifications>
    <div class="main-login-panel">
      <div class="container">
        <main class="content js-content">
          <div class="md-content">
            <div class="md-layout">
              <div class="md-layout-item md-large-size-100 md-medium-size-100 md-xsmall-size-100 md-size-100" style="height: 100vh;">
                <div class="panel-body row">
                    <div class="col-md-6">
                        <div class="logo-image">
                          <img src="../assets/img/logo_main.png" />
                          <h3>Social Search Engine</h3>
                        </div>
                    </div>
                    <div class="col-md-6">
                      <div class="login-form">
                        <h2 class="text-center">Log in to your search engine</h2>
                        <!-- <div class="form-group">
                          <a href="http://localhost:7000/api/login/facebook" class="btnfb pointer form-control">
                            <i class="fa fa-facebook fa-fw"></i>
                            <label id="buttonEnterByfb" class="pointer">Log-in by Facebook</label>
                          </a>
                        </div>
                        <div class="form-group">
                          <a href="http://localhost:7000/api/login/amazon" class="btnAmazon pointer form-control">
                            <i class="fa fa-amazon fa-fw"></i>
                            <label id="buttonEnterByAmazon" class="pointer">Log-in by Amazon</label>
                          </a>
                        </div> -->
                        <form @submit.prevent="loginUser" @submit.stop.prevent="showSnackbar = showSnackbar">    
                            <div class="form-group">
                                <input type="text" name="email" class="form-control" v-model="email" placeholder="Email Id" required="required"/>
                            </div>
                            <div class="form-group">
                                <input type="password" name="password" class="form-control" v-model="password" placeholder="Password" required="required"/>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block">Log-in by Mail</button>
                            </div>
                            <!-- <div class="form-group">
                                <router-link :to="'/register'" class="btn btn-primary btn-block" tag="button">Activate the Engine is free</router-link>
                            </div> -->
                            <md-snackbar class="danger" :md-position="'center'" :md-active.sync="showSnackbar" md-persistent>
                              <span>Email / Password Incorrect</span>
                            </md-snackbar>
                        </form>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<style>
  @import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
  @import "../assets/bootstrap/css/bootstrap.min.css";
  @import "../assets/css/variables.css";
  @import "../assets/css/global.css";
  @import "../assets/css/nav.css";
  @import "../assets/css/demo.css";
</style>
<script>
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
        email: "",
        password: "",
        showSnackbar: false,
        position: 'center',
        duration: 4000,
        isInfinity: false
      };
    },
    methods: {
      ...mapActions(["login","loginAmazon"]),
      loginUser() {
        let user = {
          email: this.email,
          password: this.password,
        };
        this.login(user)
          .then(res => {
            if (res.data.success) {
              this.showSnackbar = false;
              this.$router.push("/dashboard");
            }
          })
          .catch(err => {
            this.showSnackbar = true;
          });
      },
      loginWithFacebook() {
        //console.log("Coming soon......");
      },
      loginWithAmazon() {
        this.loginAmazon()
          .then(res => {
            //console.log(res);
            // if (res.data.success) {
            //   this.showSnackbar = false;
            //   this.$router.push("/dashboard");
            // }
          })
          .catch(err => {
            this.showSnackbar = true;
          });

      }
    }
  };
</script>
