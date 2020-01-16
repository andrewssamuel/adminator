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

  const lineChartBox = document.getElementById('line-chart');
  const lineCtx = lineChartBox.getContext('2d');

  var labels_bar = [], targeted_sales=[],actual_sales = [], labels_do=[],store_sales = [];   
  

  var labels = [], sales_items=[], sales_items_17=[], year=[],store=1, config={},saleslinechart=""; 

  $(".dropdown-item").on('click', function(e)
   { 
    var selText = $(this).text();
    $("#dropdownMenu2").text(selText);
    switch (selText) { 
      case 'Walmart': 
        store = 1;
        break;
      case 'Amazon': 
      store = 2;
        break;
      case 'Ebay': 
      store = 3;
        break;		
      case 'Etsy': 
      store = 4;
        break;
      case 'Target': 
      store = 5;
        break;
      case 'Costco': 
      store = 6;
        break;  
      case 'Aliexpress': 
      store = 7;
        break;
      case 'Kohls': 
      store = 8;
        break;
      case 'Wish': 
      store = 9;
        break;
      case 'Sears': 
      store = 10;
        break; 
      }

      populateData(store);
     
    
  });


  function populateData(sr,lineChartBox){
    console.log("getting called populate data");
    $.getJSON('http://localhost:7000/salesbystore/'+sr, function(results) {

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
      if(e.year == 2017){
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
          label                : '2020',
          backgroundColor      : 'rgba(237, 231, 246, 0.5)',
          borderColor          : COLORS['deep-purple-500'],
          pointBackgroundColor : COLORS['deep-purple-700'],
          borderWidth          : 2,
          data                 : sales_items,
        }, {
          label                : '2017',
          backgroundColor      : 'rgba(232, 245, 233, 0.5)',
          borderColor          : COLORS['blue-500'],
          pointBackgroundColor : COLORS['blue-700'],
          borderWidth          : 2,
          data                 : sales_items_17,
        }],
      },

      options: {
        legend: {
          display: true,
        },
      },

    }
    pupulateChart(config,lineChartBox)
    });
  
    
  }


function pupulateChart(config,lineChartBox){

   saleslinechart=new Chart(lineCtx, config);

    if(lineChartBox==='undefined'){
      saleslinechart.config = config
      saleslinechart.update()
    }else{
      
      
      saleslinechart.render()
    }

  
    
    
  }

  if (lineChartBox) {
    lineChartBox.height = 100

    populateData(store,lineChartBox)

 }
    

   

  
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
     return e.targeted_sales / 1000000
    
    })

    actual_sales = results.map(function(e) {
      return e.actual_sales / 1000000
     
     })
 
 }).done(function(){

  console.log(targeted_sales)
  console.log(actual_sales)

  const barSaleBox = document.getElementById('bar-chart-horizontal');
  barSaleBox.height = 350;
  const barSaleCtx = barSaleBox.getContext('2d');
   
  new Chart(barSaleCtx,{
    type: 'horizontalBar',
    data: {
      labels: labels_bar,
      datasets: [
        {
          label: "Acutal Sales(2019) (millions)",
          backgroundColor: 'rgba(0, 0, 255, 0.5)',
          data: actual_sales
        },
        {
          label: "Target Sales(2010) (millions)",
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

  
  


  $(document).ready(function () {
    $.ajax({
        url: 'http://localhost:7000/salesreport',
        method: 'get',
        datatype: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('#example').dataTable({
                data: data,
                columnDefs: [
                  {
                    targets: 0,
                    className: 'text-nowrap spacer'
                  },
                  {
                    targets: 1,
                    className: 'text-nowrap spacer'
                  },
                  {
                    targets: 2,
                    className: 'text-nowrap spacer text-right'
                  },
                  {
                    targets: 3,
                    className: 'text-info text-nowrap spacer text-right'
                  },
                  {
                    targets: 4,
                    className: 'text-success text-nowrap spacer text-right'
                  },
                ],
                "columns": [
                { "data": "product_name" },
                { "data": "product_category_name" },
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
  return e.sales / 1000000
 
 })

 }).done(function(){

  const donutSaleBox = document.getElementById("doughnut-chart");
  donutSaleBox.height = 700;
  const donutSaleCtx = donutSaleBox.getContext('2d');
 
 
  new Chart(donutSaleCtx, {
   type: 'doughnut',
   data: {
     labels: labels_do,
     datasets: [
       {
         label: "Population (millions)",
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
       text: 'Predicted world population (millions) in 2050'
     }
   }
 });


 });

 

  
 
 


 

  
 
 

 






}())

//-----------------
// Horizondal Bar Chart
//-----------------



