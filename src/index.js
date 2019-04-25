import Vue from "vue"
import App from './App.vue';
// import _ from "lodash"
// console.log(_);
// _.partition([1, 2, 3, 4], n => n % 2);
process.env.NODE_ENV
new Vue({
    el: "#app",
    components: {
        App
    },
    template: '<App/>'
});