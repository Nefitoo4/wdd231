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
            <img src="${car.img}" alt=${car.model} loading="lazy">
            <p><strong>Model:</strong>${car.model}</p>
            <p><strong>Year:</strong>${car.year}</p>
            <p><strong>Transmission:</strong>${car.transmission}</p>
            <p><strong>Capacity:</strong>${car.capacity}</p>
            <p><strong>Price:</strong>$${car.rent}</p>
            <p><strong>Rating:</strong>${car.rating}</p>
            <button class="select-btn" data-id="${car.id}">Select</button>
                      <!--Modal HTML-->
          <div class="modal" id="modal-${car.id}">
          <div class="modal-content">
            <span class="close" data-id="${car.id}">&times;</span>
            <h2>Booking Details for ${car.model}</h2>
            <label for="pickup-date-${car.id}">Pickup Date:</label>
            <input type="date" id="pickup-date-${car.id}" />
            <br />
            <label for="return-date-${car.id}">Return Date:</label>
            <input type="date" id="return-date-${car.id}" />
            <br />
            <p id="total-price-${car.id}"></p>
            <button class="book-btn" data-id="${car.id}">Book</button>
            <button class="cancel-btn" data-id="${car.id}">Cancel</button>
          </div>
        </div>`;
      carChart.appendChild(carItem);
    });
  } catch (error) {
    console.error("Error fetching car data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchInvData);
