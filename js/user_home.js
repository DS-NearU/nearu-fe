async function postRequest(){
    let url = "http://127.0.0.1:8080/application"
    let conditions = document.getElementById("reasons").value
    let d_day = document.getElementById("date").innerText
    let duration_hours = document.getElementById("duration").value
    let loc = document.getElementById("meet").innerText
     
    await fetch (url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user_id" : "nearu",
            "conditions" : conditions,
            "d_day" : d_day,
            "duration_hours" : duration_hours,
            "location" : loc,
        })
    })

}