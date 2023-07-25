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
            tr.addEventListener("click", function(){
                location.href = `./qa_view.html?${e.question.qa_no}`
            })
        })
    })

//     function listToComponent(data) {
//             let cnt = 1;

//             data.map((e) => {
//                 document.write(`<tr>`)
//                 document.write(`<td>${cnt}</td>`)
//                 cnt++;
//                 document.write(`<td>${e.question.title}</td>`)
//                 document.write(`<td>${e.name}</td>`)
//                 document.write(`<td>${e.question.created_dt}</td>`)
//                 document.write(`<tr/>`)

//             })
//         }



    function pageToDetail(){
        location.href='./qa_view.html';
    }
}

async function getQDetail() {
    const qa_no = location.href.split('?')[1];
    let url = `http://127.0.0.1:8080/qa?qa_no=${qa_no}`
    let response;
    await fetch(url).then((response) => response.json()).then((data) => {
        response = data; 
    })
    const name = response.name
    const comments = response.comments
    const qa = response.question
    console.log(comments)
    console.log(response)
    const q_title = document.getElementById('title')
    q_title.innerText = `${response.question.title}`
    const q_id = document.getElementById('user_id')
    q_title.innerText = `${response.question.user.user_id}`
    const q_date = document.getElementById('date')
    q_title.innerText = `${response.question.created_at}`
    const q_content = document.getElementById('content')
    q_title.innerText = `${response.question.question}`
    comments.map((com) => {
        const com_user = document.getElementById('comment_user')
        com_user.innerText = `${com.user.user_id}`
        const com_date = document.getElementById('comment_user')
        com_date.innerText = `${com.created_at}`
        const com_content = document.getElementById('comment_user')
        com_content.innerText = `${com.content}`
    })
}


