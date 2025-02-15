/*method array using the inventory.json file objects and applying to searching box*/
document.addEventListener("DOMContentLoaded", function () {
  const typeSelect = document.getElementById("type");
  const yearSelect = document.getElementById("year");
  const capacitySelect = document.getElementById("capacity");
  const transmissionSelect = document.getElementById("transmission");
  const pickUpDateInput = document.getElementById("pickup-date");
  const returnDateInput = document.getElementById("return-date");
  const ageInput = document.getElementById("age");
  const searchBtn = document.getElementById("search-btn");
  const carChart = document.querySelector(".car-chart-engine");
  const resultDiv = document.querySelector(".result");

  /*async /await /fetch to call inventory.json*/
  async function fetchInvData() {
    try {
      const response = await fetch("./data/inventory.json");
      const cars = await response.json();

      searchBtn.addEventListener("click", () => filterCars(cars));
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  }

  function filterCars(cars) {
    const selectedType = typeSelect.value;
    const selectedYear = yearSelect.value;
    const selectedCapacity = capacitySelect.value;
    const selectedTransmission = transmissionSelect.value;
    const pickUpDate = new Date(pickUpDateInput.value);
    const returnDate = new Date(returnDateInput.value);
    const driverAge = parseInt(ageInput.value);

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

    console.log("Filtered Cars:", filteredCars);

    if (filteredCars.length === 0) {
      resultDiv.innerHTML =
        "The vehicle with those characteristics was not found, please try other options.";
    } else if (isNaN(driverAge) || driverAge < 21) {
      resultDiv.innerHTML = "The Driver must be 21 years old";
    } else if (
      isNaN(pickUpDate.getTime()) ||
      isNaN(returnDate.getTime()) ||
      pickUpDate >= returnDate
    ) {
      resultDiv.innerHTML =
        "The Pickup and Return hour and Date must be valid and the Return Date must be after the Pickup";
    } else {
      displayCars(filteredCars);
      const rentalDuration = (returnDate - pickUpDate) / (1000 * 60 * 60 * 24); //days duration
      const totalCost = filteredCars[0].rent * rentalDuration;
      resultDiv.innerHTML = `Total rent: $${totalCost.toFixed(2)}`;
    }
    /*method array*/
    function displayCars(cars, rentalDuration) {
      carChart.innerHTML = "";
      cars.forEach((car) => {
        const carItem = document.createElement("div");
        carItem.classList.add("car-item");

        //total cost for rent a car
        const totalCost = car.rent * rentalDuration;

        carItem.innerHTML = `
        <h3>${car.type}</h3>
        <img src="${car.img}" alt="${car.model}" loading="lazy">
        <p><strong>Model:</strong>${car.model}</p>
            <p><strong>Year:</strong>${car.year}</p>
            <p><strong>Transmission:</strong>${car.transmission}</p>
            <p><strong>Capacity:</strong>${car.capacity}</p>
            <p><strong>Price:</strong>$${car.rent}</p>
            <p><strong>Rating:</strong>${car.rating}</p>
            <P><strong>Total rent:</strong>$${totalCost.toFixed(2)}</p>`;
        carChart.appendChild(carItem);
      });
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
          <p><strong>Rating:</strong>${car.rating}</p>`;
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
