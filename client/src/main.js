import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/styles.css'

import VueToastr from "vue-toastr";
import './registerServiceWorker'

Vue.use(VueToastr, {
  defaultTimeout: 3000,
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  mounted(){
    this.$toastr.defaultPosition = "toast-bottom-right";
  }
}).$mount('#app')
