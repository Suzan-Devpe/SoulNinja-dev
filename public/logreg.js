// sign in elements
const signinform = document.getElementById("signin-form");
// sign up elements
const signupform = document.getElementById("signup-form");
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
	container.classList.remove("right-panel-active");
});
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
		window.location = "/blogs";
	} else {
		errorLabel.innerHTML = res.error;
	}

	// only the password field is cleared
	password.value = "";
});

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

	// only password field will be cleared
	password.value = "";
});
