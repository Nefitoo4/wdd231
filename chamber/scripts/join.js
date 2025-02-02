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
