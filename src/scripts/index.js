import { loadHeaderFooter, initHamburgerMenu, loadJSON } from "./utilities";

loadHeaderFooter();
initHamburgerMenu();
initServices();
initReviews();

// Function to update the DOM with service content
function updateServiceContent(data, serviceTitles, currentServiceIndex) {
  const serviceTitle = serviceTitles[currentServiceIndex]; // Get the current service title
  const service = data[serviceTitle]; // Get the service data

  if (service) {
    document.getElementById("service-title").textContent = serviceTitle;
    document.getElementById("service-img").src = service.img;
    document.getElementById("service-img").alt = serviceTitle;
    document.getElementById("service-body").textContent = service.body;
  }
}

// Function to initialize the service rotation
async function initServices() {
  const data = await loadJSON('json/services.json');
  if (!data) return;

  const serviceTitles = Object.keys(data);
  let currentServiceIndex = 0;

  // Initial content update
  updateServiceContent(data, serviceTitles, currentServiceIndex);

  // Event listeners for buttons
  document.getElementById("prev-btn").addEventListener("click", function () {
    currentServiceIndex = (currentServiceIndex - 1 + serviceTitles.length) % serviceTitles.length;
    updateServiceContent(data, serviceTitles, currentServiceIndex);
  });

  document.getElementById("next-btn").addEventListener("click", function () {
    currentServiceIndex = (currentServiceIndex + 1) % serviceTitles.length;
    updateServiceContent(data, serviceTitles, currentServiceIndex);
  });
}

// Function to update the review content in the DOM
function updateReviewContent(reviews, currentReviewIndex) {
  const reviewData = reviews[currentReviewIndex]; // Get the current review

  if (reviewData) {
    document.getElementById("review-text").textContent = reviewData.review;
    document.getElementById("review-author").textContent = `- ${reviewData.fname} ${reviewData.lname}`;
  }
}

// Function to initialize the review rotation
async function initReviews() {
  const data = await loadJSON('/json/reviews.json'); // Adjust path as needed
  if (!data || !data.reviews || data.reviews.length === 0) return;

  const reviews = data.reviews;
  let currentReviewIndex = 0;

  // Initial content update
  updateReviewContent(reviews, currentReviewIndex);

  // Event listeners for buttons
  document.getElementById("prev-review-btn").addEventListener("click", function () {
    currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
    updateReviewContent(reviews, currentReviewIndex);
  });

  document.getElementById("next-review-btn").addEventListener("click", function () {
    currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
    updateReviewContent(reviews, currentReviewIndex);
  });
}