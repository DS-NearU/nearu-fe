async function signIn() {
    let id = document.getElementById('id').value;
    let password = document.getElementById('password').value;
    
    console.log(CryptoJS.SHA256(password))
    let url = "http://127.0.0.1:8080/sign-in?user_id=" + id + "&password=" + password


        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type" : "sign-in/json",
            },
            body: JSON.stringify({
                "user_id" : id,
                "password" : password,
            })
            
        })    
    }
