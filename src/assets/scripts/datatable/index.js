import * as $ from 'jquery';
import 'datatables';

export default (function () {

  function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}


  $(document).ready(function () {
    $.ajax({
        url: 'http://bayercrop.eastus2.cloudapp.azure.com:7000/po',
        method: 'get',
        datatype: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          $('#example1').dataTable({
          
            data: data,
            columnDefs: [
              {
                targets: 0,
                className: 'text-nowrap'
              },
              {
                targets: 1,
                "render": function (data, type, row) {
                  return data;
             },
                className: 'text-nowrap'
              },
              {
                targets: 2,
                "render": function (data, type, row) {
                  return data;
             },
                className: 'text-info text-nowrap'
              },
              {
                targets: 3,
                "render": function ( data, type, full, meta ) {
                  return commaSeparateNumber(data);
                  },
                className: 'text-success text-nowrap text-right'
              },
            ],
            "columns": [
            { "data": "invoice_number" },
           // { "data": "product_category_name" },
            { "data": "monthyear" },
            { "data": "store_name" },
            {"data": "quantity"}
            ]
        });
      
        },
       
    });


    
   

    
  
    $('#example1').on('click', 'tr', function () {
      var invoice = this.firstElementChild.textContent;
      console.log(invoice)
      $.ajax({
        url: 'http://bayercrop.eastus2.cloudapp.azure.com:7000/po/'+invoice,
        method: 'get',
        datatype: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
          debugger;
           $('#example11').DataTable().clear();
            $('#example11').DataTable().destroy();
            $('#example11').dataTable({
                responsive: true,
                data: data,
                columnDefs: [
                  {
                    targets: 0,
                    className: 'text-nowrap'
                  },
                  {
                    targets: 1,
                    "render": function (data, type, row) {
                      return data;
                 },
                    className: 'text-nowrap'
                  },
                  {
                    targets: 2,
                    "render": function (data, type, row) {
                      return data;
                 },
                    className: 'text-info text-nowrap text-right'
                  },
                  {
                    targets: 3,
                    "render": function ( data, type, full, meta ) {
                      return commaSeparateNumber(data);
                      },
                    className: 'text-success text-nowrap text-right'
                  },
                ],
                "columns": [
                { "data": "product_name" },
               // { "data": "product_category_name" },
                { "data": "ord_quantity" },
                { "data": "unit_price" },
                {"data": "totprice"}
                ]
            });
        }
    });
    if(invoice != 'Invoice #'){
      $('#DescModal').modal("show");
    }
      
    });

    $(".dropdown-item_3").on('click', function(e)
  { 
   var selText = $(this).text();
   $("#dropdownMenu4").text(selText);
   var month = $(this).attr('id');
   
 
    $.ajax({
        url: "http://bayercrop.eastus2.cloudapp.azure.com:5000/po/create?period="+month,
        success: function(response) {
            alert(response)
            // return response; // <- I tried that one as well
        }
    });
 });
});



 
$(document).ready(function () { 
$.ajax({
  url: 'http://bayercrop.eastus2.cloudapp.azure.com:7000/pomon',
  method: 'get',
  datatype: 'json',
  contentType: "application/json; charset=utf-8",
  success: function (data) {
    $('#example12').dataTable({
    
      data: data,
      columnDefs: [
        {
          targets: 0,
          className: 'text-nowrap'
        },
        {
          targets: 1,
          "render": function (data, type, row) {
            return data;
       },
          className: 'text-nowrap'
        },
        {
          targets: 2,
          "render": function (data, type, row) {
            return data;
       },
          className: 'text-info text-nowrap'
        },
        {
          targets: 3,
          "render": function ( data, type, full, meta ) {
            return commaSeparateNumber(data);
            },
          className: 'text-success text-nowrap text-center'
        },
        {
          targets: 5,
          className: 'text-center'
        },
      ],
      "columns": [
      { "data": "monthyear" },
     // { "data": "product_category_name" },
      { "data": "store_name" },
      { "data": "product_name" },
      { "data": "ord_quantity",
      render: function (data, type, row) {
        if (row.ord_quantity !== null) {
             return row.ord_quantity; 
         }else{
             return '';
         } } },
      {
        "width": "10%",
        render: function (data, type, row) {
            return '<input class="form-control text-right trackInput" id='+ row.invoice_number +'-'+ row.product_id + ' name="fqty"  in_no = ' +row.store_id+ ' type="text"  value = ' + row.forcasted_qty + '  >';
        },
        
    },
    {
      "width": "5%",
      render: function (data, type, row) {
        if(row.override){
          return '<input class="vertical-align: middle;" id="checkbox1" name="fcast" p_id = ' +row.product_id+ ' in_no = ' +row.store_id+ ' type="checkbox"  value = ' + row.override + ' checked />';
        }
        else{
          return '<input class="vertical-align: middle;" id="checkbox1" name="fcast" p_id = ' +row.product_id+ ' in_no = ' +row.store_id+ ' type="checkbox"  value = ' + row.override + '  />';
        }
          
      },
      

  },
  {
    "width": "5%",
    render: function (data, type, row) {
      if(row.override){
        return '<button type="button" id='+row.product_id + ' in_no = ' +row.invoice_number+ ' class="btn btn-success" disabled>Auto</button>';
      }else if(row.ord_quantity !== null){
        return '<button type="button" id='+row.product_id + ' in_no = ' +row.invoice_number+ ' class="btn btn-warning" disabled>Ordered</button>';
      }
      
      else{
        return '<button type="button" id='+row.product_id + ' in_no = ' +row.invoice_number+ ' class="btn btn-primary" >Create</button>';
      }
        
    }}
      
      ]
  });

  

  },
 
});



});

$('#example12 tbody').on('change', 'input[type="checkbox"]', function(e){
  debugger;
  var pid = this.getAttribute('p_id')
  var inid = this.getAttribute('in_no')
  var val = false
  if($(this).is(":checked")) {
      var returnVal = confirm("Are you sure?");
      debugger;
      if(returnVal){
       val = true
       $("#apply" + pid).removeAttr('class')
       $("#apply" + pid).attr('class','btn btn-success')
       $("#apply" + pid).text('Auto')
       $("#apply" + pid).prop("disabled", true)
      }
      else {
        $(this).attr("checked", false);
      }
     
  }else{
     val = false
     $("#apply" + pid).removeAttr('class')
     $("#apply" + pid).attr('class','btn btn-primary')
     $("#apply" + pid).text('Create')
    $("#apply" + pid).prop("disabled", false)
    
  }
  $.ajax({
    url: 'http://bayercrop.eastus2.cloudapp.azure.com:7000/pomon/'+inid+ '/product/'+pid+'/val/'+val,
    type: 'PUT',
    success: function(result) {
      
      alert('Flag is updated, Please refresh the page')
    }
});      
});


$('#example12 tbody').on('click', 'td button', function (){

  var pid = this.getAttribute('id')
  var inid = this.getAttribute('in_no')
  var val = $("#"+inid+'-'+pid).val()
  $.ajax({
    url: 'http://bayercrop.eastus2.cloudapp.azure.com:7000/poval/'+inid+ '/product/'+pid+'/val/'+val,
    type: 'PUT',
    success: function(result) {
      alert('Order Created, Please refresh the page!')
    }
});   
});




}());
