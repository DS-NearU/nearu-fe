// function count () {
// let a= document.getElementById("numbers").innerText
// alert(a)
// }

// function addition () {
//     let a = parseInt(document.getElementById("numbers").innerText)
//     let b = a + 1
//     document.getElementById("numbers").innerText = b
// }

// function subtraction () {
//     let a = parseInt(document.getElementById("numbers").innerText)
//     let b = a - 1
//     document.getElementById("numbers").innerText = b
// }

// function ops(s) {
//     if(s==add)
//     {
//         document.getElementById("numbers").innerText++
//     }
//     else
//     {
//         document.getElementById("numbers").innerText--
//     }

// }

let seconds = 180
let isClicked = false;
let subtractInterval = setInterval(subtract, 1000)

function subtract() {
    if (seconds >= 0) {
        seconds--
        document.getElementById("numbers").innerText = (Math.floor(seconds/60) + ":" + seconds%60).padStart(2,"0")
    }
}

function timer() {
    if (!isClicked) {
        isClicked = true;
        subtractInterval = setInterval(subtract, 1000)
    }
}

function stop() {
    clearInterval(subtractInterval)
    isClicked = false;

}





