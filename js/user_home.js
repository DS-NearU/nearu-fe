let base_url = "http://127.0.0.1:8080/"
async function postRequest() {
    let url = `${base_url}application`
    let conditions = document.getElementById("reasons").value
    let d_day = document.getElementById("date").innerText
    let duration_hours = document.getElementById("duration").value
    let loc = document.getElementById("meet").innerText
    if (conditions && duration_hours && loc && d_day) {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "nearu_token" : localStorage.getItem("nearu_token")
            },
            body: JSON.stringify({
                "user_id": "nearu",
                "conditions": conditions,
                "d_day": $.datepicker.formatDate("yy-mm-dd", $(".datepicker").datepicker("getDate")) + " " + $(".timepicker").timepicker("getTime") + ":00",
                "duration_hours": duration_hours,
                "location": loc,
            })

        }).then((response) => {
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

    var date = $.datepicker.formatDate("DD, yy/mm/dd", $(".datepicker").datepicker("getDate"));
    $('#date').text(date); // + $(".timepicker").timepicker("getTime"))
    $('#date_input').val(date);
}

async function getUserApplication() { // 전체 다 보기
    let url = `${base_url}my-applications?user_id=nearu`

    let table = document.getElementById("user_application_list")
    let isMouseDown = false;
    let startX, scrollLeft;
    table.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        table.classList.add('active');

        startX = e.pageX - table.offsetLeft;
        scrollLeft = table.scrollLeft;
    });

    table.addEventListener('mouseleave', () => {
        isMouseDown = false;
        table.classList.remove('active');
    });

    table.addEventListener('mouseup', () => {
        isMouseDown = false;
        table.classList.remove('active');
    });

    table.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;

        e.preventDefault();
        const x = e.pageX - table.offsetLeft;
        const walk = (x - startX) * 1;
        table.scrollLeft = scrollLeft - walk;
    });
    await fetch(url, {
        headers : {
            "Content-Type": "application/json",
            "nearu_token" : localStorage.getItem("nearu_token")
        }
    })
        .then((response) => response.json())
        .then((data) => {
            data.map((e) => {
                console.log(e)
                let card = document.createElement("DIV")
                card.className = 'card'
                let name = document.createElement("DIV")
                name.innerText = `이름 : ${e.name}`
                let date = document.createElement("DIV")
                let d_day = new Date(e.dday)
                date.innerText = `${toStringByFormatting(d_day)} ${d_day.toLocaleTimeString()}`
                let duration = document.createElement("DIV")
                duration.innerText = `${e.duration_hours} hrs`

                let button = document.createElement("BUTTON")
                button.innerText = 'Full info'
                button.style.cursor = 'pointer'
                button.addEventListener('click', () =>{
                    let app_no = e.application_no
                    window.location.href = `./user_application_view.html?application_no=${app_no}`
                })


                card.appendChild(name)
                card.appendChild(date)
                card.appendChild(duration)
                card.appendChild(button)
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
async function getApplicationDetail() {
    const application_no = location.href.split('?')[1];
    let url = `${base_url}application-detail?${application_no}` // BE에서 새로 만든 function 써줌
    let url_two = `${base_url}cancel-student`
    
    let response;
    await fetch(url, {
        headers : {
            "Content-Type": "application/json",
            "nearu_token" : localStorage.getItem("nearu_token")
        }
    }).then((response) => response.json()).then((data) => {
        response = data;
    })

    console.log(response)

    const volunteers = response.applicants
    volunteers.map((vol) => {
        console.log(vol)

        const commentSpace = document.getElementById('volunteer')
        commentSpace.innerText += vol.name
        const name_minus = document.createElement('span')   
        name_minus.innerText = " x"
       
        name_minus.addEventListener("click", async (e) => {
            commentSpace.innerText = ""
            name_minus.innerText =""

            await fetch(url_two, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                    "nearu_token" : localStorage.getItem("nearu_token")
                },
                body: JSON.stringify({
                    "application_no" : response.app.application_no,
                    "user_no" : vol.user_no,
                })
                
            })        
        })   

        commentSpace.appendChild(name_minus)
   
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
    const expire_date = new Date(response.app.due_date).getDate()

    // actually 들어가는 것들 조합
    const date = dday_day + ", " + dday_year + "/" + ("0" + dday_month).slice(-2) + "/" + ("0" + dday_date).slice(-2)
    // console.log(date)
    const expire = dday_year + "/" + ("0" + expire_month).slice(-2) + "/" + ("0" + expire_date).slice(-2)
    const elapse = ("0" + dday_hour).slice(-2) + ":" + ("0" + dday_min).slice(-2) + " - " + ("0" + (dday_hour+response.app.duration_hours)).slice(-2) + ":" + ("0" + dday_min).slice(-2)

    const conditions = response.app.conditions
    let status = response.app.status

    if (status === true) {
        status = "Matched!"
    }
    else {
        status = "Not Matched."
    }

    const locations = response.app.location

    const date_value = document.getElementById('date')
    date_value.innerText = `${date}`
    const date_input = document.getElementById('date_input')
    date_input.value = `${date}`
    date_input.readOnly = true
    date_input.addEventListener('click', ()=>{
        popOpen();
    })
    const expire_value = document.getElementById('expire')
    expire_value.innerText = `${expire}`
    const dur_hour_value = document.getElementById('dur_hour')
    dur_hour_value.innerText = `${elapse}`
    const location_value = document.getElementById('meet')
    location_value.innerText = `${locations}`
    const details_value = document.getElementById('details')
    details_value.innerText = `${conditions}`
    $('#reasons').val(`${conditions}`)
    const status_value = document.getElementById('status')
    status_value.innerText = `${status}`
}

async function deleteApplication() {
    const application_no = location.href.split('?')[1];
    let url = `http://127.0.0.1:8080/application?${application_no}`

        await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
                "nearu_token" : localStorage.getItem("nearu_token")
            }
            
        })
    
    alert("Successfully canceled.")
    window.location.href='../user/user_home.html'
}

async function editApplication() {
    const application_no = location.href.split('?')[1];
    let url = `http://127.0.0.1:8080/application?${application_no}`
    

    let date = document.getElementById("date_input").value
    let dur_hour = document.getElementById("duration").value


    let locations = document.getElementById("meet").innerText
    let details = document.getElementById("reasons").value

    console.log( $(".timepicker").timepicker("getTime") + ":00")
    console.log(dur_hour)
    console.log(locations)
    console.log(details)



    // if 걸어주기 --> HTTP Exception 해놓음
    await fetch (url, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
            "nearu_token" : localStorage.getItem("nearu_token")
        },
        body: JSON.stringify({
            
            "d_day" : $.datepicker.formatDate("yy-mm-dd", $(".datepicker").datepicker("getDate")) + " " + $(".timepicker").timepicker("getTime") + ":00",
            "duration_hours" : dur_hour,
            "location" : locations,
            "conditions" : details,
        })
    })
}


function editButtonPressed(){
    const date_value = document.getElementById('date')
    const date_input = document.getElementById('date_input')
    date_value.style.display = 'none'
    date_input.style.display = 'inline-block'

    $('#dur_hour').css('display', 'none');
    $('#details').css('display', 'none');
    $('#start_time').css('display', 'block');
    $('#duration').css('display', 'inline-block');
    $('#add_button').css('display', 'inline-block');
    $('#reasons').css('display', 'inline-block');
    $('#confirm_button').css('display', 'inline-block');

}