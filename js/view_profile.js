async function getProfile() {
    let url = "http://127.0.0.1:8080/profile"
    let profile;
    console.log(localStorage.getItem("nearu_token"))
    await fetch(url, {
        headers : {
            "Content-Type": "application/json",
            "nearu_token" : localStorage.getItem("nearu_token")
        }
    }).then((response) => response.json()).then((data) => {
        profile = data; 
    })
    

    console.log(profile)// --> 값이 id에 따라 제대로 불려오는지 확인


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
    
    let url = "http://127.0.0.1:8080/profile"

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
                "nearu_token" : localStorage.getItem("nearu_token")
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
    let url = "http://127.0.0.1:8080/notifications"
    let url_two = "http://127.0.0.1:8080/favorites"
    let notification;
    let favorites;
    await fetch(url, {
        headers : { 
            "Content-Type": "application/json",
            "nearu_token" : localStorage.getItem("nearu_token")
        }
    }).then((response) => response.json()).then((data) => {
        notification = data; 
    })

    await fetch(url_two, {
        headers : {
            "Content-Type": "application/json",
            "nearu_token" : localStorage.getItem("nearu_token")
        }
    }).then((response) => response.json()).then((data) => {
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

        const form = document.getElementById('formtest')
        const field = document.createElement('div')
        field.class = "field"
        
        const fav_type = document.createElement('select')
        const fav_option_house = document.createElement('option')
        const fav_option_hospital = document.createElement('option')
        fav_option_house.value = "house"
        fav_option_house.innerText = "house"
        fav_option_hospital.value = "hospital"
        fav_option_hospital.innerText = "hospital"

        if (fav.favorite_type_code === "0") {
            fav_option_house.setAttribute("selected", "true")
        }
        else {
            fav_option_hospital.setAttribute("selected", "true")
        }
        fav_type.appendChild(fav_option_house)
        fav_type.appendChild(fav_option_hospital)

        const fav_address = document.createElement('input')
        fav_address.type = "text"
        fav_address.value = fav.address

        const fav_minus = document.createElement('span') 
        fav_minus.innerText = "-"
  
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
        email_setting_value.checked = true
    }

    if (phone) {
        const phone_setting_value = document.getElementById('phone')
        phone_setting_value.checked = true
    }
    else {
        const phone_setting_value = document.getElementById('no_phone')
        phone_setting_value.checked = true
    }

    if (text) {
        const text_setting_value = document.getElementById('text')
        text_setting_value.checked = true
    }
    else {
        const text_setting_value = document.getElementById('no_text')
        text_setting_value.checked = true
    }

}

function addField() {

        const form = document.getElementById('formtest')
        if (form.children.length<4) {
            const field = document.createElement('div')
            field.class = "field"
    
            
            const fav_type = document.createElement('select')
            const fav_option_house = document.createElement('option')
            const fav_option_hospital = document.createElement('option')
            fav_option_house.value = "house"
            fav_option_house.innerText = "house"
            fav_option_hospital.value = "hospital"
            fav_option_hospital.innerText = "hospital"
            fav_type.appendChild(fav_option_house)
            fav_type.appendChild(fav_option_hospital)
        
            const fav_address = document.createElement('input')
            fav_address.type = "text"
        
            const fav_minus = document.createElement('span')   
            fav_minus.innerText = "-"
        
            fav_minus.addEventListener("click", (e) => {
                form.removeChild(field)
            })   
            
            field.appendChild(fav_type)
            field.appendChild(fav_address)
            field.appendChild(fav_minus)
            form.appendChild(field)
    
        }
        else {
            alert("You may save up to 4 favorite locations.")
        }
      
}

async function postFavorites() { // 버튼을 눌렀을때
    let url = "http://127.0.0.1:8080/notifications"

    let favorites = [];
    let email;
    let phone;
    let text;

    // DB에 DTO 값이 어떻게 받는지 확인
    // Boolean으로 되어 있으니까 이대로 JSON에 넘겨주면 됨
    if (document.getElementById('email').checked) {
        email = true
    }
    else {
        email = false
    }

    if (document.getElementById('phone').checked) {
        phone = true
    }
    else {
        phone = false
    }

    if (document.getElementById('text').checked) {
        text = true
    }
    else {
        text = false
    }

    const form = document.getElementById('formtest')
      /*
        const form = document.getElementById('formtest')
        console.log(console.log(form.children[1].children[1].value)) --> address
      */

    for (var i=0; i<form.children.length; i++) {
        let fav;

        //test할때: (trial & error필요 to find the correct path)
        console.log(form.children[i].children[0].children[0].selected) // i 다음으로 있는 것들은 0이 아닐수도, 시도 필요.
        console.log(form.children[i].children[1].value) // 얘도 먼저 i만 해보고, 1은 (option 1,2,3있길래 그 중 고른거임)
        
        // 나는 console에서 보면 Boolean으로 되어있지만
        // DB DTO을 확인해보면, Boolean을 받지 않고 String이 되어있음
        // 변환을 해주고 JSON으로 넘김
        if (form.children[i].children[0].children[0].selected) {
            fav = "home"
        }
        else {
            fav = "hospital"
        }
        favorites.push({
            "address": form.children[i].children[1].value,
            "fav_type" : fav
        })
    }
 
    await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "nearu_token" : localStorage.getItem("nearu_token")
        },
        body: JSON.stringify({
            "email_notification" : email,
            "phone_notification" : phone,
            "msg_notification" : text,
            "favorites" : favorites
        })
    })

}
