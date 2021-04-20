// sign up elements
const signupform = document.getElementById("signup-form");

signupform.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("signup-name");
  const email = document.getElementById("signup-email");
  const password = document.getElementById("signup-password");

  const errorLabel = document.getElementById("signup-error");

  // fetch, POST - /auth/register, content-type json, body: name, email, password
  const res = await fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
    }),
  }).then((res) => res.json());

  if (res.status == "ok") {
    window.location = "/blogs";
  } else {
    errorLabel.innerHTML = res.error;
  }
  name.value = "";
  email.value = "";
  password.value = "";
});
