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
                        <div class="logo-img">
                          <img src="../assets/img/logo_main.png" />
                          <h3>Wosnic Private and Social Search Engine</h3>
                        </div>
                    </div>
                    <div class="col-md-6">
                      <div class="login-form">
                        <h2 class="text-center">Activate your search engine is free!</h2>
                        <form>
                            <div class="form-group">
                              <a href="#" class="btnfb pointer form-control">
                                <i class="fa fa-facebook fa-fw"></i>
                                <label id="buttonEnterByfb" class="pointer">Log-in by Facebook</label>
                              </a>
                            </div>
                            <div class="form-group">
                              <a href="#" class="btnAmazon pointer form-control">
                                <i class="fa fa-amazon fa-fw"></i>
                                <label id="buttonEnterByAmazon">Log-in by Amazon</label>
                              </a>
                            </div>
                            <div class="form-group">
                              <select name="country" class="form-control">
                                <option v-for="(country, index) in countries" v-bind:index="index" v-bind:key="country">
                                  {{country}}
                                </option>
                              </select>
                            </div>
                            <div class="form-group">
                                <input type="text" name="name" class="form-control" placeholder="Name" required="required">
                            </div>
                            <div class="form-group">
                                <input type="text" name="sname" class="form-control" placeholder="Surname" required="required">
                            </div>
                            <div class="form-group">
                                <input type="text" name="email" class="form-control" placeholder="Email Id" required="required">
                            </div>
                            <div class="form-group">
                                <input type="password" name="password" class="form-control" placeholder="Password" required="required">
                            </div>
                            <div class="form-group">
                                <input type="password" name="confirm_password" class="form-control" placeholder="Confirm Password" required="required">
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block">Activate the Engine is free</button>
                            </div>
                            <!-- <div class="form-group">
                                <router-link :to="'/login'" class="btn btn-primary btn-block" tag="button">Log in by Mail</router-link>
                            </div> -->
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

<script>
  import routes from "../routes/routes"    
  import axios from "axios";
  let baseUrl = "http://localhost:7000";    
  export default {
      components: {},
      methods: {
        register: () => {

        }
      },
      data() {
        return {
          countries : []
        }
      },
      mounted () {
        this.countries = ["Andorra","United Arab Emirates","Afghanistan","Antigua and Barbuda","Anguilla","Albania","Armenia","Angola","Antarctica","Argentina","American Samoa","Austria","Australia","Aruba","Åland","Azerbaijan","Bosnia and Herzegovina","Barbados","Bangladesh","Belgium","Burkina Faso","Bulgaria","Bahrain","Burundi","Benin","Saint Barthélemy","Bermuda","Brunei","Bolivia","Bonaire","Brazil","Bahamas","Bhutan","Bouvet Island","Botswana","Belarus","Belize","Canada","Cocos [Keeling] Islands","Democratic Republic of the Congo","Central African Republic","Republic of the Congo","Switzerland","Ivory Coast","Cook Islands","Chile","Cameroon","China","Colombia","Costa Rica","Cuba","Cape Verde","Curacao","Christmas Island","Cyprus","Czech Republic","Germany","Djibouti","Denmark","Dominica","Dominican Republic","Algeria","Ecuador","Estonia","Egypt","Western Sahara","Eritrea","Spain","Ethiopia","Finland","Fiji","Falkland Islands","Micronesia","Faroe Islands","France","Gabon","United Kingdom","Grenada","Georgia","French Guiana","Guernsey","Ghana","Gibraltar","Greenland","Gambia","Guinea","Guadeloupe","Equatorial Guinea","Greece","South Georgia and the South Sandwich Islands","Guatemala","Guam","Guinea-Bissau","Guyana","Hong Kong","Heard Island and McDonald Islands","Honduras","Croatia","Haiti","Hungary","Indonesia","Ireland","Israel","Isle of Man","India","British Indian Ocean Territory","Iraq","Iran","Iceland","Italy","Jersey","Jamaica","Jordan","Japan","Kenya","Kyrgyzstan","Cambodia","Kiribati","Comoros","Saint Kitts and Nevis","North Korea","South Korea","Kuwait","Cayman Islands","Kazakhstan","Laos","Lebanon","Saint Lucia","Liechtenstein","Sri Lanka","Liberia","Lesotho","Lithuania","Luxembourg","Latvia","Libya","Morocco","Monaco","Moldova","Montenegro","Saint Martin","Madagascar","Marshall Islands","North Macedonia","Mali","Myanmar [Burma]","Mongolia","Macao","Northern Mariana Islands","Martinique","Mauritania","Montserrat","Malta","Mauritius","Maldives","Malawi","Mexico","Malaysia","Mozambique","Namibia","New Caledonia","Niger","Norfolk Island","Nigeria","Nicaragua","Netherlands","Norway","Nepal","Nauru","Niue","New Zealand","Oman","Panama","Peru","French Polynesia","Papua New Guinea","Philippines","Pakistan","Poland","Saint Pierre and Miquelon","Pitcairn Islands","Puerto Rico","Palestine","Portugal","Palau","Paraguay","Qatar","Réunion","Romania","Serbia","Russia","Rwanda","Saudi Arabia","Solomon Islands","Seychelles","Sudan","Sweden","Singapore","Saint Helena","Slovenia","Svalbard and Jan Mayen","Slovakia","Sierra Leone","San Marino","Senegal","Somalia","Suriname","South Sudan","São Tomé and Príncipe","El Salvador","Sint Maarten","Syria","Swaziland","Turks and Caicos Islands","Chad","French Southern Territories","Togo","Thailand","Tajikistan","Tokelau","East Timor","Turkmenistan","Tunisia","Tonga","Turkey","Trinidad and Tobago","Tuvalu","Taiwan","Tanzania","Ukraine","Uganda","U.S. Minor Outlying Islands","United States","Uruguay","Uzbekistan","Vatican City","Saint Vincent and the Grenadines","Venezuela","British Virgin Islands","U.S. Virgin Islands","Vietnam","Vanuatu","Wallis and Futuna","Samoa","Kosovo","Yemen","Mayotte","South Africa","Zambia","Zimbabwe"]
      },
  };
</script>

<style>

  @import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
  @import "../assets/bootstrap/css/bootstrap.min.css";
  @import "../assets/css/variables.css";
  @import "../assets/css/global.css";
  @import "../assets/css/nav.css";
  @import "../assets/css/demo.css";
</style>
