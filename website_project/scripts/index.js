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
