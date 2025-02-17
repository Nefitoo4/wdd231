// Mostrar reservas guardadas en localStorage
document.addEventListener("DOMContentLoaded", () => {
  const reservationsDiv = document.getElementById("reservations");
  let reservations = JSON.parse(localStorage.getItem("reservations")) || [];

  console.log("reservations from localstorage:", reservations);

  reservations.forEach((reservation) => {
    const reservationDiv = document.createElement("div");
    reservationDiv.classList.add("reservation-item");
    reservationDiv.innerHTML = `
        <p><strong>Car ID:</strong> ${reservation.carId}</p>
        <p><strong>Pickup Date:</strong> ${reservation.pickupDate}</p>
        <p><strong>Return Date:</strong> ${reservation.returnDate}</p>
        <p><strong>Email:</strong> ${reservation.email}</p>
        <p><strong>Total Cost:</strong> $${reservation.totalCost}</p>
        <p><strong>Payment Status:</strong> Payment made with credit/debit card.</p>
      `;
    reservationsDiv.appendChild(reservationDiv);
  });
});
