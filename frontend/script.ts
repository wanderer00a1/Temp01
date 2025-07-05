document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById(
    "registerForm"
  ) as HTMLFormElement;
  const loginForm = document.getElementById("loginForm") as HTMLFormElement;
  const messageDiv = document.getElementById("message")!;

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = (
      document.getElementById("reg-username") as HTMLInputElement
    ).value;
    const email = (document.getElementById("reg-email") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("reg-password") as HTMLInputElement
    ).value;

    try {
      const response = await fetch(
        "https://61rvxjhybb.execute-api.ap-south-1.amazonaws.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        messageDiv.style.color = "green";
        messageDiv.textContent = "✅ " + data.message;
        messageDiv.classList.add("show");
        console.log("Register Successful", data);
      } else {
        messageDiv.style.color = "red";
        messageDiv.textContent = "❌ " + data.error;
        messageDiv.classList.add("show");
      }
    } catch (err) {
      messageDiv.textContent = "❌ Network error";
    }
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = (document.getElementById("login-email") as HTMLInputElement)
      .value;
    const password = (
      document.getElementById("login-password") as HTMLInputElement
    ).value;

    try {
      const response = await fetch(
        "https://61rvxjhybb.execute-api.ap-south-1.amazonaws.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        messageDiv.style.color = "green";
        messageDiv.textContent = "✅ " + data.message;
        messageDiv.classList.add("show");
        console.log("Login successful", data);
      } else {
        messageDiv.style.color = "red";
        messageDiv.textContent = "❌ " + data.error;
        messageDiv.classList.add("show");
      }
    } catch (err) {
      messageDiv.textContent = "❌ Network error";
    }
  });
});
