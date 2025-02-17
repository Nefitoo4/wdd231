//registration form
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.target;
  const timestampInput = document.getElementById("timestamp");
  timestampInput.value = new Date().toString();
  const data = new URLSearchParams(new FormData(form));

  window.location.href = `thankyou.html?${data.toString()}`;
});
