const apiUrl = "http://localhost:5000";

function urlEncode(obj) {
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
}

async function registerUser(name, email, password) {
  try {
    const response = await fetch(`${apiUrl}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncode({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData.message || `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

document
  .getElementById("register-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userData = await registerUser(name, email, password);
      console.log("User registered successfully:", userData);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  });
