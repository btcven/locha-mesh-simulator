var socket = io();

var mymap = L.map('map-container').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibHVpc2FuMDAiLCJhIjoiY2pzcWZ0aWFnMDFtNzQzcXEzMTlpc3ducSJ9.-iOStSAXx1QAnsiv8shgRg'
}).addTo(mymap);

const main = new Vue({
    el: "#main",
    data: {},
    methods: {},
    mounted: function(){
        console.log('app mounted');
    }
});