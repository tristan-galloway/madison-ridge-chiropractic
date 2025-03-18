import { loadHeaderFooter, initHamburgerMenu, showModal } from "./utilities";

loadHeaderFooter();
initHamburgerMenu();

// Getting toggled button elements
document.addEventListener("DOMContentLoaded", function () {
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            btn.classList.toggle("active");

            updateSelectedValues("dayOfWeek", "#selected-days");
            updateSelectedValues("timeOfDay", "#selected-times");
        });
    });

    function updateSelectedValues(type, hiddenInputSelector) {
        const selected = Array.from(document.querySelectorAll(`.toggle-btn.active`))
            .filter(btn => btn.closest(".toggle-group").getAttribute("data-type") === type) // Ensure correct filtering
            .map(btn => btn.getAttribute("data-value"));

        document.querySelector(hiddenInputSelector).value = selected.join(", ");
    }
});


// Form Submission Handler
document.getElementById('appointmentForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from submitting normally
    
    // Check if any day or time is selected
    const selectedDays = document.querySelector("#selected-days").value;
    const selectedTimes = document.querySelector("#selected-times").value;

    if (!selectedDays || !selectedTimes) {
        showModal('Please select at least one preferred day and one preferred time.');
        return;
    }

    const formData = new FormData(event.target);
    const appointmentData = Object.fromEntries(formData.entries()); // Convert FormData to an object

    try {
        const response = await fetch('http://localhost:3000/send-appointment-request', { // Use full URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData),
        });

        // Handle potential text responses gracefully
        const text = await response.text();
        let result;
        try {
            result = JSON.parse(text); // Try parsing JSON
        } catch {
            result = { message: text }; // Fallback to plain text
        }

        if (response.ok) {
            showModal('Your appointment request has been sent!');
        } else {
            showModal('Failed to send the appointment request.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the appointment request.');
    }
});
