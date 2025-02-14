/*JSON data migrated through async /await /fetch */
async function fetchInvData() {
  try {
    const response = await fetch("./data/inventory.json");
    const cars = await response.json();

    const carChart = document.querySelector(".car-chart");

    cars.forEach((car) => {
      const carItem = document.createElement("div");
      carItem.classList.add("car-item");
      carItem.innerHTML = `
            <h3>${car.type}</h3>
            <img src="${car.img}" alt=${car.model}>
            <p><strong>Model:</strong>${car.model}</p>
            <p><strong>Year:</strong>${car.year}</p>
            <p><strong>Transmission:</strong>${car.transmission}</p>
            <p><strong>Capacity:</strong>${car.capacity}</p>
            <p><strong>Price:</strong>$${car.rent}</p>
            <p><strong>Rating:</strong>${car.rating}</p>`;
      carChart.appendChild(carItem);
    });
  } catch (error) {
    console.error("Error fetching car data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchInvData);
