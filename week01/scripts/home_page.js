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

/*-----COURSE CERTIFICATION-----*/
function filterCourses(category) {
  const courses = document.querySelectorAll(".course_card, .course_card_pend");

  courses.forEach((course) => {
    if (category === "all") {
      course.style.display = "flex";
    } else if (course.classList.contains(category)) {
      course.style.display = "flex";
    } else {
      course.style.display = "none";
    }
  });
}

/*-----FOOTER LAST MODIFICATION-----*/
//Obtain the element of the footer ID
const lastModified = document.getElementById("lastModified");

//Obtain the current Date
const currentDate = new Date();

//Format the date as "dd/mm/yyyy"
const formattedDate = `${currentDate.getDate()}/${
  currentDate.getMonth() + 1
}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

//Update the content of the element with the formatted date
lastModified.textContent = `Last Modification: ${formattedDate}`;
