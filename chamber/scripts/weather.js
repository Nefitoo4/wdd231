/**********************************************************************************/
/**********************************LOCATION WEATHER******************************/
// select HTML elements in the document
const mytown = document.querySelector("#city");
const mydescription = document.querySelector("#weather");
const mytemperature = document.querySelector("#temperature");
const myGraphic = document.querySelector("#weather_icon");

//create required variable for the url
const apiKey = "f0dc98fd4864e646170799b810442679";
const mylat = "13.67600080777733";
const mylong = "-89.28885128341604";

//construct a full path using template literals
const myurl = `https://api.openweathermap.org/data/2.5/weather?lat=${mylat}&lon=${mylong}&appid=${apiKey}&units=imperial`;

//try to grab the current weather data
async function apiFetch() {
  try {
    const response = await fetch(myurl);
    if (response.ok) {
      const data = await response.json();
      console.log(data); //testing only
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

//display the json data onto my web page
function displayResults(data) {
  mytown.innerHTML = data.name;
  mydescription.innerHTML = data.weather[0].description;
  mytemperature.innerHTML = `${data.main.temp}&deg;f`;
  const iconsrc = `https://openweathermap.org/img/w/10d.png`;
  myGraphic.setAttribute("SRC", iconsrc);
  myGraphic.setAttribute("alt", data.weather[0].description);
}

//start the process
apiFetch();

/**********************************************************************************/
/**********************************FORECAST 3 DAYS******************************/
// select HTML elements in the document
const forecastContainer = document.querySelector("#forecast_days");
const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${mylat}&lon=${mylong}&units=imperial&appid=${apiKey}`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${mylat}&lon=${mylong}&units=imperial&appid=${apiKey}`;

// obtain the weater data

async function apiFetchCurrent() {
  try {
    const response = await fetch(urlCurrent);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // show only the test
      displayCurrentResults(data); // show the current data
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// obtain the forecast for 5 days

async function apiFetchForecast() {
  try {
    const response = await fetch(urlForecast);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // just for testing
      displayForecastResults(data); // show the forecast
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// show the forecast details

function displayCurrentResults(data) {
  mytemperature.innerHTML = `${data.main.temp}&deg;F`;
  let desc = data.weather[0].description;
  mydescription.textContent = desc;
  myGraphic.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  myGraphic.alt = desc;
}

// show the forecast for 3 days

function displayForecastResults(data) {
  const forecastList = data.list
    .filter((forecast, index) => index % 8 === 0)
    .slice(0, 3); // filter 3 days

  forecastContainer.innerHTML = ""; // clean up first the container
  forecastList.forEach((day) => {
    const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
      weekday: "long",
    });
    const temp = day.main.temp;

    forecastContainer.innerHTML += `
        <p>${date}: ${temp.toFixed(2)}&deg;F</p>
    `;
  });
}

apiFetchCurrent();
apiFetchForecast();
/**********************************************************************************/
/**********************************RAMDOM COMPANIES******************************/
//select individual containers
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");

//random function
function getRandomElements(arr, count) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

//read the JSON file
fetch("./data/members.json")
  .then((response) => response.json())
  .then((data) => {
    //filter compaies member silver or gold
    const filteredCompanies = data.filter(
      (company) =>
        company.membership === "silver" || company.membership === "gold"
    );
    const selectedCompaies = getRandomElements(filteredCompanies, 3);

    //Assign companies
    const cards = [card1, card2, card3];
    selectedCompaies.forEach((company, index) => {
      const card = cards[index];
      card.innerHTML = `
    <h2>${company.name}</h2>
        <img src="${company.image}" alt="${company.name}">
        <p>${company.address}</p>
        <p>${company.phone}</p>
        <p><a href="http://${company.website}" target="_blank">${company.website}</a></p>
        <p>Membership: ${company.membership}</p>
        <p>Rating: ${company.rating}</p>`;
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
