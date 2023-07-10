function checkValidation() {
    let isChecked1 = document.getElementById("check1").checked
    let isChecked2 = document.getElementById("check2").checked

    if (isChecked1 && isChecked2) {
        location.href="./signup_second.html"
    }
    else {
        alert("check again")
    }
}
function checkPassword()
{
    let aPassword = document.getElementById("password1").value
    let rPassword = document.getElementById("password2").value
    let email = document.getElementById("email").value
    let address = email.substring(email.indexOf("@") + 1)
    if (aPassword===rPassword && address==="daltonschool.kr") {
        signup()
        location.href="./signup_fifth.html"
    }
    else if(address==="daltonschool.kr"){
        alert("Password does not match.")
    }
    else
    {
        alert("Only CDS students can sign up.")
    }
}

function checkFilled()
{
    let email = document.getElementById("email").value
    let name = document.getElementById("name").value
    let password1 = document.getElementById("password1").value
    let phone_number = document.getElementById("phone_num").value
    let id = document.getElementById("id").value

    if(email&&name&&password1&&phone_number&&id)
    {
        document.getElementById("button1").disabled = false
    }
    else
    {
        document.getElementById("button1").disabled = true
    }
}

async function signup() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let id = document.getElementById("id").value;
    let password1 = document.getElementById("password1").value;
    let phone_num = document.getElementById("phone_num").value;
    let address = document.getElementById("address").value;
    let self_intro = document.getElementById("self_intro").value;
    let conditions = document.getElementById("conditions").value;


    let body = {
            "name" : name,
            "email" : email,
            "user_id": id,
            "password" : password1,
            "phone_num" : phone_num,
            "address" : address,
            "presentation" : self_intro,
            "conditions" : conditions
        }

    let url = "http://210.109.62.129:8080/sign-up"
    console.log(body)
    
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name" : name,
            "email" : email,
            "user_id": id,
            "password" : password1,
            "phone_num" : phone_num,
            "address" : address,
            "presentation" : self_intro,
            "conditions" : conditions
        })
    })
}