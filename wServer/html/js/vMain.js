var socket = io();

mapboxgl.accessToken = 'pk.eyJ1IjoibHVpc2FuMDAiLCJhIjoiY2pzcWZ0aWFnMDFtNzQzcXEzMTlpc3ducSJ9.-iOStSAXx1QAnsiv8shgRg';

var map = new mapboxgl.Map({
    container: 'map-container', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [-74.50, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});



const main = new Vue({
    el: "#main",
    data: {
        maps: {
            container: 'map-container',
            token: 'pk.eyJ1IjoibHVpc2FuMDAiLCJhIjoiY2pzcWZ0aWFnMDFtNzQzcXEzMTlpc3ducSJ9.-iOStSAXx1QAnsiv8shgRg',
            position: [40, -40],
            zoom: 9
        }
    },
    methods: {

    },
    mounted: function () {
        console.log('app mounted');
    }
});