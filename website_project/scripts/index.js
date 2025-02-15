/*method array using the inventory.json file objects and applying to searching box*/
document.addEventListener("DOMContentLoaded", function () {
  const typeSelect = document.getElementById("type");
  const yearSelect = document.getElementById("year");
  const capacitySelect = document.getElementById("capacity");
  const transmissionSelect = document.getElementById("transmission");
  const searchBtn = document.getElementById("search-btn");
  const carChartEngine = document.querySelector(".car-chart-engine");
  const resultDiv = document.querySelector(".result");

  async function fetchInvData() {
    try {
      const response = await fetch("./data/inventory.json");
      const cars = await response.json();

      searchBtn.addEventListener("click", () => filterCars(cars));
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  }

  function displayCars(cars) {
    carChartEngine.innerHTML = "";
    cars.forEach((car) => {
      const carItem = document.createElement("div");
      carItem.classList.add("car-item");

      carItem.innerHTML = `
        <h3>${car.type}</h3>
        <img src="${car.img}" alt="${car.model}" loading="lazy">
        <p><strong>Model:</strong> ${car.model}</p>
        <p><strong>Year:</strong> ${car.year}</p>
        <p><strong>Transmission:</strong> ${car.transmission}</p>
        <p><strong>Capacity:</strong> ${car.capacity}</p>
        <p><strong>Price per day:</strong> $${car.rent}</p>
        <p><strong>Rating:</strong> ${car.rating}</p>
        <button class="select-btn" data-id="${car.id}">Select</button>`;
      carChartEngine.appendChild(carItem);
    });
  }

  function filterCars(cars) {
    const selectedType = typeSelect.value;
    const selectedYear = yearSelect.value;
    const selectedCapacity = capacitySelect.value;
    const selectedTransmission = transmissionSelect.value;

    const filteredCars = cars.filter((car) => {
      return (
        (selectedType === "any" ||
          car.type.toLowerCase() === selectedType.toLowerCase()) &&
        (selectedYear === "any" || car.year.toString() === selectedYear) &&
        (selectedCapacity === "any" ||
          car.capacity.toString() === selectedCapacity) &&
        (selectedTransmission === "any" ||
          car.transmission.toLowerCase() === selectedTransmission.toLowerCase())
      );
    });

    if (filteredCars.length === 0) {
      resultDiv.innerHTML =
        "No vehicles found with the selected criteria. Please try different options.";
    } else {
      resultDiv.innerHTML = "";
      displayCars(filteredCars);
    }
  }

  fetchInvData();
});

/*vehicles with higher rating*/
function getRandomElement(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}
/*JSON data migrated through async /await /fetch */
fetch("./data/inventory.json")
  .then((response) => response.json())
  .then((data) => {
    //order the vehicle clasification
    const topRatedCars = data.sort((a, b) => b.rating - a.rating).slice(0, 3);
    //assing the vehicles to container
    const carCharts = document.querySelectorAll(".car-rating");

    topRatedCars.forEach((car, index) => {
      const carChart = carCharts[index];
      carChart.innerHTML = `
          <h3>${car.type}</h3>
          <img src="${car.img}" alt=${car.model} loading="lazy">
          <p><strong>Model:</strong>${car.model}</p>
          <p><strong>Year:</strong>${car.year}</p>
          <p><strong>Transmission:</strong>${car.transmission}</p>
          <p><strong>Capacity:</strong>${car.capacity}</p>
          <p><strong>Price:</strong>$${car.rent}</p>
          <p><strong>Rating:</strong>${car.rating}</p>
          <button class="select-btn" data-id="${car.id}">Select</button>`;
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
