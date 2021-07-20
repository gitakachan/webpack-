import "./scss/test.scss";

//main.js
import Vue from "vue"; //不用寫url，會去node_module找

//引入app template
//import App from "./vue/app.js";

//引入.vue
import App from "./vue/app.vue";

new Vue({
  el: "#app",
  template: "<App/>",
  components: {
    App: App, //也可只寫App(表示key-value相同)
  },
});
