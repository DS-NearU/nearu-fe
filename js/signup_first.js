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