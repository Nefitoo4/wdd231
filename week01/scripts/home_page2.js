/*-----COURSE CERTIFICATION-----*/
function filterCourses(category) {
  const courses = document.querySelectorAll(".course_card, .course_card_pend");
  let visibleCourses = 0;

  courses.forEach((course) => {
    if (category === "all") {
      course.style.display = "flex";
      visibleCourses++; //sum the credits
    } else if (course.classList.contains(category)) {
      course.style.display = "flex";
      visibleCourses++;
    } else {
      course.style.display = "none";
    }
  });

  const totalCredits = visibleCourses * 2; //multiply the amount of each credit
  document.getElementById(
    "total_credits"
  ).textContent = `The total number of credits for the courses listed below is: ${totalCredits}`;
}
