<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <side-bar
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <sidebar-link to="/dashboard">
        <md-icon>list</md-icon>
        <p>List of Files</p>
      </sidebar-link>
      <!-- <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>User Profile</p>
      </sidebar-link>
      <sidebar-link to="/table">
        <md-icon>content_paste</md-icon>
        <p>Table list</p>
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>
      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link> -->
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <div class="container">
        <main class="content js-content">
          <main-content></main-content>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import TopNavbar from "./TopNavbar.vue";
import MainContent from "./Content.vue";

export default {
  components: {
    TopNavbar,
    MainContent
  },
  data() {
    return {
      sidebarBackground: "dodger-blue",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg")
    };
  }
};
</script>

<style>
/* @import "../../assets/fontawesome/css/all.min.css"; */
@import "../../assets/bootstrap/css/bootstrap.min.css";
@import "../../assets/css/variables.css";
@import "../../assets/css/global.css";
@import "../../assets/css/nav.css";
@import "../../assets/css/demo.css";
/* @import "../../assets/css/nativize.css"; */
/* @import "../../assets/css/section.css"; */
</style>
