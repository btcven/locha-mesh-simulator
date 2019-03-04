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
        client_setting: {
            last_centerPos: [],
            last_zoom: 10,

        },
        mapStatus: {
            loading: false
        },
        scene: {
            accessToken: 'pk.eyJ1IjoibHVpc2FuMDAiLCJhIjoiY2pzcmllcWM1MTZkcTN5bzBzODFnc3p0YSJ9.7oGER0O1NP-vwyLx77mujQ',
            mapStyle: 'mapbox://styles/mapbox/satellite-v9',
            lng: -66.913262,
            lat: 10.482252,
            zoom: 10,
            pitch: 0,
            bearing: 0
        }

    },
    methods: {
        init: function () {
            this.$socket.emit('peer_list', {
                cmd: 'init',
                list: this.peer_list
            });
        },
        client_status: function (status) {
            console.log(status);
            this.$socket.emit('client_app', status);
        },
        socketEmit: function (msg) {
            this.$socket.emit(msg);
        },
        setMap: function (map) {
            this.map = map;
            this.map.dragPan._state = "enabled";
            this.mapStatus.loading = false;

        },
        unsetMap: function (map) {
            this.map = null;
        },
        // methods for localStorage.
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
            handler: function (a, b) {
                console.log('peer_list: changed');
            },
            deep: true
        },
        client_setting: {
            handler: function(){
                console.log('client_setting: changed');
            },
            deep: true
        }
    },
    mounted: function () {
        // wait until mapbox is fully loaded.
        // if nodes in localstorage ==> data.peer_list
        // else [] ==> data.peer_list
        
        this.init();
    }
});
