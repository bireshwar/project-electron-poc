<template>
  <div class="wrapper">
    <div class="dashboard-main-panel">
      <div class="dashboard-demo-box">
        <div class="dashboard-demo-controls">
          <form>
            <label class="text-label" style="display:block;">{{lang.__deskDashFileSaveLabel}}</label>
            <div class="custom-control custom-radio pmd-radio custom-control-inline">
              <input class="demo-radio custom-control-input" type="radio" id="new-snippet" 
                    rel="button" name="snippet" aria-label="New Snippet" value="new-snippet"
                    @change="onChange($event)" checked=true/> 
              <label class="custom-control-label" style="font-size: 0.8em!important;line-height: 1.8!important;" for="new-snippet">{{lang.__deskDashFileSnippNewRadio}}</label>
            </div>
            <div class="custom-control custom-radio pmd-radio custom-control-inline">
              <input class="demo-radio custom-control-input" type="radio" id="existing-snippet" 
                    rel="button" name="snippet" aria-label="Existing Snippet" value="existing-snippet"
                    @change="onChange($event)" />
              <label class="custom-control-label" style="font-size: 0.8em!important;line-height: 1.8!important;" for="existing-snippet">{{lang.__deskDashFileSnippExistRadio}}</label>
            </div>
          </form>
        </div>
        <div class="dashboard-button-group">
          <router-link :to="path" class="dashboard-demo-button" tag="button">{{lang.__deskDashContinueButton}}</router-link>
        </div>
      </div>
      <div class="container" style="width: 100%;max-width: 100%;">
        <main class="content js-content">
          <div class="md-content">
            <div class="md-layout">
              <div
                class="md-layout-item md-large-size-100 md-medium-size-100 md-xsmall-size-100 md-size-33"
              >
                <div class="panel-body">
                  <md-list>
                    <div v-for="(file, index) in files" v-bind:index="index" v-bind:key="file.name">
                      <md-list-item>
                        <div class="demo">
                          <div class="demo-wrapper" style="padding:0px;">
                            <span class="demo-icon fa fa-file-text-o"></span>
                            <input v-model="file.description" class="demo-input" style="font-size: 0.8em;width: 82%;" aria-label="Describe the contents of the file" v-bind:placeholder="lang.__deskDashFileDescLabel+' '+file.name" v-on:keyup="saveDescription();"/>
                            <button type="button" class="close" aria-label="Close" style="line-height:33px;" v-on:click="onDeleteFile(file.name)">
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                        </div>
                      </md-list-item>
                    </div>
                  </md-list>
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
  @import "../assets/bootstrap/css/bootstrap.min.css";
  @import "../assets/css/variables.css";
  @import "../assets/css/global.css";
  @import "../assets/css/nav.css";
  @import "../assets/css/demo.css";
</style>
<script>
  import io from "socket.io-client";
  import axios from "axios";
  import { mapActions, mapGetters } from "vuex";

  let baseUrl = "http://localhost:7000";
  var socket  = io.connect(baseUrl);
  export default {
    components: {},
    data() {
      return {
        sidebarBackground: "dodger-blue",
        sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
        path : '/new-snippet'
      };
    },
    computed: mapGetters(["user","lang","files"]),
    methods: {
      ...mapActions(["getProfile","getFiles","setFiles"]),
      onChange(event) {
          this.path = `/${event.target.value}`;
      },
      onDeleteFile( name ){
        axios.post(`${baseUrl}/api/file/delete`, {name : name});
      },
      saveDescription(){
        this.setFiles(this.files);
      },
    },
    mounted () {
      this.getFiles();
    },
    created() {
      this.getProfile();
      socket.on("file-added", fetchedData => {
        this.getFiles();
      });

      socket.on("file-changed", fetchedData => {
        this.getFiles();
      });

      socket.on("file-removed", fetchedData => {
        this.getFiles();
      });
    }
  };
</script>
