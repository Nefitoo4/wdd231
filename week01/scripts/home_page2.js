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
