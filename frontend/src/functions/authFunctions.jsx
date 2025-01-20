export async function logInFunction(v, setAuthentication){
    const body = JSON.stringify({
        email: v.login_email.value,
        password: v.login_password.value
    })
    setAuthentication(true)
    fetch(`http://localhost/3000/users`, {
        method: "POST",
        headers: {
            "Content-type":"application;json"
        },
        body: body,
    })
        .then(res => console.log(res.body))
        .catch(error => console.log(error))
}