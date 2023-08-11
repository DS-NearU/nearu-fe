async function postRequest(){
    let url = "http://210.109.62.129:8080/application"
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
            let card = document.createElement("DIV");
            card.className = 'card'
            let name = document.createElement("DIV");
            name.innerText = `이름 : ${e.admin.user_info.name}`
            let date = document.createElement("DIV");
            let d_day = new Date(e.dday)
            date.innerText = `${toStringByFormatting(d_day)} ${d_day.toLocaleTimeString()}`
            let duration = document.createElement("DIV")
            duration.innerText = `${e.duration_hours} hrs`
            


            card.appendChild(name)
            card.appendChild(date)
            card.appendChild(duration)
            table.appendChild(card)
            
        })

    })

}


function leftPad(value) {
    if (value >= 10) {
        return value;
    }

    return `0${value}`;
}

function toStringByFormatting(source, delimiter = '-') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
}

toStringByFormatting(new Date(2021, 0, 1));