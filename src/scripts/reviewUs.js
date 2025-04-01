import { loadHeaderFooter, initHamburgerMenu } from "./utilities";

loadHeaderFooter();
initHamburgerMenu();

document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById("reviewForm");

    reviewForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const reviewData = {
            first_name: document.getElementById("first_name").value,
            last_initial: document.getElementById("last_initial").value,
            review: document.getElementById("review").value,
        };

        try {
            const response = await fetch("http://localhost:3000/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reviewData)
            });

            const result = await response.json();
            alert(result.message);

            // Optionally reset the form
            reviewForm.reset();

            // // If you're displaying reviews dynamically, refresh them
            // loadReviews();
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Something went wrong, please try again.");
        }
    });

    // // Function to load and display reviews dynamically
    // async function loadReviews() {
    //     try {
    //         const response = await fetch("http://localhost:3000/api/reviews");
    //         const data = await response.json();
            
    //         const reviewsContainer = document.getElementById("reviewsContainer");
    //         reviewsContainer.innerHTML = ""; // Clear previous reviews

    //         data.reviews.forEach(review => {
    //             const reviewElement = document.createElement("div");
    //             reviewElement.classList.add("review-item");
    //             reviewElement.innerHTML = `
    //                 <h3>${review.first_name} ${review.last_initial}.</h3>
    //                 <p>${review.review}</p>
    //             `;
    //             reviewsContainer.appendChild(reviewElement);
    //         });
    //     } catch (error) {
    //         console.error("Error loading reviews:", error);
    //     }
    // }

    // // Load reviews on page load
    // loadReviews();
});
