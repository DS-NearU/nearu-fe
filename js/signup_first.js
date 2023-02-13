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