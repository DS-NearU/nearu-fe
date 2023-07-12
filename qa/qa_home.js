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
    let table = document.getElementById("table_list")
    await fetch (url)
    .then((response) => response.json())
    .then((data) => {
        data.map((e) => {

            let tr = document.createElement("TR");
            var num = document.createElement( "TD" ); 
            var title = document.createElement( "TD" ); 
            var author = document.createElement( "TD" ); 
            var created_at = document.createElement( "TD" ); 

            num.innerHTML = `${cnt}`
            title.innerHTML = `${e.question.title}`
            author.innerHTML = `${e.name}`
            created_at.innerHTML = `${e.question.created_dt}`
            cnt++

            tr.appendChild(num)
            tr.appendChild(title)
            tr.appendChild(author)
            tr.appendChild(created_at)
            table.appendChild(tr)
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

