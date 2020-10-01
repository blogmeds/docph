$(document).ready(function(){



  /* Katogeriye ait servisleri çek */

  category_detail();

  $("#neworder_category").change(function(){

    category_detail();

  });

  /* Katogeriye ait servisleri çek */

  /* Servise ait verileri çek */

  $("#neworder_services").change(function(){

    service_detail();

  });

  /* Servise ait verileri çek */

  /* Sipariş miktarı değişince fiyat hesapla */

  $(document).on('keyup', '#order_quantity', function() {

    var service   = $("#neworder_services").val();

    var quantity  = $("#neworder_quantity").val();

    var runs      = $("#dripfeed-runs").val();

      if( $("#dripfeedcheckbox").prop('checked') ){

        var dripfeed  = "var";

      }else{

        var dripfeed  = "bos";

      }

    $.post('ajax_data',{action:'service_price',service:service,quantity:quantity,dripfeed:dripfeed,runs:runs}, function(data){

        $("#charge").val(data.price);

        $("#dripfeed-totalquantity").val(data.totalQuantity);

    }, 'json');

  });

  $(document).on('keyup', '#dripfeed-runs', function() {

    var service   = $("#neworder_services").val();

    var quantity  = $("#neworder_quantity").val();

    var runs      = $("#dripfeed-runs").val();

      if( $("#dripfeedcheckbox").prop('checked') ){

        var dripfeed  = "var";

      }else{

        var dripfeed  = "bos";

      }

    $.post('ajax_data',{action:'service_price',service:service,quantity:quantity,dripfeed:dripfeed,runs:runs}, function(data){

        $("#charge").val(data.price);

        $("#dripfeed-totalquantity").val(data.totalQuantity);

    }, 'json');

  });

  $(document).on('keyup', '#neworder_comment', function() {

    comment_charge();

  });

  /* Sipariş miktarı değişince fiyat hesapla */

  /* Dripfeed değiştir */

  $(document).on('change', '#dripfeedcheckbox', function() {

    var dripfeed = $(this).prop('checked');

    if( dripfeed ){

      $("#dripfeed-options").removeClass();

      dripfeed_charge();

    }else{

      $("#dripfeed-options").addClass('hidden');

      dripfeed_charge();

    }

  });

  /* Dripfeed değiştir */

});



function category_detail(){

  var category_now = $("#neworder_category").val();

  $.post('ajax_data',{action:'services_list',category:category_now}, function(data){

      $("#neworder_services").html(data.services);

      service_detail();

  }, 'json');

}



function service_detail(){

  var service_now = $("#neworder_services").val();

  $.post('ajax_data',{action:'service_detail',service:service_now}, function(data){

      if( data.empty == 1 ){

        $("#charge_div").hide();

      }else{

        $("#charge_div").show();

        $("#neworder_fields").html(data.details);

        $("#charge").val(data.price);

      }

      $(".datetime").datepicker({

         format: "dd/mm/yyyy",

         language: "tr",

         startDate: new Date(),

       }).on('change', function(ev){

         $(".datetime").datepicker('hide');

       });

      $("#clearExpiry").click(function(){

           $("#expiryDate").val('');

       });

       var dripfeed = $("#dripfeedcheckbox").prop('checked');

       if( dripfeed ){

         $("#dripfeed-options").removeClass();

       }

       comment_charge();

        if( $("#dripfeedcheckbox").prop('checked') ){

          dripfeed_charge();

        }

          if( data.sub ){

            $("#charge_div").hide();

          }else{

            $("#charge_div").show();

          }

  }, 'json');

}



function comment_charge(){

  var service   = $("#neworder_services").val();

  var comments  = $("#neworder_comment").val();

    if( comments ){

      $.post('ajax_data',{action:'service_price',service:service,comments:comments}, function(data){

          $("#neworder_quantity").val(data.commentsCount);

          $("#charge").val(data.price);

      }, 'json');

    }

}



function dripfeed_charge(){

  var service     = $("#neworder_services").val();

  var quantity    = $("#neworder_quantity").val();

  var runs        = $("#dripfeed-runs").val();

    if( $("#dripfeedcheckbox").prop('checked') ){

      var dripfeed  = "var";

    }else{

      var dripfeed  = "bos";

    }

  $.post('ajax_data',{action:'service_detail',service:service,quantity:quantity,dripfeed:dripfeed,runs:runs}, function(data){

      $("#charge").val(data.price);

  }, 'json');

}

$(document).ready(function(){



  var description_template  =   '<div class="form-group hidden fields" id="description">\n<label for="service_description" class="control-label">'+generalList["label_list"]["description"]+'</label>\n<div class="panel-body border-solid border-rounded" id="service_description">\n{{description}}</div>\n</div>';

  var quantity_template     =   '<div class="form-group hidden fields" id="order_quantity">\n<label class="control-label" for="field-orderform-fields-quantity">'+generalList["label_list"]["quantity"]+'</label>\n<input class="form-control" name="quantity" value="" type="text" id="neworder_quantity" disabled="" autocomplete="off">\n</div>\n<small class="help-block hidden min-max">Min: {{min}} - Max: {{max}}</small>';

  var link_template         =   '<div class="form-group hidden fields" id="order_link">\n<label class="control-label" for="field-orderform-fields-link">{{label}}</label>\n<input class="form-control" name="link" value="" type="text" id="field-orderform-fields-link">\n</div>';

  var comments_template     =   '<div class="form-group hidden fields" id="order_comment">\n<label class="control-label">'+generalList["label_list"]["comments"]+'</label>\n<textarea class="form-control counter" name="comments" id="neworder_comment" cols="30" rows="10" data-related="quantity"></textarea>\n</div>';

  var username_template     =   '<div class="form-group hidden fields" id="order_username">\n<label class="control-label" for="field-orderform-fields-quantity">'+generalList["label_list"]["link_username"]+'</label>\n<input class="form-control" name="username" value="" type="text">\n</div>';

  var dripfeed_template     =   '<div class="hidden" id="dripfeed">\n<div class="form-group fields" id="order_check">\n<label class="control-label has-depends " for="dripfeedcheckbox">\n<input name="check" value="1" type="checkbox" id="dripfeedcheckbox">\n'+generalList["label_list"]["dripfeed"]+'\n</label>\n<div class="hidden" id="dripfeed-options">\n<div class="form-group">\n<label class="control-label" for="dripfeed-runs">'+generalList["label_list"]["runs"]+'</label>\n<input class="form-control" name="runs" value="" type="text" id="dripfeed-runs">\n</div>\n<div class="form-group">\n<label class="control-label" for="dripfeed-interval">'+generalList["label_list"]["interval"]+'</label>\n<input class="form-control" name="interval" value="" type="text" id="dripfeed-interval">\n</div>\n<div class="form-group">\n<label class="control-label" for="dripfeed-totalquantity">'+generalList["label_list"]["totalquantity"]+'</label>\n<input class="form-control" name="total_quantity" value="" type="text" id="dripfeed-totalquantity" readonly="">\n</div>\n</div>\n</div>\n</div>';

  var auto_template         =   '<div id="order_auto" class="hidden"><div class="form-group fields">\n<label class="control-label" for="field-orderform-fields-posts">'+generalList["label_list"]["posts"]+'</label>\n<input class="form-control" name="posts" value="" type="text" id="field-orderform-fields-posts">\n</div>\n<div class="form-group fields" id="order_min">\n<label class="control-label" for="order_count">'+generalList["label_list"]["quantity"]+'</label>\n<div class="row">\n<div class="col-xs-6">\n<input type="text" class="form-control" id="order_count" name="min" value="" placeholder="Minimum">\n</div>\n<div class="col-xs-6">\n<input type="text" class="form-control" id="order_count" name="max" value="" placeholder="Maksimum">\n</div>\n</div>\n<small class="help-block min-max">Min: {{min}} - Max: {{max}}</small>\n</div>\n<div class="form-group fields" id="order_delay">\n<div class="row">\n<div class="col-xs-6">\n<label class="control-label" for="field-orderform-fields-delay">'+generalList["label_list"]["delay"]+'</label>\n<select class="form-control" name="delay" id="field-orderform-fields-delay">\n<option value="0">'+generalList["label_list"]["no_delay"]+'</option>\n<option value="300">5 '+generalList["label_list"]["minute"]+'</option>\n<option value="600">10 '+generalList["label_list"]["minute"]+'</option>\n<option value="900">15 '+generalList["label_list"]["minute"]+'</option>\n<option value="1800">30 '+generalList["label_list"]["minute"]+'</option>\n<option value="3600">60 '+generalList["label_list"]["minute"]+'</option>\n<option value="5400">90 '+generalList["label_list"]["minute"]+'</option>\n</select>\n</div>\n<div class="col-xs-6">\n<label for="field-orderform-fields-expiry">'+generalList["label_list"]["expiry"]+'</label>\n<div class="input-group" id="datetimepicker">\n<input class="form-control datetime" name="expiry" id="expiryDate" value="" type="text" autocomplete="off">\n<span class="input-group-btn">\n<button class="btn btn-default clear-datetime" id="clearExpiry" type="button"> <span class="fa fa-trash-o"></span></button>\n</span>\n</div>\n</div>\n</div>\n</div></div>';

  var addfunds_bank         =   '<div class="form-group payment_field">\n<label for="method" class="control-label">{{sender}}</label>\n<input class="form-control" name="payment_gonderen" value="">\n</div>';

  var addfunds_coupon       =   '<div class="form-group coupon_field">\n<label for="method" class="control-label">'+generalList["label_couponCode"]+'</label>\n<input class="form-control" name="coupon">\n</div>';

  var template              =   {'description':description_template,'quantity':quantity_template,'link':link_template,'comments':comments_template,'username':username_template,'dripfeed':dripfeed_template,'auto':auto_template,'bank_template':addfunds_bank,'coupon_template':addfunds_coupon};



  if( getSession("categories") ){ $("#neworder_category").val(getSession("categories")); }

  if( $("#neworder_category").val() == null ){ $("#neworder_category").append("<option value='0'>"+generalList["label_list"]["no_category"]+"</option>"); }

  $("#neworder_fields").append(template["link"]);

  $("#neworder_fields").append(template["quantity"]);

  $("#neworder_fields").append(template["comments"]);

  $("#neworder_fields").append(template["username"]);

  $("#neworder_fields").append(template["auto"]);

  $("#neworder_fields").append(template["dripfeed"]);



  if( typeof paymentMethods !== "undefined" )

  {

    var method = $('[name="payment_type"]');

    if( paymentMethods[method.val()] ){

      $.each(paymentMethods[method.val()]["fields"],function(a,e){

        if( a == "bank_template" && e == 1 ){ method.parent().after(generalList["bank_list"]); $("form button").before(template[a].replace("{{sender}}",generalList["label_list"]["addfunds_sender"])); }

        if( a == "coupon_code" && e == 1 ){ $("form button").before(template["coupon_template"]); $('[name="payment_amount"]').parent().addClass("hidden"); }

      })

    }

    if( getSession("payment_gonderen") ){ $('[name="payment_gonderen"]').val(getSession("payment_gonderen")); }

    method.change(function(){

      $(".payment_field").remove();

      $(".coupon_field").remove();

      $('[name="payment_amount"]').parent().removeClass("hidden");

      if( paymentMethods[method.val()] ){

        $.each(paymentMethods[method.val()]["fields"],function(a,e){

          if( a == "bank_template" && e == 1 ){ method.parent().after(generalList["bank_list"]); $("form button").before(template[a].replace("{{sender}}",generalList["label_list"]["addfunds_sender"])); }

          if( a == "coupon_code" && e == 1 ){ $("form button").before(template["coupon_template"]); $('[name="payment_amount"]').parent().addClass("hidden"); }

        })

      }

    });

  }



  if (typeof serviceArray !== "undefined")

  {

    updateServiceList(template);



    $("#neworder_category").change(function(){

      clearFields();

      updateServiceList(template);

    });



    $("#neworder_services").change(function(){

      clearFields();

      updateDetail(template);

    });



    $("#neworder_quantity").on('keyup',function(){

      updateRate(template);

    });



    $("#dripfeed-runs").on('keyup',function(){

      updateRate(template);

    });



    $("#neworder_comment").on('keyup',function(){

      updateRate(template);

    });



    $("#dripfeedcheckbox").on('change',function(){

      if( $("#dripfeedcheckbox").prop('checked') ){

        $("#dripfeed-options").removeClass();

      }else{

        $("#dripfeed-options").addClass("hidden");

      }

        updateRate(template);

    });

  }



  deleteSession();



 

});





function updateServiceList(template){

  var postService = window.sessionStorage.getItem("postservices");

  var catID = $("#neworder_category").val();

  var count = 0;

  $("#neworder_services").html("");

  $.each(serviceArray["services"],function(e,t){

    if( t["cid"] == catID  ){

      count++;

      var content = $("<option></option>").attr("value",t["id"]).text(t["name"]+" - "+priceFormat(t["price"])+" "+generalList["currency_name"]).attr("data-type",t["type"]).attr("data-array",e);

        if( postService == t["id"] ){

          content.attr("selected",true);

        }

      $("#neworder_services").append(content);

    }

  });

  if( count == 0 ){  var content = $("<option></option>").attr("value",0).text(generalList["label_list"]["no_service"]); $("#neworder_services").append(content); }

  else{ updateDetail(template); }

  

}



function deleteSession(){

   $.each(window.sessionStorage,function(a,b){

    window.sessionStorage.removeItem(a);

  });

}



function getSession(session){

  return window.sessionStorage.getItem("post"+session);

}



function clearFields(){

  $("#field-orderform-fields-link").val("");

  $("#neworder_quantity").val("");

  $("#neworder_comment").val("");

  $("#username").val("");

  $("#field-orderform-fields-posts").val("");

  $('[name="min"]').val("");

  $('[name="max"]').val("");

  $("#field-orderform-fields-delay").val("0");

  $("#expiryDate").val("");

  $("#order_link").addClass("hidden");

  $("#order_quantity").addClass("hidden");

  $(".min-max").addClass("hidden");

  $("#order_comment").addClass("hidden");

  $("#order_username").addClass("hidden");

  $("#order_auto").addClass("hidden");

  $("#dripfeed").addClass("hidden");

}



function updateDetail(template){

  var service = $("#neworder_services").find(':selected').attr("data-array"), type = serviceArray["services"][service]["type"],

      max     = serviceArray["services"][service]["max"], min     = serviceArray["services"][service]["min"],

      link    = serviceArray["services"][service]["link_type"], dripfeed = serviceArray["services"][service]["dripfeed"];



      if( link == 1 ){ link = "link_url"; } else { link = "link_username"; }

      updateDescription(template);



      if( type == 1 ){        

        $("#order_link > label").text(generalList["label_list"][link]);

        $("#order_link").removeClass("hidden");

        $("#order_quantity").removeClass("hidden");

        $(".min-max").removeClass("hidden").text("Min: "+min+" Max:"+max);

        $("#neworder_quantity").attr("disabled",false);

      } else if( type == 2 ){

        $("#order_link > label").text(generalList["label_list"][link]);

        $("#order_link").removeClass("hidden");

      } else if( type == 3 ){

        $("#order_link > label").text(generalList["label_list"][link]);

        $("#order_link").removeClass("hidden");

        $("#order_quantity").removeClass("hidden");

        $("#order_comment").removeClass("hidden");

        $("#neworder_quantity").attr("disabled",true);

      } else if( type == 4 ){

        $("#order_link > label").text(generalList["label_list"][link]);

        $("#order_link").removeClass("hidden");

        $("#order_comment").removeClass("hidden");   

      } else if( type == 5 ){

        $("#order_link > label").text(generalList["label_list"][link]);

        $("#order_link").removeClass("hidden");

        $("#order_username").removeClass("hidden");   

        $("#order_quantity").removeClass("hidden");

        $("#neworder_quantity").attr("disabled",false);

      }else if( type == 11 || type == 12 ){

        $("#order_username").removeClass("hidden");   

        $("#order_auto").removeClass("hidden");

        $("#order_min > .min-max").removeClass("hidden").text("Min: "+min+" Max:"+max);

      } else if( type == 14 || type == 15 ){

        $("#order_username").removeClass("hidden");   

      }



      if( dripfeed ){

        $("#dripfeed").removeClass("hidden");   

      }



      $(".datetime").datepicker({

         format: "dd/mm/yyyy",

         language: "tr",

         startDate: new Date(),

       }).on('change', function(ev){

         $(".datetime").datepicker('hide');

       });

       $("#clearExpiry").click(function(){

           $("#expiryDate").val('');

       });



      if( getSession("link") ){ $("#field-orderform-fields-link").val(getSession("link")); }

      if( getSession("quantity") ){ $("#neworder_quantity").val(getSession("quantity")); }

      if( getSession("username") ){ $('[name="username"]').val(getSession("username")); }

      if( getSession("posts") ){ $('#field-orderform-fields-posts').val(getSession("posts")); }

      if( getSession("expiry") ){ $('#expiryDate').val(getSession("expiry")); }

      if( getSession("min") ){ $('[name="min"]').val(getSession("min")); }

      if( getSession("max") ){ $('[name="max"]').val(getSession("max")); }

      if( getSession("delay") ){ $('[name="delay"]').val(getSession("delay")); }

      if( getSession("comments") ){ $('#neworder_comment').val(getSession("comments").replace(new RegExp('<br>', 'g'),"\r\n")); }



      updateRate(template);



}





function updateDescription(template){

  var service = $("#neworder_services").find(':selected').attr("data-array"), desc = serviceArray["services"][service]["description"];

    if( desc.length > 0 ){

      $("#neworder_fields").append(template["description"].replace("{{description}}",desc));

      $("#description").css("display","");

    } else{

      $("#description").css("display","none");

    }

}



function updateRate(template){

  var service   = $("#neworder_services").find(':selected').attr("data-array"), price    = serviceArray["services"][service]["price"],

      quantity  = $("#neworder_quantity").val(), comments = $("#neworder_comment").val(),

      dripfeed  = $("#dripfeedcheckbox").prop('checked'), runs = $("#dripfeed-runs").val();

      if( !$.isNumeric(quantity) ){ quantity = 0; }

      if( !dripfeed ){ runs = 1; } if( !runs ){ runs = 1; }

      if( !comments ){ comments = ""; }

        if( serviceArray["services"][service]["type"] == 2 || serviceArray["services"][service]["type"] == 4 || serviceArray["services"][service]["type"] == 14 || serviceArray["services"][service]["type"] == 15  ){

          price = price;

        } else if( serviceArray["services"][service]["type"] == 1 || serviceArray["services"][service]["type"] == 5 && quantity ) {

          price = price*quantity*runs/1000;

        } else if( serviceArray["services"][service]["type"] == 11 || serviceArray["services"][service]["type"] == 12 ){

          var priceHide = true;

        } else if( serviceArray["services"][service]["type"] == 3 ){

          if( comments.length == 0 ){

            quantity  = 0;

            price     = null;

            $("#neworder_quantity").val("");

          } else{

            quantity  = comments.split("\n").length;

            price     = price*quantity/1000;

            $("#neworder_quantity").val(quantity);

          }

        } 





        if( priceHide ){

          $("#charge_div").hide();

        } else if( price != null && price != 0 ){

          $("#charge_div").show();

          $("#charge").val(priceFormat(price)+" "+generalList["currency_name"]);

        } else{

          $("#charge_div").show();

          $("#charge").val("");

        }



        if( dripfeed ){

          var totalQ = quantity*runs;

            if( totalQ == 0 ){ totalQ = ""; }

          $("#dripfeed-totalquantity").val(totalQ);

        }

     

}





/*

1,000*/

function priceFormat(price){
    var priceExplode = price.toString().split('.');
    var neg = false;
    if(price < 0) {
        neg = true;
        price = Math.abs(price);
    }
    console.log(parseFloat(price));
}


function priceFormat(price){
    var priceExplode = price.toString().split('.');
    if( priceExplode[1] )
    {
      if( priceExplode[1].length == 1 )
      {
        return price+"0";
      }else
      {
        return price;
      }
    }else{
      return price+".00";
    }
}