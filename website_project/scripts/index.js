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
  const carChart = document.querySelector(".car-chart");
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

  /*method array*/
  function displayCars(cars) {
    carChart.innerHTML = "";
    cars.forEach((car) => {
      const carItem = document.createElement("div");
      carItem.classList.add("car-item");
      carItem.innerHTML = `
        <h3>${car.type}</h3>
        <img src="${car.img}" alt="${car.model}" loading="lazy">
        <p><strong>Model:</strong>${car.model}</p>
            <p><strong>Year:</strong>${car.year}</p>
            <p><strong>Transmission:</strong>${car.transmission}</p>
            <p><strong>Capacity:</strong>${car.capacity}</p>
            <p><strong>Price:</strong>$${car.rent}</p>
            <p><strong>Rating:</strong>${car.rating}</p>`;
      carChart.appendChild(carItem);
    });
  }

  function filterCars(cars) {
    const selectedType = typeSelect.value;
    const selectedYear = yearSelect.value;
    const selectedCapacity = capacitySelect.value;
    const selectedTransmission = transmissionSelect.value;
    const pickUpDate = new Date(pickUpDateInput.value);
    const returnDate = new Date(returnDateInput.value);
    const driverAge = parseInt(ageInput.value);

    console.log("Selected Type:", selectedType);
    console.log("Selected Year:", selectedYear);
    console.log("Selected Capacity:", selectedCapacity);
    console.log("Selected Transmission:", selectedTransmission);
    console.log("Pickup Date:", pickUpDate);
    console.log("Return Date:", returnDate);
    console.log("Driver Age:", driverAge);

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
      pickUpDate >= returnDate ||
      isNaN(pickUpDate) ||
      isNaN(returnDate)
    ) {
      resultDiv.innerHTML =
        "The Pickup and Return hour and Date must be valid and the Return Date must be after the Pickup";
    } else {
      displayCars(filteredCars);
      const rentalDuration = (returnDate - pickUpDate) / (1000 * 60 * 60 * 24); //days duration
      const totalCost = filteredCars[0].rent * rentalDuration;
      resultDiv.innerHTML = `Total rent: $${totalCost.toFixed(2)}`;
    }
  }

  fetchInvData();
});
