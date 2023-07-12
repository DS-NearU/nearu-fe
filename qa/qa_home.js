async function postQ(){
    let anonymous = document.getElementById("anonymous").checked
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    
    // let url = "http://210.109.62.129:8080/qa"
    let url = "http://127.0.0.1:8080/qa"

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "anonymous" : anonymous,
            "title" : title,
            "question" : content,
            "user_no" : 15
        })
    })
}

async function getQ() {
    let url = "http://210.109.62.129:8080/qa-all"
    let cnt = 1
    await fetch (url)
    .then((response) => response.json())
    .then((data) => {
        data.map((e) => {
            document.write(`<div>`)
            document.write(`<div>${cnt}</div>`)
            // document.write(`<td>${e.question.title}</td>`)
            // document.write(`<td>${e.name}</td>`)
            // document.write(`<td>${e.question.created_dt}</td>`)
            document.write(`<div/>`)
            cnt++
        })
    })

    function listToComponent(data) {
            let cnt = 1;

        // data.map((e) => {
        //     document.write(`<tr>`)
        //     document.write(`<td>${cnt}</td>`)
        //     cnt++;
        //     document.write(`<td>${e.question.title}</td>`)
        //     document.write(`<td>${e.name}</td>`)
        //     document.write(`<td>${e.question.created_dt}</td>`)
        //     document.write(`<tr/>`)

        // })
    }

}

