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

// View/Get --> 즉 fetch사용
async function getNotification() {
    let url = "http://127.0.0.1:8080/notifications?user_id=nearu"
    let url_two = "http://127.0.0.1:8080/favorites?user_id=nearu"
    let notification;
    let favorites;
    await fetch(url).then((response) => response.json()).then((data) => {
        notification = data; 
    })

    await fetch(url_two).then((response) => response.json()).then((data) => {
        favorites = data; 
    })

    console.log(notification)
    console.log(favorites)

    // 위에 console찍은 다음에 다시 pathway 파악하기
    const email = notification.email_notif
    const phone = notification.phone_notif
    const text = notification.msg_notif
    const favorite = favorites

    favorite.map((fav) => {

        const form = document.getElementById('form')
        const field = document.createElement('div')
        field.class = "field"
        
        const fav_type = document.createElement('select')
        const fav_option_house = document.createElement('option')
        const fav_option_hospital = document.createElement('option')
        fav_option_house.value = "house"
        fav_option_hospital.value = "hospital"
        fav_type.appendChild(fav_option_house)
        fav_type.appendChild(fav_option_hospital)

        if (fav.favorite_type_code === "0") {
            fav_option_house.selected = true
        }
        else {
            fav_option_hospital.selected = true
        }

        const fav_address = document.createElement('input')
        fav_address.type = "text"
        fav_address.value = fav.address

        const fav_minus = document.createElement('span')   
        fav_minus.addEventListener("click", (e) => {
            form.removeChild(field)
        })   
       
        field.appendChild(fav_type)
        field.appendChild(fav_address)
        field.appendChild(fav_minus)
        form.appendChild(field)
    })
    
    if (email) {
        const email_setting_value = document.getElementById('email')
        email_setting_value.checked = true
    }
    else {
        const email_setting_value = document.getElementById('no_email')
        email_setting_value.checked = false
    }

    if (phone) {
        const phone_setting_value = document.getElementById('phone')
        phone_setting_value.checked = true
    }
    else {
        const phone_setting_value = document.getElementById('no_phone')
        phone_setting_value.checked = false
    }

    if (text) {
        const text_setting_value = document.getElementById('text')
        text_setting_value.checked = true
    }
    else {
        const text_setting_value = document.getElementById('no_text')
        text_setting_value.checked = false
    }

}

function addField() {

    const form = document.getElementById('form')
    
    const field = document.createElement('div')
    field.class = "field"
    
    const fav_type = document.createElement('select')
    const fav_option_house = document.createElement('option')
    const fav_option_hospital = document.createElement('option')
    fav_option_house.value = "house"
    fav_option_hospital.value = "hospital"
    fav_type.appendChild(fav_option_house)
    fav_type.appendChild(fav_option_hospital)

    const fav_address = document.createElement('input')
    fav_address.type = "text"

    const fav_minus = document.createElement('span')   
    fav_minus.addEventListener("click", (e) => {
        form.removeChild(field)
    })   
    
    field.appendChild(fav_type)
    field.appendChild(fav_address)
    field.appendChild(fav_minus)
    form.appendChild(field)

}



// DELETE
function removeField(minusElement){
    minusElement.parentElement.remove();
 }

 // POST (는 버튼 하나가 해주는 것)