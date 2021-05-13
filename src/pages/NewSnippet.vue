<template>
  <div class="wrapper">
  <div class="dashboard-main-panel">
    <form @submit.prevent="addSnippet">
        <!-- <top-navbar></top-navbar> -->
        <div class="dashboard-demo-box">
          <div class="new-snippet-demo-controls">
            <router-link :to="'/dashboard'" style="float: left;">&#8592;</router-link>
          </div>
          <div class="new-snippet-button-group">
            <button type="submit" class="new-snippet-demo-button" id="save" :disabled='isDisabled'>
              <div class="save-btn">{{lang.__deskNewSaveSnippButton}}</div>
              <!-- <md-progress-spinner v-if="loading" :md-diameter="20" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner> -->
            </button>
          </div>
        </div>
        <div class="container">
          <main class="content js-content">
            <div class="md-content">
              <div class="md-layout">
                <div class="md-layout-item md-large-size-100 md-medium-size-100 md-xsmall-size-100 md-size-33">
                  <div class="panel-body" v-if="!loading">
                    <div class="demo mt-3 mb-3">
                      <div class="new-snippet-demo-wrapper">
                        <div class="new-snippet-radio-group">
                          <div class="custom-control custom-radio snippet-radio pmd-radio custom-control-inline mb-2">
                            <input class="demo-radio custom-control-input" type="radio" id="private" name="type" v-model="status" v-bind:value="'private'" aria-label="Private"/> 
                            <label class="custom-control-label" for="private">{{lang.__deskNewPrivateRadio}}</label>
                          </div>
                          <div class="custom-control custom-radio snippet-radio pmd-radio custom-control-inline">
                            <input class="demo-radio custom-control-input" type="radio" id="public" name="type" v-model="status" v-bind:value="'public'" aria-label="Public"/>
                            <label class="custom-control-label" for="public">{{lang.__deskNewPublicRadio}}</label>
                          </div> 
                        </div>
                        <div class="new-snippet-select-group">
                          <select class="new-snippet-demo-select" v-model="groupId">
                            <option value="">{{lang.__deskNewGroupSelect}}</option>
                            <option v-for="(group, index) in user_groups" v-bind:index="index" :value="group._id" v-bind:key="group._id">
                              {{ group.nomeGruppo }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="demo mb-3">
                      <div class="new-snippet-demo-wrapper">
                        <input class="new-snippet-demo-input" aria-label="Title" v-model="title" v-bind:placeholder="lang.__deskNewSnippTitleText"/>
                      </div>
                    </div>
                    <div class="demo mb-3">
                      <div class="new-snippet-demo-wrapper">
                        <div class="example">
                            <quill-editor
                              class="editor"
                              ref="myTextEditor"
                              :value="content"
                              :options="editorOption"
                              @change="onEditorChange"
                              @blur="onEditorBlur($event)"
                              @focus="onEditorFocus($event)"
                              @ready="onEditorReady($event)"
                            />
                        </div>
                      </div>
                    </div>
                    <md-snackbar v-bind:class="[hasError ? 'danger' : 'success']" :md-position="'center'" :md-active.sync="showSnackbar" md-persistent>
                      <span>{{message}}</span>
                    </md-snackbar>
                  </div>
                  <div class="panel-body loading-container" v-if="loading">
                      <div class="sploader_container">
                        <div class="svg_container">
                          <svg class="spinit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="">
                            <circle class="base" cx="100" cy="100" r="90"></circle>
                            <circle class="blue" cx="100" cy="100" r="90" pathLength="100" :style="'stroke-dashoffset: '+(100-progress)"></circle>
                          </svg>
                        </div>
                        <div class="loading_value">
                          <span class="number">{{progressPercent}}</span>
                          <span class="percent">%</span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../assets/bootstrap/css/bootstrap.min.css";
  @import "../assets/css/variables.css";
  @import "../assets/css/global.css";
  @import "../assets/css/nav.css";
  @import "../assets/css/demo.css";

  .example {
    display: flex;
    flex-direction: column;
    .editor {
      width: 100%;
      height: 25rem;
      margin: 0;
      border: 1px solid #ccc;
      overflow-y: auto;
      resize: vertical;
    }
    .output {
      &.ql-snow {
        border-top: none;
        height: 10rem;
      }
    }
  }

  ::v-deep .md-progress-spinner-circle {
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
  // import TopNavbar from "./Layout/TopNavbar.vue";
  import axios from "axios";
  import { mapActions, mapGetters } from "vuex";
  import { quillEditor } from 'vue-quill-editor';
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';

  let baseUrl = "http://localhost:7000";

  export default {
    components: {
      // TopNavbar,
      quillEditor
    },
    data() {
      return {
        sidebarBackground: "dodger-blue",
        sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
        showSnackbar: false,
        loading:false,
        isDisabled:false,
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
          }
        },
        progress: 1,
        progressPercent : 0,
        status:"private",
        title:"",
        groupId: "",
        content: ``,
        message:"",
        hasError: false
      }
    },
    computed: mapGetters(["user","lang","user_groups","files"]),
    methods: {
      ...mapActions(["getProfile","getUserGroups","getLocalFiles"]),
      onEditorChange(value) {
        this.content = value.html
      },
      onEditorBlur(editor) {
        //console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        //console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        //console.log('editor ready!', editor)
      },
      addSnippet() {
        let self = this;
        let snippetObj = {
          status: this.status,
          title: this.title,
          groupId: this.groupId,
          content: this.content,
          user : this.user
        };

        // let uploadObj = {
        //   files : this.files,
        //   user : this.user
        // };

        if( snippetObj.title && 
            snippetObj.groupId && 
            snippetObj.content &&
            snippetObj.status &&
            snippetObj.user._id ){
            this.loading = true;
            this.isDisabled = true;
            axios
              .post( `${baseUrl}/api/snippet/add`, snippetObj )
                .then(( res )=>{
                  //this.message = `Snippet created with ID : ${res.data._id}`;
                  if( this.files.length > 0 ){
                    setTimeout(() => {
                      let progressAmt = Math.round( 100 / this.files.length );
                      for( var i = 0; i < this.files.length; i++ ){
                        axios
                          .post( 
                                `${baseUrl}/api/files/upload/${res.data._id}`, 
                                {
                                  file : this.files[i],
                                  user : this.user
                                }
                            )
                            .then(( response )=>{
                              self.progress += progressAmt;
                              console.log(i,self.files.length);
                              if( ( self.progressPercent != 100 ) && ( i == self.files.length ) ){
                                self.progressPercent = 100;
                                setTimeout(function(){
                                  self.loading = false;
                                  self.isDisabled = false;
                                  self.hasError = false;
                                  self.showSnackbar = true;
                                  self.message = self.lang.__deskNewSnippFileSuccess;
                                },1000);
                              } else if ( ( self.progressPercent == 100 ) && ( i == self.files.length ) ){
                                setTimeout(function(){
                                  self.loading = false;
                                  self.isDisabled = false;
                                  self.hasError = false;
                                  self.showSnackbar = true;
                                  self.message = self.lang.__deskNewSnippFileSuccess;
                                },1000);
                              } else {
                                self.progressPercent += progressAmt;
                              }
                            })
                            .catch(err => {
                              this.loading = false;
                              this.isDisabled = false;
                              this.hasError = true;
                              this.showSnackbar = true;
                              this.message = this.lang.__deskNewFileError;
                            });
                      }
                    },1000);
                  } else {
                    this.loading = false;
                    this.isDisabled = false;
                    this.hasError = false;
                    this.showSnackbar = true;
                    this.message = this.lang.__deskNewSnippSuccess;
                  }
                })
                .catch(err => {
                  this.loading = false;
                  this.isDisabled = false;
                  this.hasError = true;
                  this.showSnackbar = true;
                  this.message = this.lang.__deskNewSnippError;
                });
          } else {
            this.loading = false;
            this.isDisabled = false;
            this.hasError = true;
            this.showSnackbar = true;
            this.message = this.lang.__deskNewRequiredFieldError;
          }
        }
    },
    mounted() {
    },
    created() {
      // var self = this;
      // setInterval(function(){ 
      //   if( self.progress < 100 ){
      //     self.progress +=1;
      //   }
      // }, 1000);

      this.getProfile();
      this.getUserGroups();
      this.getLocalFiles();
      this.editorOption.placeholder=this.lang.__deskNewSnippDescEditor;
    }
  };
</script>
