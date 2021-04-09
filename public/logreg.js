const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const signinform = document.getElementById("signin-form");
const signupform = document.getElementById("signup-form");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

signupform.addEventListener("submit", register);

async function register(event) {
  event.preventDefault;
  const name = document.getElementById("signup-name").value;
  const password = document.getElementById("signup-password").value;
  const email = document.getElementById("signup-email").value;

  console.log(name, password, email);

  const result = await fetch("/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then((res) => res.json());

  console.log(result);
}
