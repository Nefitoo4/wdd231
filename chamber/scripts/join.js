//model card in membership card button
document.querySelectorAll(".model_membership").forEach((button) => {
  button.addEventListener("click", (event) => {
    const dialogId = event.target.nextElementSibling.id;
    document.getElementById(dialogId).showModal();
  });
});

document.querySelectorAll(".close").forEach((button) => {
  button.addEventListener("click", (event) => {
    const dialog = event.target.closest("dialog");
    dialog.close();
  });
});

//registration form
document
  .getElementById("registration_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const data = new URLSearchParams(new FormData(form));

    window.location.href = `thankyou.html?${data.toString()}`;
  });

//thankyou page display data
const urlParams = new URLSearchParams(window.location.search);
const formData = {};
urlParams.forEach((value, key) => {
  formData[key] = value;
});

const formDataDiv = document.getElementById("form-data");
for (const [key, value] of Object.entries(formData)) {
  const p = document.createElement("p");
  p.textContent = `${key}: ${value}`;
  formDataDiv.appendChild(p);
}
