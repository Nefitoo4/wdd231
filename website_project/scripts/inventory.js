/* JSON data migrated through async /await /fetch */
async function fetchInvData() {
  try {
    const response = await fetch("./data/inventory.json");
    const cars = await response.json();

    //convert values rent (strings) to numbers parsfloat
    cars.forEach((car) => (car.rent = parseFloat(car.rent)));
    console.log("Datos convertidos:", cars);

    const carChart = document.querySelector(".car-chart");

    cars.forEach((car) => {
      const carItem = document.createElement("div");
      carItem.classList.add("car-item");
      carItem.innerHTML = `
        <h3>${car.type}</h3>
        <img src="${car.img}" alt="${car.model}" loading="lazy">
        <p><strong>Model:</strong> ${car.model}</p>
        <button class="select-btn" data-id="${car.id}">Select</button>
        <dialog class="vehicle-info">
          <button class="close">x</button>
          <p><strong>Year:</strong> ${car.year}</p>
          <p><strong>Transmission:</strong> ${car.transmission}</p>
          <p><strong>Capacity:</strong> ${car.capacity}</p>
          <p><strong>Price:</strong> $${car.rent}</p>
          <p><strong>Rating:</strong> ${car.rating}</p>
          
          <label for="pickup-date-${car.id}">Pick-up Date & Time:</label>
          <input type="datetime-local" id="pickup-date-${car.id}" class="pickup-date" required><br>
          
          <label for="return-date-${car.id}">Return Date & Time:</label>
          <input type="datetime-local" id="return-date-${car.id}" class="return-date" required><br>
          
          <label for="email">Email:</label>
          <input type="email" id="email-${car.id}" name="email" required /><br>
          
          <label for="payment">Please introduce a debit card/credit card:</label>
          <input type="number" id="number-${car.id}" name="number" required /><br><br>
          
          <p class="total-cost"><strong>Total Cost:</strong> $<span id="total-cost-${car.id}">0</span></p>
          
          <button class="book">Book</button>
          <button class="cancel">Cancel</button>
        </dialog>`;
      carChart.appendChild(carItem);
    });

    //adding event listener for select btn
    document.querySelectorAll(".select-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const dialog = event.target.nextElementSibling;
        dialog.showModal();
      });
    });

    //btn close for dialog
    document.querySelectorAll(".close, .cancel").forEach((button) => {
      button.addEventListener("click", (event) => {
        const dialog = event.target.closest("dialog");
        dialog.close();
      });
    });

    // total cost calculation
    document.querySelectorAll(".pickup-date, .return-date").forEach((input) => {
      input.addEventListener("change", (event) => {
        const dialog = event.target.closest("dialog");
        const pickupDate = dialog.querySelector(".pickup-date").value;
        const returnDate = dialog.querySelector(".return-date").value;
        const pricePerDayText =
          dialog.querySelector("p:nth-of-type(4)").innerText;
        console.log("text price per day:", pricePerDayText);

        // extract and convert the price rightly
        const pricePerDay = parseFloat(pricePerDayText.replace(/[^\d.-]/g, ""));
        console.log("price per day:", pricePerDay);

        const totalCostSpan = dialog.querySelector(".total-cost span");

        console.log("pickup Date:", pickupDate);
        console.log("return Date:", returnDate);

        if (!isNaN(pricePerDay) && pickupDate && returnDate) {
          const start = new Date(pickupDate);
          const end = new Date(returnDate);
          const timeDifference = end - start;
          const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

          console.log("booking days:", days);

          if (days > 0) {
            const totalCost = days * pricePerDay;
            totalCostSpan.innerText = totalCost.toFixed(2);
            console.log("total cost:", totalCost);
          } else {
            totalCostSpan.innerText = "0";
          }
        } else {
          totalCostSpan.innerText = "0";
        }
      });
    });

    //event listener for book
    document.querySelectorAll(".book").forEach((button) => {
      button.addEventListener("click", (event) => {
        alert("Booking successfull!");
        const dialog = event.target.closest("dialog");
        dialog.close();
      });
    });
  } catch (error) {
    console.error("Error fetching car data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchInvData);
