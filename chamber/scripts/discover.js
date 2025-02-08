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
