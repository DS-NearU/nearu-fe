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
    if (aPassword===rPassword) {
        location.href="../html/signup_fifth.html"
    }
    else {
        alert("Password does not match.")
    }
}
<<<<<<< HEAD

function checkFilled() {
    let email = document.getElementById("email").value
    let name = document.getElementById("name").value

    if (email !== "" && name !== "") {
        document.getElementById("button1").disabled = false
    }
    else {
=======
function checkEmail()
{
    let email = document.getElementById().value
    let address = email.substring(email.indexOf("@") + 1)
    if(address==="daltonschool.kr")
    {
        location.href="../html/signup_fifth.html"
    }
    else
    {
        alert("Only CDS students can sign up.")
    }
}
function checkField()
{
    let email = document.getElementById("email").value
    let name = document.getElementById("name").value
    if(email&&name)
    {
        document.getElementById("button1").disabled = false
    }
    else
    {
>>>>>>> b4318d6d732aede592711805a9c81088ecc0dcae
        document.getElementById("button1").disabled = true
    }
}