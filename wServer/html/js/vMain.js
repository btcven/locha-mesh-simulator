
var vSocket = {};
vSocket.install = function (Vue, connection, options) {

    let socket;

    if (connection != null && typeof connection === "object")
        socket = connection;
    else
        socket = io(connection || "", options);

    Vue.prototype.$socket = socket;

    let addListeners = function () {
        if (this.$options["socket"]) {
            let conf = this.$options.socket;
            if (conf.namespace) {
                this.$socket = io(conf.namespace, conf.options);
            }

            if (conf.events) {
                let prefix = conf.prefix || "";
                Object.keys(conf.events).forEach((key) => {
                    let func = conf.events[key].bind(this);
                    this.$socket.on(prefix + key, func);
                    conf.events[key].__binded = func;
                });
            }
        }
    };

    let removeListeners = function () {
        if (this.$options["socket"]) {
            let conf = this.$options.socket;

            if (conf.namespace) {
                this.$socket.disconnect();
            }

            if (conf.events) {
                let prefix = conf.prefix || "";
                Object.keys(conf.events).forEach((key) => {
                    this.$socket.off(prefix + key, conf.events[key].__binded);
                });
            }
        }
    };

    Vue.mixin({
        [Vue.version.indexOf('2') === 0 ? 'beforeCreate' : 'beforeCompile']: addListeners,
        beforeDestroy: removeListeners
    });
};

// vue-socket.io plugin
Vue.use(vSocket, 'ws://localhost:3000', {
    reconnection: true
});



// main app
var mainApp = new Vue({
    el: "#main",
    components: { 
        'vue-mapbox-map': VueMapboxMap 
    },
    data: {
        peer_list: [],
        
        scene: {
            accessToken: 'pk.eyJ1IjoibHVpc2FuMDAiLCJhIjoiY2pzcmllcWM1MTZkcTN5bzBzODFnc3p0YSJ9.7oGER0O1NP-vwyLx77mujQ',
            mapStyle: 'mapbox://styles/mapbox/streets-v11',
            lng: -66.913262,
            lat: 10.482252,
            zoom: 10,
            pitch: 0,
            bearing: 0
        }

    },
    methods: {
        init: function (list) {
            this.$socket.emit('nodes_list', {
                cmd: 'init',
                list: this.list
            });
        },
        socketEmit: function (msg) {
            this.$socket.emit(msg);
        },
        setMap: function(map) {
            this.map = map;
        },
        unsetMap: function(map){
            this.map = null;
        },
        saveSetting: function (k, v) {
            localStorage.setItem(k, v);
        },
        readSetting: function (k) {
            return localStorage.getItem(k);
        }
    },
    socket: {
        events: {
            changed: function (msg) {
                console.log('vSocket changed: ', msg);
            },
            connect: function () {
                console.log('vSocket connect');
            },
            disconnect: function () {
                console.log('vSocket disconnect.');
            },
            error: function (err) {
                console.log('vSocket Err:', err);
            }
        }
    },
    watch: {
        peer_list: {
            handler: function () {
                console.log('peer_list changed');
            },
            deep: true
        }
    },
    created: function () {
        console.log('app created');
    },
    mounted: function () {
        console.log('app mounted');
        this.socketEmit('client_ready');
        this.init();
    }
});
