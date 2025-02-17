/*method array using the inventory.json file objects and applying to searching box*/
/*vehicles with higher rating*/
function getRandomElement(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}
/*method array using the inventory.json file objects and applying to searching box*/
/*vehicles with higher rating*/
function getRandomElement(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}
/*JSON data migrated through async /await /fetch */
fetch("./data/inventory.json")
  .then((response) => response.json())
  .then((data) => {
    //convert values rent (strings) to numbers parsfloat
    data.forEach((car) => (car.rent = parseFloat(car.rent)));
    console.log("converted data:", data);
    //order the vehicle clasification
    const topRatedCars = data.sort((a, b) => b.rating - a.rating).slice(0, 4);
    //assing the vehicles to container
    const carCharts = document.querySelectorAll(".car-rating");

    topRatedCars.forEach((car, index) => {
      const carChart = carCharts[index];
      carChart.innerHTML = `
          <h3>${car.type}</h3>
          <img src="${car.img}" alt=${car.model} loading="lazy">
          <p><strong>Model:</strong>${car.model}</p>
          <button class="select-btn" data-id="${car.id}">Select</button>
          <dialog class="vehicle-info">
          <button class="close">x</button>
          <p><strong>Year:</strong>${car.year}</p>
          <p><strong>Transmission:</strong>${car.transmission}</p>
          <p><strong>Capacity:</strong>${car.capacity}</p>
          <p><strong>Price:</strong>$${car.rent}</p>
          <p><strong>Rating:</strong>${car.rating}</p>
          <label for="pickup-date-${car.id}">Pick-up Date & Time:</label>
          <input type="datetime-local" id="pickup-date-${car.id}" class="pickup-date" required><br>
          <label for="return-date-${car.id}">Return Date & Time:</label>
          <input type="datetime-local" id="return-date-${car.id}" class="return-date" required><br>
          <label for="email">Email:</label>
          <input type="email" id="name" name="email" required /><br>
          <label for="payment">Please introduce a debit card/credit card:</label>
          <input type="number" id="number" name="number" required /><br><br>
          <p class="total-cost"><strong>Total Cost:</strong> $<span id="total-cost-${car.id}">0</span></p>
          <button class="book">Book</button>
          <button class="cancel">Cancel</button>
          </diaglog>`;
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
    //booking details
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
        console.log("Price per day:", pricePerDay);

        const totalCostSpan = dialog.querySelector(".total-cost span");

        console.log("pickup Date:", pickupDate);
        console.log("return date:", returnDate);

        if (!isNaN(pricePerDay) && pickupDate && returnDate) {
          const start = new Date(pickupDate);
          const end = new Date(returnDate);
          const timeDifference = end - start;
          const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

          console.log("booked days:", days);

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
  })
  .catch((error) => console.error("Error loading JSON:", error));

/*array method*/
const images = [
  {
    small: "./images/nextdrive-small.webp",
    medium: "./images/nextdrive-medium.webp",
    large: "./images/nextdrive-large.webp",
  },
  {
    small: "./images/hero-small.webp",
    medium: "./images/hero-medium.webp",
    large: "./images/hero-large.webp",
  },
  {
    small: "./images/small-image.webp",
    medium: "./images/medium-image.webp",
    large: "./images/large-image.webp",
  },
];

let currentImageIndex = 0;

function changeHeroImage() {
  const heroImage = document.getElementById("hero_image");
  const heroSourceLarge = document.getElementById("hero_source_large");
  const heroSourceMedium = document.getElementById("hero_source_medium");

  heroImage.classList.add("fade");

  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    heroImage.src = images[currentImageIndex].small;
    heroSourceLarge.srcset = images[currentImageIndex].large;
    heroSourceMedium.srcset = images[currentImageIndex].medium;

    heroImage.classList.remove("fade");
  }, 1000);
}

setInterval(changeHeroImage, 10000); //hero image change each 10s

//model card in membership card button
document.querySelectorAll(".hero-content-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const dialogId = event.target.nextElementSibling.id;
    document.getElementById(dialogId).showModal();
  });
});

document.querySelectorAll(".close").forEach((button) => {
  button.addEventListener("click", (event) => {
    const dialog = event.target.closest("dialog");
    dialog.close();
  });
});

/*----RATING LOCALSTORAGE----*/
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rating-form");
  const ratingCountElement = document.getElementById("rating-count");
  const averageRatingElement = document.getElementById("average-rating");

  //Load rating data from LocalStorage
  let ratingCount = parseInt(localStorage.getItem("ratingCount"), 10) || 0;
  let totalRating = parseInt(localStorage.getItem("totalRting"), 10) || 0;

  //Update display count and average
  ratingCountElement.textContent = `${ratingCount}`;
  averageRatingElement.textContent = ratingCount
    ? `${(totalRating / ratingCount).toFixed(1)}`
    : "0";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const rating = form.querySelector('input[name="rating"]:checked');
    if (rating) {
      const ratingValue = parseInt(rating.value, 10);

      //Increment rating count and update total rating
      ratingCount++;
      totalRating += ratingValue;

      //Update LocalStorage
      localStorage.setItem("ratingCount", `${ratingCount}`);
      localStorage.setItem("totalRating", `${totalRating}`);

      //Update displayed count and average
      ratingCountElement.textContent = `${ratingCount}`;
      averageRatingElement.textContent = `${(totalRating / ratingCount).toFixed(
        1
      )}`;

      //Reset form
      form.reset();
    } else {
      alert("Please select a rating before submitting.");
    }
  });
});

//Reset ratings button
document.getElementById("reset-ratings").addEventListener("click", () => {
  localStorage.removeItem("ratingCount"); //remove ratingCount from localStorage
  localStorage.removeItem("totalRating"); //remove totalRating from localStorage

  //Update the interface
  document.getElementById("rating-count").textContent = "0";
  document.getElementById("average-rating").textContent = "0";

  alert("Ratings reset");
});
