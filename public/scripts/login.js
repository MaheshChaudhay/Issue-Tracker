const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  console.log(formProps);
  try {
    const response = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formProps),
    });
    const data = await response.json();
    if (data.error) {
      const errorDiv = document.getElementById("error-div");
      errorDiv.innerText = data.error;
      setTimeout(() => {
        errorDiv.innerText = "";
      }, 2500);
    }
    if (data.user) {
      window.location = "/";
      form.reset();
    }
  } catch (err) {
    console.log(err);
  }
});
