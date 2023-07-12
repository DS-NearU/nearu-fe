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