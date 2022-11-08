const form = document.getElementById("signup-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  form.reset();
  console.log(formProps);
  try {
    const response = await fetch("/users/signup", {
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
      window.location = "/users/login";
    }
  } catch (err) {
    console.log(err);
  }
});
