var socket = io();

const home = {
    template: '#tpl_home'
};

const router = new VueRouter({
    routes: [{
        path: '/home',
        component: home
    }]
});

const main = new Vue({
    el: "#main",
    data: {
        activeIndex: '1'
    },
    methods: {},
    router
});