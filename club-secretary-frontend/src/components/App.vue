<template>
  <div>
    <app-navbar
      v-bind:mainTitle="organizationName"
      v-bind:subTitle="getToolName"
    >
    </app-navbar>
    <div id="content" class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <app-footer v-bind:title="organizationName" v-bind:contact="contact">
    </app-footer>
  </div>
</template>

<script>
import AppNavbar from "./AppNavbar.vue";
import AppFooter from "./AppFooter.vue";
//import EmailWizard from './EmailWizard.vue';  //for test

export default {
  name: "app",
  data: () => ({
    organizationName: "國立虎尾科技大學 追夢者自主學習社群",
    appName: "線上秘書處",
    appVersion: "Beta 0.1.0",
    contact: "第二綜合工程館地下室一樓‧Email：lyana.atene@gmail.com",
  }),
  computed: {
    getToolName: function () {
      return this.appName + " " + this.appVersion;
    },
  },
  components: {
    AppNavbar,
    //EmailWizard,
    AppFooter,
  },
};
</script>  


<style>
#content{
  min-height: calc(100vh - 200px);
}
</style>