function popOpen() {

    var modalPop = $('.modal-wrap');
    var modalBg = $('.modal-bg'); 

    $(modalPop).show();
    $(modalBg).show();

}

 function popClose() {
   var modalPop = $('.modal-wrap');
   var modalBg = $('.modal-bg');

   $(modalPop).hide();
   $(modalBg).hide();

   var date = $.datepicker.formatDate("yy-mm-dd",$(".datepicker").datepicker("getDate")); 
   $('#date').css('border', '1px solid blue').text(date + " " + $(".timepicker").timepicker("getTime"))

}
    