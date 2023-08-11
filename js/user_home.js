async function postRequest(){
    let url = "http://127.0.0.1:8080/application"
    let conditions = document.getElementById("reasons").value
    let d_day = document.getElementById("date").innerText
    let duration_hours = document.getElementById("duration").value
    let loc = document.getElementById("meet").innerText
     
if (conditions&&duration_hours&&loc&&d_day) {
    await fetch (url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id" : "nearu",
            "conditions" : conditions,
            "d_day" : $.datepicker.formatDate("yy-mm-dd",$(".datepicker").datepicker("getDate")) + " " + $(".timepicker").timepicker("getTime") + ":00",
            "duration_hours" : duration_hours,
            "location" : loc,
        })
        
    }).then((response) =>{
        if (response.status == 500) {
            alert("Your appointment date has to be later than 24 hours from now.")
        }
    })    
    window.location.reload()
}
else {
    alert("Please fill in all the informations including date.")
}
}


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
   $('#date').text(date); // + $(".timepicker").timepicker("getTime"))

}
    
async function getUserApplication() { // 전체 다 보기
    let url = "http://127.0.0.1:8080/my-applications?user_id=nearu"

    let table = document.getElementById("user_application_list")
    await fetch (url)
    .then((response) => response.json())
    .then((data) => {
        data.map((e) => {
            console.log(e)
            let tr = document.createElement("TR");
            var created_at = document.createElement( "TD" ); 
            var d_day = document.createElement( "TD" ); 
            var due_date = document.createElement( "TD" ); 
            var duration_hours = document.createElement( "TD" ); 
            var location = document.createElement( "TD" ); 
            var status = document.createElement( "TD" ); 
            var conditions = document.createElement( "TD" ); 

            created_at.innerHTML = `${e.created_at}`
            d_day.innerHTML = `${e.dday}`
            due_date.innerHTML = `${e.due_date}`
            duration_hours.innerHTML = `${e.duration_hours}`
            location.innerHTML = `${e.location}`
            status.innerHTML = `${e.status}`
            conditions.innerHTML = `${e.conditions}`
        
            tr.appendChild(created_at)
            tr.appendChild(d_day)
            tr.appendChild(due_date)
            tr.appendChild(duration_hours)
            tr.appendChild(location)
            tr.appendChild(status)
            tr.appendChild(conditions)
            table.appendChild(tr)
        })

    })

}