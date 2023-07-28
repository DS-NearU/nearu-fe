async function getProfile() {
    let url = "http://210.109.62.129:8080/profile?user_id=nearu"
    let profile;
    await fetch(url).then((response) => response.json()).then((data) => {
        profile = data; 
    })

    // console.log(profile) --> 값이 id에 따라 제대로 불려오는지 확인

    const name = profile.name
    const email = profile.email
    const phone_num = profile.phone_num
    const presentation = profile.presentation
    const rating = profile.rating

    const name_value = document.getElementById('name')
    name_value.innerText = `${name}`
    const email_value = document.getElementById('email')
    email_value.innerText = `${email}`
    const phone_num_value = document.getElementById('phonenum')
    phone_num_value.innerText = `${phone_num}`
    const presentation_value = document.getElementById('presentation')
    presentation_value.innerText = `${presentation}`
    const rating_value = document.getElementById('rating')
    rating_value.innerText = `${rating}`


}

async function editProfile() {
   
    
    let url = "http://210.109.62.129:8080/profile?user_id=nearu"

    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phone_num = document.getElementById("phone_num").value
    let emergency_num = document.getElementById("emergency_num").value
    let presentation = document.getElementById("presentation").value

    let address = email.substring(email.indexOf("@") + 1)

    if (address==="daltonschool.kr") {
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name" : name,
                "email" : email,
                "phone_num" : phone_num,
                "emergency_num" : emergency_num,
                "presentation" : presentation
            })
        })
    }
    else {
        alert("Only CDS students can volunteer for NearU.")
    }

}

function checkFilled() {
    
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phone_num = document.getElementById("phone_num").value
    let emergency_num = document.getElementById("emergency_num").value
    let presentation = document.getElementById("presentation").value
   
    if(name&&email&&phone_num&&emergency_num&&presentation)
    {
        document.getElementById("button1").disabled = false
    }
    else
    {
        document.getElementById("button1").disabled = true
    }
}

async function getNotification() {
    let url = "http://210.109.62.129:8080/notifications?user_id=nearu"
    let notification;
    await fetch(url).then((response) => response.json()).then((data) => {
        notification = data; 
    })

    console.log(notification)
    

    // console.log(profile) --> 값이 id에 따라 제대로 불려오는지 확인

    // const name = profile.name
    // const email = profile.email
    // const phone_num = profile.phone_num
    // const presentation = profile.presentation
    // const rating = profile.rating

    // const name_value = document.getElementById('name')
    // name_value.innerText = `${name}`
    // const email_value = document.getElementById('email')
    // email_value.innerText = `${email}`
    // const phone_num_value = document.getElementById('phonenum')
    // phone_num_value.innerText = `${phone_num}`
    // const presentation_value = document.getElementById('presentation')
    // presentation_value.innerText = `${presentation}`
    // const rating_value = document.getElementById('rating')
    // rating_value.innerText = `${rating}`


}

// function addLocation() {

//     let 
// }