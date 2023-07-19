const form = document.querySelector(".login-form");
const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  fetch("/login", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(async (response) => {
    const res = await response.json();
    console.log(res);
    if (res.hasOwnProperty("username")) {
      window.location.href = "calendar.html";
    }
  });
});
