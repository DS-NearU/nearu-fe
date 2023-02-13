let seconds = 10
let subtractInterval = setInterval(subtract,1000)
let isClicked = true;

function submitWCG() {
    let lastWord = document.getElementById("last_word").innerText
    let myWord = document.getElementById("inp_word").value
    
    if (lastWord[lastWord.length-1] === myWord[0]) {
        alert("success!")
        document.getElementById("last_word").innerText = myWord
        document.getElementById("inp_word").value = ""
        seconds = 10
    }
    
    else{
        alert("잘못 입력 하셨습니다. 다시 시도해 주세요.")
    }

}

function subtract() {
    if (seconds > 0) {
        seconds--
        document.getElementById("numbers").innerText = "00:" + seconds.toString().padStart(2, '0')
    }
    else {
        document.getElementById("button").disabled = true
        document.getElementById("inp_word").disabled = true

    }
}
