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

// Day - number 형태로 Mon/Tues
// Date - 날짜
async function getApplicationDetail(){
    const application_no = location.href.split('?')[1];
    let url = `http://127.0.0.1:8080/application-detail?${application_no}` // BE에서 새로 만든 function 써줌
    let response;
    await fetch(url).then((response) => response.json()).then((data) => {
        response = data; 
    })    
    
    const volunteers = response.applicants
    volunteers.map((vol) => {
        // console.log(vol.name)
        const commentSpace = document.getElementById('volunteer')
        commentSpace.innerText += " " + vol.name
    })

    const dday_year = new Date(response.app.dday).getFullYear()
    const dday_month = new Date(response.app.dday).getMonth()
    const dday_date = new Date(response.app.dday).getDate()
    let dday_day = new Date(response.app.dday).getDay()
    const dday_hour = new Date(response.app.dday).getHours()
    const dday_min = new Date(response.app.dday).getMinutes()

    if (dday_day == 0) {
        dday_day = "Sunday"
    }
    if (dday_day == 1) {
        dday_day = "Monday"
    }
    if (dday_day == 2) {
        dday_day = "Tuesday"
    }
    if (dday_day == 3) {
        dday_day = "Wednesday"
    }
    if (dday_day == 4) {
        dday_day = "Thursday"
    }
    if (dday_day == 5) {
        dday_day = "Friday"
    }
    if (dday_day == 6) {
        dday_day = "Saturday"
    }

    const expire_month = new Date(response.app.due_date).getMonth()
    const expire_date =  new Date(response.app.due_date).getDate()

    // actually 들어가는 것들 조합
    const date = dday_day + ", " + dday_year + "/" + dday_month + "/" + dday_date
    // console.log(date)
    const expire = dday_year + "/" + expire_month + "/" + expire_date
    const elapse = dday_hour + ":" + dday_min + " - " + dday_hour+response.app.duration_hours + ":" + dday_min
    const conditions = response.app.conditions
    let status = response.app.status

    if (status === true) {
        status = "Matched!"
    }
    else {
        status = "Not Matched."
    }
    //const location = response.app.location


    const date_value = document.getElementById('date')
    date_value.innerText = `${date}`
    const expire_value = document.getElementById('expire')
    expire_value.innerText = `${expire}`
    const dur_hour_value = document.getElementById('dur_hour')
    dur_hour_value.innerText = `${elapse}`
    // const location_value = document.getElementById('location')
    // location_value.innerText = `${location}`
    const details_value = document.getElementById('details')
    details_value.innerText = `${conditions}`
    const status_value = document.getElementById('status')
    status_value.innerText = `${status}`
}
