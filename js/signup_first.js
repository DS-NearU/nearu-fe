function checkValidation() {
    let isChecked1 = document.getElementById("check1").checked
    let isChecked2 = document.getElementById("check2").checked

    if (isChecked1 && isChecked2) {
        location.href="../html/signup_second.html"
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
        location.href="../html/signup_fifth.html"
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