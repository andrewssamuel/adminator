import * as $ from 'jquery';
import 'jvectormap';
import 'jvectormap/jquery-jvectormap.css';
import './jquery-jvectormap-world-mill.js';
import { debounce } from 'lodash';

export default (function () {

  var markers_01 = null;
  var sales_qts = null;

  const vectorMapInit = () => {
    if ($('#world-map-marker').length > 0) {
      // This is a hack, as the .empty() did not do the work
      $('#vmap').remove();

      // we recreate (after removing it) the container div, to reset all the data of the map
      $('#world-map-marker').append(`
        <div
          id="vmap"
          style="
            height: 490px;
            position: relative;
            overflow: hidden;
            background-color: transparent;
          "
        >
        </div>
      `);
       
      console.log()

      var arr = {};
      

       arr ={
        map: 'world_mill',
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderOpacity: 0.25,
        borderWidth: 0,
        color: '#e6e6e6',
        
        regionStyle : {
          initial : {
            fill : '#e4ecef',
          },
        },

        markerStyle: {
          initial: {
            r: 7,
            'fill': '#fff',
            'fill-opacity':1,
            'stroke': '#000',
            'stroke-width' : 2,
            'stroke-opacity': 0.4,
          },
        },
        
        //markers : markers_01,
        series: {
          regions: [{
            values: {
              'US': 187.94,
              'AU': 175.03,
              'IN': 190.76,
              'GB': 175.04,
              'CN': 176.41,
              'CA': 179,
              'DE': 182.94,
              'SE': 173.92,
              'JP':190.04,
              'BR':172.05,
            },
            scale: ['#ff0000','#7CFC00','#006400'],
            normalizeFunction: 'polynomial',
          }],
        },
        hoverOpacity: null,
        normalizeFunction: 'linear',
        zoomOnScroll: false,
        scaleColors: ['#b6d6ff', '#005ace'],
        selectedColor: '#c9dfaf',
        selectedRegions: [],
        enableZoom: false,
        hoverColor: '#fff',
      }

      arr["markers"]=markers_01;
      
      console.log(arr)
      
      $('#vmap').vectorMap(arr);
    }
  };

  
  $.getJSON('http://bayercrop.eastus2.cloudapp.azure.com:7000/salesbycountries', function(results) {
   
    markers_01 = results.map(function(e) {
      var marker_02 = "";
      var latlan = [];
      latlan.push(e.latitude)
      latlan.push(e.longitude)
      marker_02 = {"latLng":latlan,"name":e.country_name+' : '+e.sales_items +' M'}

      return marker_02;
    })

   
  }).done(function(){
     
    vectorMapInit()

  });

  

  
  $(window).resize(debounce(vectorMapInit, 150));
})();
