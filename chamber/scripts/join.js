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
