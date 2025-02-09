import { sites } from "../data/sites.mjs";
console.log(sites);

//grab the reference of the division where we display the items
const display = document.querySelector("#main-content");

//function that shows the elements
function displayItems(sites) {
  //clean hte main container before add the rest of the elements
  display.innerHTML = "";

  sites.forEach((x) => {
    //build card element
    const card = document.createElement("div");
    card.classList.add("site_cards"); //class added to the card

    //build the image element
    const pic = document.createElement("img");
    pic.src = `${x.image}`;
    pic.alt = x.name;
    pic.classList.add("lazy");
    card.appendChild(pic);

    //build the title element
    const title = document.createElement("h2");
    title.innerText = x.name;
    card.appendChild(title);

    //build the address element
    const address = document.createElement("address");
    address.innerText = x.address;
    card.appendChild(address);

    //build the description element
    const description = document.createElement("p");
    description.innerText = x.description;
    card.appendChild(description);

    //card added to main container
    display.appendChild(card);
  });
}

//display all items of json file
displayItems(sites);

/************************************************************* */
//number of visits with local storage
document.addEventListener("DOMContentLoaded", function () {
  const displayMessage = document.getElementById("greeting");

  //get the current Date
  const currentDate = new Date();

  //function that calculate two different dates
  function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // miliseconds in one day
    return Math.round(Math.abs((date1 - date2) / oneDay));
  }

  //get the visit information through localStorage
  const lastVisit = localStorage.getItem("lastVisit");
  const visitCount = localStorage.getItem("visitCount");

  if (lastVisit) {
    const lastVisitDate = new Date(lastVisit);
    const hoursDifference = Math.abs(currentDate - lastVisitDate) / 36e5;

    if (hoursDifference < 24) {
      displayMessage.textContent = "Back so soon! Awesome!";
    } else {
      const daysDifference = daysBetween(currentDate, lastVisitDate);
      displayMessage.textContent = `You last visited ${daysDifference} days ago.`;
    }
  } else {
    //first time when visit th ewebsite
    displayMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  }

  // saves the current date as last visit
  localStorage.setItem("lastVisit", currentDate);

  //increment the visit count and save it in localstorage
  localStorage.setItem("visitCount", visitCount ? parseInt(visitCount) + 1 : 1);
});
