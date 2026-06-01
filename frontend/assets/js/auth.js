function setMessage(form, text, type = "success") {
  const message = form.querySelector(".form-message");
  message.textContent = text;
  message.className = `form-message form-message--${type}`;
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector("[data-login-form]")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const submitButton = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);

      submitButton.disabled = true;
      setMessage(form, "Connexion en cours...");

      apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      })
        .then(({ token, user }) => {
          saveSession(token, user);
          setMessage(form, "Connexion reussie.");
          window.setTimeout(() => {
            window.location.href =
              user.role === "salon" ? "dashboard.html" : "index.html";
          }, 500);
        })
        .catch((error) => {
          setMessage(form, error.message, "error");
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    });

  document
    .querySelector("[data-register-form]")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const submitButton = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);

      submitButton.disabled = true;
      setMessage(form, "Creation du compte...");

      apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          nom: formData.get("nom"),
          email: formData.get("email"),
          password: formData.get("password"),
          role: formData.get("role"),
        }),
      })
        .then(() => {
          setMessage(
            form,
            "Compte cree. Vous pouvez maintenant vous connecter.",
          );
          form.reset();
        })
        .catch((error) => {
          setMessage(form, error.message, "error");
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    });
});
