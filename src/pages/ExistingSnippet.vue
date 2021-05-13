<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <div class="dashboard-main-panel">
      <div class="dashboard-demo-box">
        <div class="dashboard-demo-controls">
          <router-link :to="'/dashboard'" style="float: left;">&#8592;</router-link>
        </div>
      </div>
      <div class="container existing" style="width: 100%;max-width: 100%;">
        <main class="content js-content">
          <div class="md-content">
            <div class="panel-body">
              <div class="demo mb-1">
                <div class="demo-wrapper" style="padding:0px;">
                  <div class="form-group has-search">
                    <label for="search" id="searchico">
                      <i aria-hidden="true" class="fa fa-search"></i>
                      <span class="sr-only">Search icons</span>
                    </label>
                    <input type="text" class="form-control" style="padding-left: 24px;" v-on:keyup="onSearch($event);" v-bind:placeholder="lang.__deskExistSnippSearchText">
                  </div>
                </div>
              </div>
              <div class="demo">
                <div class="demo-wrapper snippet-wrap" style="padding:0px;">
                  <div v-for="(item, index) in items" v-bind:index="index" v-bind:key="item._id" class="reviews-members pb-4">
                    <div v-if="user._id == item._source.useridPadre">
                      <div class="media" style="cursor:pointer;" v-on:click="showContent(item, item._id)">
                        <div style="float:left;">
                          <a href="#">
                            <img width="50" alt="Generic placeholder image" :src="item._source.imageAccount" class="mr-3 rounded-pill">
                          </a>
                        </div>
                        <div style="width:210px; float:left;">
                          <div class="media-body" style="margin-left: 10px;">
                            <div class="reviews-members-header">
                              <h6 class="mb-1">
                                <!-- <img src="../assets/img/open.png" style="width: 0.8em;margin-left: -23px;margin-right: 10px;"/> -->
                                <a class="text-black" style="font-size: 12px !important;" href="#">{{item._source.title}}</a>
                              </h6>
                            </div>
                            <div class="reviews-members-body">
                              <p class="text-black" style="font-size: 12px !important;">
                                {{item._source.content | strippedContent}}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div style="float:right;" class="mt-2">
                          <button class="demo-button" style="padding: 0.2em 1em;float: right;margin-right: 0px;" v-on:click="saveFiles(item, item._id)" id="save" :disabled='item.isDisabled'>
                            <div class="save-btn">{{lang.__deskExistFileSaveButton}}</div>
                            <md-progress-spinner v-if="item.loading" :md-diameter="20" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
                          </button>
                        </div>
                      </div>
                      <div class="review-demo-box" v-if="item.seen">
                        <div class="reviews-members-body">
                          <p class="text-black">
                            {{item._source.content | strippedContent2 }}
                          </p>
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
              <div class="demo mt-5">
                <div class="demo-wrapper text-center"  style="padding:0px;">
                  <router-link :to="'/new-snippet'" class="link" data-section="new-snippet">{{lang.__deskExistSnippAddLink}}</router-link>
                </div>
              </div>
              <md-snackbar v-bind:class="[hasError ? 'danger' : 'success']" :md-position="'center'" :md-active.sync="showSnackbar" md-persistent>
                  <span>{{message}}</span>
              </md-snackbar>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../assets/bootstrap/css/bootstrap.min.css";
  @import "../assets/css/variables.css";
  @import "../assets/css/global.css";
  @import "../assets/css/nav.css";
  @import "../assets/css/demo.css";

  ::v-deep .md-progress-spinner-circle {
    stroke: #FFF !important;
  }

  ::v-deep .md-progress-spinner.md-theme-default .md-progress-spinner-circle{
    stroke: #FFF !important;
  }

  .md-progress-spinner, 
  .md-progress-spinner-indeterminate, 
  .md-indeterminate{
    float: left;
    margin-left: 15px;
    margin-top: 1px;
  }

  .save-btn {
    float:left;
  }
</style>
<script>
  //import TopNavbar from "./Layout/TopNavbar.vue";
  import { mapActions, mapGetters } from "vuex";
  import axios from "axios";
  let baseUrl = "http://localhost:7000";
  export default {
    components: {

    },
    data() {
      return {
        sidebarBackground: "dodger-blue",
        sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
        showSnackbar: false,
        items : [],
        message : "",
        hasError: false
      }
    },
    computed: mapGetters(["user","lang","files"]),
    methods: {
      ...mapActions(["getProfile","getFiles"]),
      onSearch(event) {
        let snippet = {
          q : event.target.value,
          user : this.user
        };
        axios
          .post(`${baseUrl}/api/snippet/search`, snippet)
            .then(( res )=>{
              this.items = res.data;
            })
            .catch(err => {
              //console.log( err );
            });
      },

      showContent( item, id ) {
        item.seen = !item.seen;
      },

      saveFiles( item, id ) {
        let uploadObj = {
          files : this.files,
          user : this.user
        }

        if( this.user._id == item._source.useridPadre ){
          if( this.files.length > 0 ){
            item.loading = true;
            for( var i = 0; i < this.files.length; i++ ){
              axios
                .post( 
                      `${baseUrl}/api/files/upload/${id}`, 
                      {
                        file : this.files[i],
                        user : this.user
                      }
                  )
                  .then(( response )=>{
                    item.loading = false;
                    this.hasError = false;
                    this.showSnackbar = true;
                    this.message = this.lang.__deskExistSnippFileSuccess;;
                })
                .catch(err => {
                  item.loading = false;
                  this.hasError = true;
                  this.showSnackbar = true;
                  this.message = this.lang.__deskExistFileError;
                });
            }
          } else {
            this.hasError = true;
            this.showSnackbar = true;
            this.message = this.lang.__deskExistNoFileError;
          }
        } else {
          this.hasError = true;
          this.showSnackbar = true;
          this.message = this.lang.__deskExistFileDiffUserError;
        }
      }
    },
    filters: {
      strippedContent: function(string) {
          var fullString = string.replace(/<\/?[^>]+>/ig, " ");
          var dot = fullString.length > 25 ? "..." : "";
          return fullString.substring(0,25)+dot; 
      },

      strippedContent2: function(string) {
          var fullString = string.replace(/<\/?[^>]+>/ig, " ");
          return fullString
      }
    },
    mounted () {
      
    },
    created() {
      this.getProfile();
      this.getFiles();
    }
  };
</script>