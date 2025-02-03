//thankyou page display data
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const formDataDiv = document.getElementById("form-data");
  urlParams.forEach((value, key) => {
    const p = document.createElement("p");
    p.textContent = `${key}: ${value}`;
    formDataDiv.appendChild(p);
  });
});
