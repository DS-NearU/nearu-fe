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
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let id = document.getElementById("id");
    let password1 = document.getElementById("password1");
    let password2 = document.getElementById("password2");
    let phone_num = document.getElementById("phone_num");
    let address = document.getElementById("address");
    let self_intro = document.getElementById("self_intro");
    let conditions = document.getElementById("conditions");

    let url = "210.109.62.129:8080/sign-up"
    console.log(url)
    
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: {
            "name" : name,
            "email" : email,
            "id": id,
            "password1" : password1,
            "password2" : password2,
            "phone_num" : phone_num,
            "address" : address,
            "self_intro" : self_intro,
            "conditions" : conditions
        }
    }).then(response => response.json())
    console.log(result)
}