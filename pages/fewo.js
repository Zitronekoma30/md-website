function showBookingModal() {
  document.getElementById('booking-modal').style.display = 'flex';
}

function hideBookingModal() {
  document.getElementById('booking-modal').style.display = 'none';
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    hideBookingModal();
  }
});

document.getElementById('booking-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission
  
  const formData = new FormData(this);
  
  fetch('/submit-booking', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json()) // Expecting JSON response
  .then(data => {
    alert('Booking request sent!'); // Display success message
    hideBookingModal(); // Hide the modal after submission
  })
  .catch(error => {
    alert('Error: Unable to send booking request.'); // Display error message
    console.error(error);
  });
});