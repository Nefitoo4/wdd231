/**********************************************************************************/
/************************************GRID/LIST************************************/
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

gridbutton.addEventListener("click", () => {
  // example using arrow function
  display.classList.add("grid");
  display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
  display.classList.add("list");
  display.classList.remove("grid");
}

/**********************************************************************************/
/**********************************FETCH/ASYNC/AWAIT******************************/
async function obtainCompanies() {
  const chamber_companies = "/chamber/data/members.json";
  console.log(chamber_companies);
  try {
    const response = await fetch(chamber_companies);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const companies = await response.json();
    show_companies(companies);
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

function show_companies(companies) {
  const gridContainer = document.getElementById("companies-grid");
  companies.forEach((company) => {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.innerHTML = `
        <section class="grid-item">
        <img src="${company.image}" alt=${company.name}>
        <h3>${company.name}</h3>
        <p>Address:${company.address}</p>
        <p>Phone:${company.phone}</p>
        <p>Website URL:<a href=${company.website}">${company.website}</a></p>
        <p>Level: ${company.membership}</p>
        <p>Rating: ${company.rating}</p>
        </section>
    `;
    gridContainer.appendChild(gridItem);
  });
}
obtainCompanies();
