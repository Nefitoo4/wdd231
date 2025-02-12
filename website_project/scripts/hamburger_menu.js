/*-----HAMBURGER MENU-----*/
document.addEventListener("DOMContentLoaded", () => {
  const hambutton = document.querySelector("#ham_menu");
  const navigation = document.querySelector(".menu");
  //Click Event Listener to the hamburger button and use a callback function that toggles the list
  //element's list of classes
  hambutton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hambutton.classList.toggle("open");
  });
});
