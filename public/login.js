const signinform = document.getElementById("signin-form");

signinform.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("signin-email");
  const password = document.getElementById("signin-password");
  const errorLabel = document.getElementById("signin-error");

  // fetch: POST /auth/login, content-type: json, body: email, password
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  }).then((res) => res.json());

  if (res.status == "ok") {
    localStorage.setItem("token", res.data);
    window.location = "/blogs";
  } else {
    errorLabel.innerHTML = res.error;
  }

  password.value = "";
});
