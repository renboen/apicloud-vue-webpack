import Vue from "vue"
import App from './test.vue';
if (DEBUG) {
    console.warn('在浏览器端运行页面,所有依赖apicloud内置的属性和方法将报错.');
    console.warn('建议将apicloud内置的属性和方法单独放到一个文件中进行封装,以便调试.');
    new Vue({
        el: "#test",
        components: {
            App
        },
        template: '<App/>'
    });
} else {
    apiready = function() {
        new Vue({
            el: "#test",
            components: {
                App
            },
            template: '<App/>'
        });
    };
}