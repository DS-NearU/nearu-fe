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
            
            tr.style.cursor = 'pointer'
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

    const q_title = document.getElementById('title')
    q_title.innerText = `${response.question.title}`
    const q_id = document.getElementById('user_id')
    q_title.innerText = `${response.question.user.user_id}`
    const q_date = document.getElementById('date')
    q_title.innerText = `${response.question.created_at}`
    const q_content = document.getElementById('content')
    q_title.innerText = `${response.question.question}`


    comments.map((com) => {

        const form = document.getElementById('commentSpace')
        const field = document.createElement('div')
        field.class = "field"

        const info = document.createElement('div')
        const info_user_id = document.createElement('span')
        const info_user_date = document.createElement('span')
        info_user_id.innerText = com.user.user_id
        info_user_date.innerText = com.created_at
        info.appendChild(info_user_id)
        info.appendChild(info_user_date)

        const contents = document.createElement('div')
        const contents_specific = document.createElement('input')
        contents_specific.type = "text"
        contents_specific.value = com.content

        field.appendChild(info)
        field.appendChild(contents)
        form.appendChild(field)
    })
}

/*
async function addComment() {
    let url = "http://127.0.0.1:8080/comment?user_id=nearu"
    let comment_user;
    await fetch(url).then((response) => response.json()).then((data) => {
        comment_user = data; 
    })

    const form = document.getElementById('commentSpace')
    const field = document.createElement('div')
    field.class = "field"

    const info = document.createElement('div')
    const info_user_id = document.createElement('div')
    const info_user_date = document.createElement('spdan')
    info_user_id.innerText = // comment_user에 어떻게 되어 있는지 보고 값 줌
    info_user_date.innerText = // 위에꺼랑 똑같이
    info.appendChild(info_user_id)
    info.appendChild(info_user_date)

    const contents = document.createElement('div')
    const contents_specific = document.createElement('input')
    contents_specific.type = "text"

    field.appendChild(info)
    field.appendChild(contents)
    form.appendChild(field)

}
*/

async function postComments() {
    const qa_no = location.href.split('?')[1];
    let url = `http://127.0.0.1:8080/qa?qa_no=${qa_no}`

    let user = document.getElementById('comment_id')
    let date = document.getElementById('comment_date')
    let content = document.getElementById('comment_contents')

    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user" : user,
            "date" : date,
            "content" : content
        })
    })

}