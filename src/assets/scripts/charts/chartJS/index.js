import Chart from 'chart.js';
import { COLORS } from '../../constants/colors';


/* $(document).ready(function(){
  // the event is fired when the dropdown is shown to the user
	$(".dropdown-menu").on('click', function()
   { alert("the drop down has been shown");});
  
  $(".dropdown-toggle").dropdown();
  
});  */

export default (function () {
  // ------------------------------------------------------
  // @Line Charts
  // ------------------------------------------------------

  
  var labels_bar = [], targeted_sales=[],actual_sales = [], labels_do=[],store_sales = [];   
  

  var labels = [], sales_items=[], sales_items_17=[], sales_items_19x=[], year=[],store=1, product=18, config={},saleslinechart=""; 

  $(".dropdown-item_1").on('click', function(e)
   { 
    
    var selText = $(this).text();
    $("#dropdownMenu2").text(selText);
    var product = $("#dropdownMenu3").attr('product');
    
    var store = $(this).attr('id');
    $("#dropdownMenu2").attr('store',store);
   
    
    populateData(store,product);
     
    
  });

  $(".dropdown-item_2").on('click', function(e)
  { 
   
   var selText = $(this).text();
   $("#dropdownMenu3").text(selText);
   var store = $("#dropdownMenu2").attr('store');
   
   var product = $(this).attr('id');
   $("#dropdownMenu3").attr('product',product);

   populateData(store,product);
    
   
 });

  


  function populateData(sr,pr){
    console.log("getting called populate data",sr,pr);
    $.getJSON('http://localhost:7000/salesbystore/'+sr+'/product/'+pr, function(results) {

      console.log(results)
  
      // Split timestamp and data into separate arrays
      
     var labels = results.map(function(e) {
      switch (e.month) { 
        case 1: 
          e.month = 'Jan';
          break;
        case 2: 
        e.month = 'Feb';
          break;
        case 3: 
        e.month = 'Mar';
          break;		
        case 4: 
        e.month = 'Apr';
          break;
        case 5: 
        e.month = 'May';
          break;
        case 6: 
        e.month = 'Jun';
          break;  
        case 7: 
        e.month = 'Jul';
          break;
        case 8: 
        e.month = 'Aug';
          break;
        case 9: 
        e.month = 'Sep';
          break;
        case 10: 
        e.month = 'Oct';
          break; 
        case 11: 
        e.month = 'Nov';
          break; 
        case 12: 
        e.month = 'Dec';
          break;            
      }
        return e.month;
     }),
     sales_items = results.map(function(e) {
       if(e.year == 2020){
         return e.sales_items
        }
        
     })

     sales_items_17 = results.map(function(e) {
      if(e.year == 2019){
        return e.sales_items
       }
       
    })

    sales_items_19x = results.map(function(e) {
      if(e.year == 2024){
        return e.sales_items
       }
       
    })

     year = results.map(function(e) {
       return e.year
     });

     function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
     }

     sales_items = jQuery.grep(sales_items, function(value) {
      return value != 'undefined';
    });

    sales_items_19x = jQuery.grep(sales_items_19x, function(value) {
      return value != 'undefined';
    });

    var sales_items_19x = sales_items_19x.filter(function (el) {
      return el != null;
    });

    var sales_items = sales_items.filter(function (el) {
  return el != null;
});

var sales_items_17 = sales_items_17.filter(function (el) {
  return el != null;
});

  

     console.log(sales_items)
     console.log(sales_items_17)

     var unique = labels.filter( onlyUnique );
     config = {
      type: 'line',
      data: {
        labels: unique,
        datasets: [{
          label                : '2020 Predicted',
          backgroundColor      : 'rgba(237, 231, 246, 0.5)',
          borderColor          : COLORS['deep-purple-500'],
          pointBackgroundColor : COLORS['deep-purple-700'],
          borderWidth          : 2,
          borderDash: [10,5],
          data                 : sales_items,
        }, {
          label                : '2019',
          backgroundColor      : 'rgba(232, 245, 233, 0.5)',
          borderColor          : COLORS['blue-500'],
          pointBackgroundColor : COLORS['blue-700'],
          borderWidth          : 2,
          data                 : sales_items_17,
        },
        {
          label                : '2019 Predicted',
          backgroundColor      : 'rgba(232, 245, 233, 0.5)',
          borderColor          : COLORS['red-500'],
          pointBackgroundColor : COLORS['red-700'],
          borderWidth          : 2,
          borderDash: [10,5],
          data                 : sales_items_19x,
        }],
      },

      options: {
        animation: false,
        legend: {
          display: true,
        },
      },

    }
    pupulateChart(config)
    });
  
    
  }


function pupulateChart(config){

  const lineChartBox = document.getElementById('line-chart');
 
   if(lineChartBox){
    //lineChartBox.height = 120
    const lineCtx = lineChartBox.getContext('2d');
    saleslinechart=new Chart(lineCtx, config);
    saleslinechart.render()
   }
    
  }
    //

    populateData(store,product)

 
    

   

  
      /*results.forEach(function(packet) {
        var month_no = packet.month;
        switch (month_no) { 
          case 1: 
            packet.month = 'Jan';
            break;
          case 2: 
            packet.month = 'Feb';
            break;
          case 3: 
            packet.month = 'Mar';
            break;		
          case 4: 
            packet.month = 'Apr';
            break;
          case 5: 
            packet.month = 'May';
            break;
          case 6: 
            packet.month = 'Jun';
            break;  
          case 7: 
            packet.month = 'Jul';
            break;
          case 8: 
            packet.month = 'Aug';
            break;
          case 9: 
            packet.month = 'Sep';
            break;
          case 10: 
            packet.month = 'Oct';
            break; 
          case 11: 
            packet.month = 'Nov';
            break; 
          case 12: 
            packet.month = 'Dec';
            break;            
        }
        labels.push(packet.month);
        data.push(parseFloat(packet.sales_items));
       // datasets.push(packet.year)
      })*/
      
       
      
    
  

 

  // ------------------------------------------------------
  // @Bar Charts
  // ------------------------------------------------------

  const barChartBox = document.getElementById('bar-chart');

  if (barChartBox) {
    const barCtx = barChartBox.getContext('2d');

    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label           : 'Dataset 1',
          backgroundColor : COLORS['deep-purple-500'],
          borderColor     : COLORS['deep-purple-800'],
          borderWidth     : 1,
          data            : [10, 50, 20, 40, 60, 30, 70],
        }, {
          label           : 'Dataset 2',
          backgroundColor : COLORS['light-blue-500'],
          borderColor     : COLORS['light-blue-800'],
          borderWidth     : 1,
          data            : [10, 50, 20, 40, 60, 30, 70],
        }],
      },

      options: {
        responsive: true,
        legend: {
          position: 'bottom',
        },
      },
    });
  }

  // ------------------------------------------------------
  // @Area Charts
  // ------------------------------------------------------

  const areaChartBox = document.getElementById('area-chart');

  if (areaChartBox) {
    const areaCtx = areaChartBox.getContext('2d');

    new Chart(areaCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          backgroundColor : 'rgba(3, 169, 244, 0.5)',
          borderColor     : COLORS['light-blue-800'],
          data            : [10, 50, 20, 40, 60, 30, 70],
          label           : 'Dataset',
          fill            : 'start',
        }],
      },
    });
  }

  // ------------------------------------------------------
  // @Scatter Charts
  // ------------------------------------------------------

  const scatterChartBox = document.getElementById('scatter-chart');

  if (scatterChartBox) {
    const scatterCtx = scatterChartBox.getContext('2d');

    Chart.Scatter(scatterCtx, {
      data: {
        datasets: [{
          label           : 'My First dataset',
          borderColor     : COLORS['red-500'],
          backgroundColor : COLORS['red-500'],
          data: [
            { x: 10, y: 20 },
            { x: 30, y: 40 },
            { x: 50, y: 60 },
            { x: 70, y: 80 },
            { x: 90, y: 100 },
            { x: 110, y: 120 },
            { x: 130, y: 140 },
          ],
        }, {
          label           : 'My Second dataset',
          borderColor     : COLORS['green-500'],
          backgroundColor : COLORS['green-500'],
          data: [
            { x: 150, y: 160 },
            { x: 170, y: 180 },
            { x: 190, y: 200 },
            { x: 210, y: 220 },
            { x: 230, y: 240 },
            { x: 250, y: 260 },
            { x: 270, y: 280 },
          ],
        }],
      },
    });
  }



 $.getJSON('http://localhost:7000/salesbyproductcategories', function(results) {

   console.log(results)

  labels_bar = results.map(function(e) {
       return e.product_category_name
      
   })
 
   targeted_sales = results.map(function(e) {
     return Math.round(e.targeted_sales / 1000000)
    
    })

    actual_sales = results.map(function(e) {
      return Math.round(e.actual_sales / 1000000)
     
     })
 
 }).done(function(){

  console.log(targeted_sales)
  console.log(actual_sales)

  const barSaleBox = document.getElementById('bar-chart-horizontal');
  //barSaleBox.height = 320;
  if(barSaleBox){
  const barSaleCtx = barSaleBox.getContext('2d');
   
  new Chart(barSaleCtx,{
    type: 'horizontalBar',
    data: {
      labels: labels_bar,
      datasets: [
        {
          label: "2019 Acutal Sales($M)",
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          data: actual_sales
        },
        {
          label: "2020 Target Sales($M)",
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          data: targeted_sales
        }
      ]
    },
    options: {
      legend: { display: true },
      title: {
        display: false,
        text: 'Predicted Sales by Product Categories'
      }
    }
  });
}

  
  function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}


  $(document).ready(function () {
    $.ajax({
        url: 'http://localhost:7000/salesreport',
        method: 'get',
        datatype: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#example').dataTable({
                data: data,
                responsive: true,
                //pageLength: 15,
                columnDefs: [
                  {
                    targets: 0,
                    className: 'text-nowrap spacer'
                  },
                 // {
                  //  targets: 1,
                   // className: 'text-nowrap spacer'
                  //},
                  {
                    targets: 1,
                    "render": function (data, type, row) {
                      return commaSeparateNumber(data);
                 },
                    className: 'text-nowrap  text-right'
                  },
                  {
                    targets: 2,
                    "render": function (data, type, row) {
                      return commaSeparateNumber(data);
                 },
                    className: 'text-info text-nowrap text-right'
                  },
                  {
                    targets: 3,
                    "render": function ( data, type, full, meta ) {
                      return +data+'%';
                      },
                    className: 'text-success text-nowrap text-right'
                  },
                ],
                "columns": [
                { "data": "product_name" },
               // { "data": "product_category_name" },
                { "data": "sales_2019" },
                { "data": "sales_2020" },
                {"data": "difference"}
                ]
            });
        },
        error: function (xhr, ajaxOptions, thrownError)
        {
            alert(xhr.responseText);
    }
    });
});

 
  

 });

 $.getJSON('http://localhost:7000/salesbystore', function(results) {
  labels_do = results.map(function(e) {
    return e.store_name
    })

store_sales = results.map(function(e) {
  return Math.round(e.sales/1000000)
 
 })

 }).done(function(){

  const donutSaleBox = document.getElementById("doughnut-chart");
  if(donutSaleBox){
  donutSaleBox.height = 700;
  const donutSaleCtx = donutSaleBox.getContext('2d');
 
 
  new Chart(donutSaleCtx, {
   type: 'doughnut',
   data: {
     labels: labels_do,
     datasets: [
       {
         label: "M",
         backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
         data: store_sales
       }
     ]
   },
   options: {
    legend: {
      position: 'bottom',
    },
     title: {
       display: false,
       text: ''
     }
   }
 });
  }

 });

 

  
 
 


 

  
 
 

 






}())

//-----------------
// Horizondal Bar Chart
//-----------------



