const form = document.getElementById("contactForm");
const successMsg = document.getElementById("success");

// Error elements
const errorName = document.getElementById("error-name");
const errorEmail = document.getElementById("error-email");
const errorSubject = document.getElementById("error-subject");
const errorMessages = document.getElementById("error-message");

const inputs = {
  name: form.name,
  email: form.email,
  subject: form.subject,
  message: form.message,
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  successMsg.hidden = true;
  document.querySelectorAll("small").forEach((s) => {
    s.textContent = "";
    s.classList.remove("active");
    s.style.maxHeight = "0";
  });

  if (!inputs.name.value.trim()) {
    setError(errorName, "Full name is required");
    valid = false;
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inputs.email.value.trim())) {
    setError(errorEmail, "Enter a valid email");
    valid = false;
  }

  if (!inputs.subject.value.trim()) {
    setError(errorSubject, "Subject is required");
    valid = false;
  }

  if (inputs.message.value.trim().length < 10) {
    setError(errorMessages, "Message must be at least 10 characters");
    valid = false;
  }

  if (valid) {
    successMsg.hidden = false;
    successMsg.classList.add("show");
    successMsg.classList.add("success");
    setTimeout(() => {
      successMsg.classList.remove("show");
    }, 3000);
    form.reset();
  }
});

inputs.name.addEventListener("input", () => {
  if (inputs.name.value.trim() !== "") clearError(errorName);
});
inputs.email.addEventListener("input", () => {
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inputs.email.value.trim()))
    clearError(errorEmail);
});
inputs.subject.addEventListener("input", () => {
  if (inputs.subject.value.trim() !== "") clearError(errorSubject);
});
inputs.message.addEventListener("input", () => {
  if (inputs.message.value.trim().length >= 10) clearError(errorMessages);
});

function setError(element, message) {
  element.textContent = message;
  element.classList.add("active");
  element.style.maxHeight = "100px";
}

function clearError(element) {
  element.textContent = "";
  element.classList.remove("active");
  element.style.maxHeight = "0";
}
