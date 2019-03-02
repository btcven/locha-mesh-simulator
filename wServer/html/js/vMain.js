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

Vue.use(vSocket, 'ws://localhost:3000', {
    reconnection: true
});

var mainApp = new Vue({
    el: "#main",
    data: {
        list: []
    },
    methods: {
        init: function(list){
            this.$socket.emit('nodes_list', {
                cmd: 'init',
                list: this.list
            });
        },
        socketEmit: function (msg) {
            this.$socket.emit(msg);
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
    mounted: function () {
        console.log('app mounted');
        this.socketEmit('client_ready');
        this.init();
    }
});
