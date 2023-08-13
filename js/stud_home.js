async function getAllApplication() {
    let url = "http://127.0.0.1:8080/applications"
    let result;
    let table = document.getElementById("app_table")

    await fetch(url).then((response) => response.json()).then((data) => {
        data.map((e) => {

            let tr = document.createElement("TR");
            var name = document.createElement("TD");
            var date = document.createElement("TD");
            var time = document.createElement("TD");
            var location = document.createElement("TD");

          
            const dday_year = new Date(e.app.dday).getFullYear()
            const dday_month = new Date(e.app.dday).getMonth()
            const dday_date = new Date(e.app.dday).getDate()
            let dday_day = new Date(e.app.dday).getDay()
            const dday_hour = new Date(e.app.dday).getHours()
            const dday_min = new Date(e.app.dday).getMinutes()

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

            const date_value = dday_day + ", " + dday_year + "/" + dday_month + "/" + dday_date
            const elapse = ("0" + dday_hour).slice(-2) + ":" + ("0" + dday_min).slice(-2) + " - " + ("0" + (dday_hour+e.app.duration_hours)).slice(-2) + ":" + ("0" + dday_min).slice(-2)

            name.innerHTML = `${e.app.admin.user_info.name}`
            date.innerHTML = `${date_value}`
            time.innerHTML = `${elapse}`
            location.innerHTML = `${e.app.location}`

            tr.appendChild(name)
            tr.appendChild(date)
            tr.appendChild(time)
            tr.appendChild(location)
            table.appendChild(tr)
            
        })
    })
}

async function getStudVerAppDetail() {
    const application_no = location.href.split('?')[1];
    let url = `http://127.0.0.1:8080/application-detail?${application_no}` // BE에서 새로 만든 function 써줌
    let response;
    await fetch(url).then((response) => response.json()).then((data) => {
        response = data; 
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

    const name = response.app.admin.user_info.name
    const date = dday_day + ", " + dday_year + "/" + ("0" + dday_month).slice(-2) + "/" + ("0" + dday_date).slice(-2)
    const meeting_time = ("0" + dday_hour).slice(-2) + ":" + ("0" + dday_min).slice(-2)
    const duration = response.app.duration_hours + " hours" //소요시간
    const locations = response.app.location //location
    const conditions = response.app.conditions
    let status = response.app.status

    if (status === true) {
        status = "Matched!"
    }
    else {
        status = "Not Matched."
    }

    const name_value = document.getElementById('user')
    name_value.innerText = `${name}`
    const date_value = document.getElementById('date')
    date_value.innerText = `${date}`
    const meeting_time_value = document.getElementById('time')
    meeting_time_value.innerText = `${meeting_time}`
    const duration_value = document.getElementById('dur_hour')
    duration_value.innerText = `${duration}`
    const locations_value = document.getElementById('location')
    locations_value.innerText = `${locations}`
    const details_value = document.getElementById('details')
    details_value.innerText = `${conditions}`
    const status_value = document.getElementById('status')
    status_value.innerText = `${status}`
}

async function registerApp() {

}

async function cancelRegister() {
    const application_no = location.href.split('?')[1];
    const user_no = location.href.split('&')[1];
    let url = `http://127.0.0.1:8080/application?${application_no}&${user_no}`

    await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
        }
        
    })

    alert("Successfully canceled your registration.")
    window.location.href='../user/stud_home.html'
}