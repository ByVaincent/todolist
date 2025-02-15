const SERVER_URL = "http://localhost:4000"; //"https://todolist-server-h39x.onrender.com"

export async function logInFunction(v, setAuthentication, setUserId) {
  const body = JSON.stringify({
    email: v.login_email.value,
    password: v.login_password.value,
  });
  fetch(`${SERVER_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 401 || data.status === 500) {
        alert(data.message);
      } else {
        setUserId(data.userId);
        setAuthentication(true);
      }
    })
    .catch((error) => console.log(error));
}

export async function signInFunction(v, setNoAccount) {
  const body = JSON.stringify({
    email: v.signin_email.value,
    password: v.signin_password.value,
  });

  fetch(`${SERVER_URL}/api/users/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: body,
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 408) {
          return response.json();
        }
        throw new Error(
          `Problème lors de la création du compte: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      if (data.userCreated === true) {
        setNoAccount(false);
      }
    })
    .catch((error) => console.log(error));
}
