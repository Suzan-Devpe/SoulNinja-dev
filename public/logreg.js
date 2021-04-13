const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// sign up elements
const signupform = document.getElementById("signup-form");

signupform.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("signup-name");
  const email = document.getElementById("signup-email");
  const password = document.getElementById("signup-password");

  const errorLabel = document.getElementById("signup-error");

  // fetch, POST - /auth/signup, content-type json, body: name, email, password
  const res = await fetch("/auth/signup", {
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
    alert("ok");
  } else {
    errorLabel.innerHTML = res.error;
  }
  name.value = "";
  email.value = "";
  password.value = "";
});
