<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-end">
        <md-button :to="'/dashboard'" class="back-button">
          <!-- <router-link :to="dashboard" class="dashboard-demo-button" tag="button"> -->
            &#8592;
        </md-button>
        <div class="md-toolbar-section-start text-heading" style="float: right;text-align: right;display: block;margin-bottom: 5px;">
          
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  data() {
    return {
      selectedEmployee: null,
      // loading:false,
      // isDisabled:false,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    }
  }
};
</script>

<style lang="css"></style>
